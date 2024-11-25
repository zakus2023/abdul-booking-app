import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
    guests: {
      type: Array,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalcode: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    media: {
      type: Array,
      required: false,
      default: [],
    },
    ticketTypes: {
      type: Array,
      required: false,
      default: [],
    },
    createdBy: {
      type:String,
      required:true,
    }
    
  },
  { timestamps: true }
);

const EventModel = mongoose.model("Event", eventSchema);

export default EventModel;
