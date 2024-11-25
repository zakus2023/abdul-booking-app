import express from "express";
import Booking from "../modules/booking-model.js";
import validUser from "../middlewares/validuser.js";
import EventModel from "../modules/events-module.js";
import "dotenv/config";

import sendEmail from "../email-service/emailservice.js";

import Stripe from "stripe";
import User from "../modules/user-module.js";

const router = express.Router();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-booking", validUser, async (req, res) => {
  try {
    req.body.user = req.user._id;
    // create the booking
    const booking = await Booking.create(req.body);

    // update event tickets
    const event = await EventModel.findById(req.body.event);
    const ticketTypes = event.ticketTypes;
    const updatedTicketTypes = ticketTypes.map((ticketType) => {
      if (ticketType.name === req.body.ticketType) {
        ticketType.booked =
          Number(ticketType.booked ?? 0) + Number(req.body.ticketsCount);
        ticketType.available =
          Number(ticketType.available ?? ticketType.limit) -
          Number(req.body.ticketsCount);
      }
      return ticketType;
    });
    await EventModel.findByIdAndUpdate(req.body.event, {
      ticketTypes: updatedTicketTypes,
    });

     

    // send booking confirmation email
    const user = await User.findById(req.user._id)
    console.log(user)
    const subject = "Your Booking Confirmation";
    const text = `Hello ${user.name},\n\nYour booking for the event ${event.name} has been confirmed. Thank you for choosing our service.`;
    const html = `<p>Hello ${user.name},</p><p>Your booking for the event ${event.name} has been confirmed. Thank you for choosing our service.</p>`;
    sendEmail(user.email, subject, text, html);


    return res
      .status(200)
      .json({ message: "Booking created successfully", booking });
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
});

router.get("/get-user-bookings", validUser, async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      throw new Error("User ID is missing in the request");
    }

    const bookings = await Booking.find({ user: userId })
      .populate("event")
      .sort({ createdAt: -1 });

    return res.status(200).json({ data: bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return res.status(500).json({ message: error.message });
  }
});

router.get("/get-all-bookings", validUser, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("event")
      .populate("user")
      .sort({ createdAt: -1 });
    return res.status(200).json({ data: bookings });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/cancel-booking", validUser, async (req, res) => {
  try {
    const { eventId, paymentId, bookingId, ticketsCount, ticketTypeName } =
      req.body;

       // Find the event to get the event date
    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }


    // Calculate the time difference between now and the event date

    const currentDate = new Date();
    const eventDate = new Date(event.date); // Adjust if your event date field is different
    const timeDifference = eventDate.getTime() - currentDate.getTime();
    const daysLeft = 72 * 60 * 60 * 1000; // Milliseconds in a day


    // Check if the cancellation is at least one day before the event
    if (timeDifference < daysLeft) {
      return res.status(400).json({ message: 'Bookings can only be canceled at least three(3) days before the event' });
    }

    // else create the refund

    const refund = await stripe.refunds.create({
      payment_intent: paymentId,
    });

    if (refund.status === "succeeded") {
      await Booking.findByIdAndUpdate(bookingId, { status: "cancelled" });

      const event = await EventModel.findById(eventId);
      const ticketTypes = event.ticketTypes;
      const updatedTicketTypes = ticketTypes.map((ticketType) => {
        if (ticketType.name === ticketTypeName) {
          ticketType.booked =
            Number(ticketType.booked ?? 0) - Number(ticketsCount);
          ticketType.available =
            Number(ticketType.available ?? ticketType.limit) +
            Number(ticketsCount);
        }
        return ticketType;
      });

      await EventModel.findByIdAndUpdate(eventId, {
        ticketTypes: updatedTicketTypes,
      });


       // Send cancellation confirmation email
       const user = await User.findById(req.user._id)
       const subject = "Your Booking Cancellation";
       const text = `Hello ${user.name},\n\nYour booking for the event ${event.name} has been cancelled. We hope to serve you again in the future.`;
       const html = `<p>Hello ${user.name},</p><p>Your booking for the event ${event.name} has been cancelled. We hope to serve you again in the future.</p>`;
       sendEmail(user.email, subject, text, html);



      return res.status(200).json({ message: "Event cancelled successfully" });
    } else {
      return res.status(400).json({ message: "Refund failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
