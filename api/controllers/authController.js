import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";

// Generate a jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register user
export const registerUser = asyncHandler(async (req, res) => {
  const { username, handle, email, password } = req.body;

  if (!username || !handle || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all the details!");
  }

  if (password.length < 5) {
    res.status(400);
    throw new Error("Password should be atleast 5 characters!");
  }

  const checkEmail = await User.findOne({ email });
  const checkHandle = await User.findOne({ handle });

  if (checkEmail) {
    res.status(400);
    throw new Error("This email already exists!");
  }
  if (checkHandle) {
    res.status(400);
    throw new Error("This handle already exists!");
  }

  const user = await User.create({
    username,
    handle,
    email,
    password,
  });

  const token = generateToken(user?._id);

  if (user) {
    const { password, ...info } = user._doc;
    res
      .cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json(info);
  } else {
    res.status(400);
    throw new Error("Invalid user data!");
  }
});

// Login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all the details!");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  const token = generateToken(user._id);

  if (isPasswordCorrect) {
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
      secure: true,
      sameSite: "none",
    });
  }

  if (user && isPasswordCorrect) {
    const { password, ...info } = user._doc;

    res.status(200).json(info);
  } else {
    res.status(400);
    throw new Error("Invalid credentials!");
  }
});
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({ message: "Successfully logged out." });
});
