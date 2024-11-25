import express from "express";
import User from "../modules/user-module.js";
import { errorHandler } from "../utils/errors.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validUser from "../middlewares/validuser.js";

const router = express.Router();

//Public APIs
////////////////////////////////////////////////////////////////////////////////////

router.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json({ message: " User Registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser)
      return res
        .status(402)
        .json({ message: "User not found. Email is not correct" });
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword)
      return res.status(403).json({ message: "Invalid Password" });
    const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET_KEY);

    // const { password: pass, ...rest } = validUser._doc;

    // res
    //   .cookie("access_token", token, { hashOnly: true })
    //   .status(200)
    //   .json(rest);
    return res.status(200).json({ token, message: "Login successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/////////////////////////////////////////////////////////////////////////////////////////
//get all users

router.get("/all-users", validUser, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//////////////////////////////////////////////////////////////////////////////////////
//update User Role- isAdmin update user data

router.put("/update-user", validUser, async (req, res) => {
  try {
    const {userId, password, ...data} = req.body
    if(password){
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(password, saltRounds)
      data.password = hashedPassword
    }
    await User.findByIdAndUpdate(req.body.userId, data);
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////
//This api comfirms existing password

router.post("/verify-password", validUser, async (req, res) => {
  const { userId, oldPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(oldPassword, user.password);
    res.json({ isValid });
  } catch (error) {
    console.error("Password verification error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////

//protected APIs
//////////////////////////////////////////////////////////////////////////////////////////////
//get current user. this can be used to show the profile or user details
router.get("/current-user", validUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res
      .status(200)
      .json({ data: user, message: "User fetched successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////

export default router;