import mongoose from "mongoose";
import EventModel from "../modules/events-module.js";
import User from "../modules/user-module.js";

// Connect to your MongoDB database
const mongoURI = "mongodb+srv://userCorrect:qwertyC3600@mycluster.janfs9e.mongodb.net/abdul-event-booking?retryWrites=true&w=majority&appName=mycluster";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  console.log("Connected to MongoDB");

  try {
    // Find all events that need updating
    const events = await EventModel.find({ createdBy: { $exists: false } });

    // Iterate over each event and update the createdBy field
    for (let event of events) {
      // Determine the correct user ID to set as createdBy
      // For example, let's assume you're setting a default user ID
      const defaultUserId = "your_default_user_id"; // Replace with actual user ID

      event.createdBy = defaultUserId; // Set the createdBy field
      await event.save(); // Save the updated event
    }

    console.log("Migration complete");
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
});
