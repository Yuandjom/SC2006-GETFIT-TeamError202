import express from "express";
import { addFood, getFoodExercise, addExercise, deleteExercise, deleteFood, searchExercise} from "../controllers/foodexercise.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("", verifyToken, getFoodExercise);
router.get("/searchexercise", searchExercise);

router.patch("/food", verifyToken, addFood);
router.patch("/exercise", verifyToken, addExercise);

router.delete("/exercise", verifyToken, deleteExercise);
router.delete("/food", verifyToken, deleteFood);

export default router;

