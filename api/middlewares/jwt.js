import jwt from "jsonwebtoken";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(403);
      throw new Error("Token not found!");
    }

    // verifying token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    //get user id from token
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(404);
      throw new Error("User not found!");
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(403);
    throw new Error("Not authneticated");
  }
});

export const verifyAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("You are not authorized!");
  }
});

export default protect;
