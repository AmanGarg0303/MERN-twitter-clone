import Comment from "../models/comment.js";
import Post from "../models/post.js";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";

// create a review
export const createComment = asyncHandler(async (req, res) => {
  const { postId, desc } = req.body;
  if (!postId || !desc) {
    res.status(400);
    throw new Error("Please fill in all the fields");
  }

  const newReview = await Comment({
    userId: req.user._id,
    postId,
    desc,
  });

  try {
    const savedReview = await newReview.save();

    await Post.findByIdAndUpdate(postId, {
      $inc: { totalComments: 1 },
    });

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// get review
export const getComments = asyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(400);
    throw new Error("No comments found!");
  }
});

// delete a review
export const deleteComment = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  const comment = await Comment.findById(req.params.commentId);

  if (comment) {
    if (comment.userId === user?._id.toString() || user.isAdmin) {
      await Comment.deleteOne({ _id: comment._id });
      res.status(200).json({ message: "Comment deleted" });
    } else {
      res.status(403);
      throw new Error("You can't delete someone's comment!");
    }
  } else {
    res.status(404);
    throw new Error("Comment not found!");
  }
});
