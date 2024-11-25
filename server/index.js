import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db-config.js";
import userRouter from "./user-route/user-route.js";
import eventRouter from "./user-route/events-route.js";
import paymentRouter from "./user-route/payment-route.js";
import bookingsRouter from "./user-route/bookings-route.js";
import cookieParser from "cookie-parser";

import path from "path";
import { fileURLToPath } from "url";

// Simulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../client/dist")));

const port = process.env.PORT || 5000;

connectDB();

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("Connected to mongoDB");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

app.use("/api/user", userRouter);

app.use("/api/event", eventRouter);

app.use("/api/payments", paymentRouter);

app.use("/api/bookings", bookingsRouter);

// ==============================================================

// any other request
// This defines a route that matches all incoming GET requests 
// (due to the wildcard *). It means this handler will catch every GET request that doesn't match any other route defined earlier.

// The 'app.get' method is used to handle HTTP GET requests. In this case, it is handling all requests.
app.get('*', (req, res) => {

  // 'path.join' is used to safely construct file paths across different operating systems.
  // '__dirname' is a special variable that contains the absolute path to the directory where the current file is located.
  // "../frontend/dist/index.html" is the relative path to the 'index.html' file located in the 'frontend/dist' folder.
  // By using 'path.join(__dirname, "../frontend/dist/index.html")', we are combining the directory of the current file (__dirname)
  // with the relative path to 'index.html' to get the absolute path of the 'index.html' file.

  // 'res.sendFile' sends the 'index.html' file as a response to the client.
  // This is commonly used in Single Page Applications (SPA) where all frontend routes point to the 'index.html' file.
  res.sendFile(path.join(__dirname, "../client/dist/index.html"))
})

// =======================================================================

//Error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
