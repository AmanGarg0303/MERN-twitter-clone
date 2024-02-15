import express from "express";
import {
  followUser,
  getUserById,
  UnFollowUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/jwt.js";
const router = express.Router();

router.get("/:userId", protect, getUserById);

router.put("/follow/:id", protect, followUser);

router.put("/unfollow/:id", protect, UnFollowUser);

export default router;
