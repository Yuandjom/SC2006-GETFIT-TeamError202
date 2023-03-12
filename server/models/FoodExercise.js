import mongoose from "mongoose";

const foodexerciseSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
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
      type: Date,
    },
  },
  { timestamps: true }
);

const FoodExercise = mongoose.model("FoodExercise", foodexerciseSchema);

export default FoodExercise;
