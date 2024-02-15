import asyncHandler from "express-async-handler";
import Post from "../models/post.js";
import User from "../models/user.js";

export const createPost = asyncHandler(async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500);
    throw new Error("Couldn't create post!");
  }
});

export const myPosts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  const userPosts = await Post.find({ userId: user._id });
  if (userPosts) {
    res.status(200).json(userPosts);
  } else {
    res.status(500);
    throw new Error("No posts found!");
  }
});

export const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  const post = await Post.findById(postId);
  if (!post) {
    res.status(404);
    throw new Error("Post not found!");
  }

  try {
    await Post.findByIdAndDelete({ _id: post._id, userId: user._id });
    res.status(200).json({ message: "Post deleted successfully!" });
  } catch (error) {
    res.status(500);
    throw new Error("Couldn't delete the post!");
  }
});

export const getRandomPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.aggregate([{ $sample: { size: 200 } }]);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500);
    throw new Error("Couldn't fetch posts!");
  }
});

export const getPostById = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  if (!postId) {
    res.status(400);
    throw new Error("PostId is required!");
  }

  const post = await Post.findById(postId);

  if (!post) {
    res.status(404);
    throw new Error("Post not found!");
  } else {
    res.status(200).json(post);
  }
});
