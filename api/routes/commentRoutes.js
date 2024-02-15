import express from "express";
import {
  createComment,
  deleteComment,
  getComments,
} from "../controllers/commentControllers.js";
const router = express.Router();
import { protect } from "../middlewares/jwt.js";

router.post("/", protect, createComment);
router.get("/:postId", protect, getComments); // post id
router.delete("/:commentId", protect, deleteComment); // comment id

export default router;
