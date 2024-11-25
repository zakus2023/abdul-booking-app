import mongoose from "mongoose";
import User from "../modules/user-module.js"; // Adjust the path as needed

const migrateRoles = async () => {
  try {
    await mongoose.connect("", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const users = await User.find();

    for (let user of users) {
      if (user.isAdmin) {
        user.role = "admin";
      } else if (user.isVendor) {
        user.role = "vendor";
      } else {
        user.role = "user";
      }
      await user.save();
    }

    console.log("Migration completed!");
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    mongoose.disconnect();
  }
};

migrateRoles();