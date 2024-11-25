// import Stripe from "stripe";

// import express from "express";
// import validUser from "../middlewares/validuser.js";

// const router = express.Router();

// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// router.post("/create-payment-intent", validUser, async (req, res) => {
  

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: req.body.amount * 100,
//       currency: "usd",
//       description: "AbdulEvents",
//     });

//     return res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

// export default router;


import Stripe from "stripe";
import express from "express";
import validUser from "../middlewares/validuser.js";
import 'dotenv/config'

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment-intent", validUser, async (req, res) => {
  try {
    const { amount } = req.body;

    // Ensure amount is provided and is a number
    if (!amount || typeof amount !== "number") {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert amount to cents
      currency: "usd",
      description: "AbdulEvents",
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
