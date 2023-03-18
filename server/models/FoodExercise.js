import mongoose from "mongoose";

const foodexerciseSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    breakfast: {
      type: Array,
      default: [],
    },
    lunch: {
      type: Array,
      default: [],
    },
    dinner: {
      type: Array,
      default: [],
    },
    exercise: {
      type: Array,
      default: [],
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FoodExercise = mongoose.model("FoodExercise", foodexerciseSchema);

export default FoodExercise;
