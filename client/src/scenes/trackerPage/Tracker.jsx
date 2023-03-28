import React, { useEffect } from 'react';
import "../../index.css";
import FoodSection from "./trackerComponents/FoodSection";
import ExerciseSection from './trackerComponents/ExerciseSection';
import Navbar from "scenes/navbar";
import { useState } from 'react';
import Datepicker from "react-tailwindcss-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { setDate, setFoodExercise } from "state";
//import fetch from 'node-fetch';

export default function Tracker() {

  const dispatch = useDispatch();

  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const date = useSelector((state) => state.date);
  const foodExerciseArr = useSelector((state) => state.foodexercise);

  const [foodCalories, setFoodCalories] = useState(0);

  const [deleteItem, setDeleteItem] = useState(false);


  //get meal array in 
  const calFoodCalories = (foodArrays) => {

    let foodcalories = 0;
    let i = 0;

    for (i=0; i<foodArrays.breakfast.length; i++) {
      let curFood = foodArrays.breakfast[i];
      foodcalories += parseInt(curFood.calories);
    }

    for (i=0; i<foodArrays.lunch.length; i++) {
      let curFood = foodArrays.lunch[i];
      foodcalories += parseInt(curFood.calories);
    }

    for (i=0; i<foodArrays.dinner.length; i++) {
      let curFood = foodArrays.dinner[i];
      foodcalories += parseInt(curFood.calories);
    }

    console.log(foodcalories);
    return foodcalories;
  }

  const getFoodExerciseDoc  = async() => {
    const response = await fetch(`http://localhost:3001/tracker?userid=${_id}&date=${date.startDate}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
    const updatedFoodExercise = await response.json();

    const setState = (updatedFoodExercise, dispatch) => new Promise((resolve, reject) => {
      // do anything here
      dispatch(setFoodExercise({foodexercise: updatedFoodExercise}));
      resolve();
    })

    await setState(updatedFoodExercise, dispatch);

    console.log(foodExerciseArr);
    const foodcalories = calFoodCalories(updatedFoodExercise);
    setFoodCalories(foodcalories);

  };

  useEffect(() => {

    getFoodExerciseDoc();
    
  }, [date, deleteItem]);

  const handleDate = async (updatedDate) => {
    
    console.log(updatedDate.startDate);

    if (updatedDate.startDate === null) {
      return;
    }

    dispatch(setDate({date: updatedDate}));
  }

  return (
    <div>
        <Navbar />
      <div className="mt-6 flex justify-center">
        <div>
          <Datepicker 
            inputClassName="bg-gray-200 w-44"
            asSingle={true} 
            useRange={false} 
            placeholder="YY-MM-DD" 
            value={date}
            onChange={handleDate}
          />
        </div>
      </div>
      <div className="mt-8 bg-gray-200 mx-10 px-5 py-5 rounded-xl">
        <h1 className="text-2xl font-bold"> Calories Remaining </h1>
        <div className="flex gap-5 justify-center mt-2">
          <h2> 3000 (Target) </h2>
          <h2> - </h2>
          <h2> {foodCalories} (Food) </h2>
          <h2> + </h2>
          <h2> 0 (Exercise) </h2>
          <h2> = </h2>
          <h2> 2500 </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">


      <FoodSection 
        name = "Breakfast"
        food = {foodExerciseArr.breakfast}
        deleteItem = {setDeleteItem}
      />
      <FoodSection 
        name = "Lunch"
        food = {foodExerciseArr.lunch}
        deleteItem = {setDeleteItem}
      />
      <FoodSection 
        name = "Dinner"
        food = {foodExerciseArr.dinner}
        deleteItem = {setDeleteItem}
      />
      <ExerciseSection 
        name = "Exercise"
        exercise = {foodExerciseArr.exercise}
      />
      </div>
    </div>
  )
}

