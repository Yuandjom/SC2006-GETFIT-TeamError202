import express from "express";
import { addFood, getFoodExercise } from "../controllers/foodexercise.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("", verifyToken, getFoodExercise);
router.patch("/food", verifyToken, addFood);

export default router;

