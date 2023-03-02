import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    gender: {
      type: String,
      required: [true, "Please select your gender"],
    },
    height: {
      type: Number,
      required: [true, "Please enter your height in centimeters"],
    },
    weight: {
      type: Number,
      required: [true, "Please enter your weight in kilograms"],
    },
    fitnessPlan: {
      type: String,
      required: [true, "Please select your fitness plan"],
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
