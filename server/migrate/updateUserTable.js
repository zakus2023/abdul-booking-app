import mongoose from "mongoose";
import User from "../modules/user-module.js"; // Adjust the path to where your User model is defined

const updateExistingUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      "mongodb+srv://userCorrect:qwertyC3600@mycluster.janfs9e.mongodb.net/abdul-event-booking?retryWrites=true&w=majority&appName=mycluste",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    // Update existing users with new fields
    await User.updateMany(
      {},
      {
        $set: {
          resetPasswordToken: null,
          resetPasswordExpires: null,
        },
      }
    );

    console.log("Update completed.");
  } catch (error) {
    console.error("Error updating documents:", error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
  }
};

// Execute the update function
updateExistingUsers();
