import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongoDb")
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
};

export default connectDB


