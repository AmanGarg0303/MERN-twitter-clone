import express from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getRandomPosts,
  myPosts,
} from "../controllers/postControllers.js";
import protect from "../middlewares/jwt.js";
const router = express.Router();

router.post("/", protect, createPost);

router.get("/", protect, myPosts);

router.get("/random", protect, getRandomPosts);

router.delete("/:postId", protect, deletePost);

router.get("/:postId", protect, getPostById);

export default router;
