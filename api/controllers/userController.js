import asyncHandler from "express-async-handler";
import User from "../models/user.js";

export const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400);
    throw new Error("UserId is required");
  }

  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404);
    throw new Error("User not found!");
  }
});

export const followUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  const { id } = req.params; // the other user id, whom i want to follow
  const otherUser = User.findById(id);
  if (!otherUser) {
    res.status(404);
    throw new Error("Other user was not found!");
  }

  if (!user?.followings?.includes(id)) {
    await user.updateOne({ $push: { followings: id } });
    await otherUser.updateOne({ $push: { followers: user._id } });
    res.status(200).json("User followed!");
  } else {
    res.status(403);
    throw new Error("Action forbidden!");
  }
});

export const UnFollowUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  const { id } = req.params; // the other user id, whom i want to unfollow
  const otherUser = User.findById(id);
  if (!otherUser) {
    res.status(404);
    throw new Error("Other user was not found!");
  }

  if (user?.followings.includes(id)) {
    await user.updateOne({ $pull: { followings: id } });
    await otherUser.updateOne({ $pull: { followers: user._id } });
  } else {
    res.status(403);
    throw new Error("Action forbidden!");
  }
});
