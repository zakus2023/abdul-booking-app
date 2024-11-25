import express from "express";
import validUser from "../middlewares/validuser.js";
import EventModel from "../modules/events-module.js";

const router = express.Router();

//create event route

router.post("/create-event", validUser, async (req, res) => {
  try {
    const event = await EventModel.create(req.body);
    return res
      .status(200)
      .json({ message: "Event created successfully", event });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//edit event route
router.put("/update-event/:id", validUser, async (req, res) => {
  try {
    const event = await EventModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "Event updated succcessfully", event });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//delete event

router.delete("/delete-event/:id", validUser, async (req, res) => {
  try {
    await EventModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Reading event of fetching event or get all events

router.get("/get-events", validUser, async (req, res) => {
  try {
    //access search query. NB: this was added after implementing the filter in the front end
    const searchText = req.query.searchText;
    const date = req.query.date;

    // ....................................................................................
    //$regex too was added after filter was imple on the front end

    const events = await EventModel.find({
      name: { $regex: new RegExp(searchText, "i") },
      ...(date && { date }),
    }).sort({ createdAt: -1 });
    return res.status(200).json({ data: events });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//get a particular event
router.get("/get-event/:id", validUser, async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);
    return res.status(200).json({ data: event });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
