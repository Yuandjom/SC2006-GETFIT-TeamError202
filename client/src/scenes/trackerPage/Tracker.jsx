import React from 'react';
import "../../index.css";
import FoodSection from "./trackerComponents/FoodSection";
import ExerciseSection from './trackerComponents/ExerciseSection';
import Navbar from "scenes/navbar";
import { useState } from 'react';
import Datepicker from "react-tailwindcss-datepicker";

function Tracker() {

  const [date, setDate] = useState(new Date());

  return (
    <div>
        <Navbar />
      <div className="mt-6 flex justify-center">
        <div>
          <Datepicker 
            inputClassName="bg-gray-200 w-36"
            asSingle={true} 
            useRange={false} 
            placeholder={new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()} 
            value={date}
            onChange={date => setDate(date)}
          />
        </div>
      </div>
      <div className="mt-8 bg-gray-200 mx-10 px-5 py-5 rounded-xl">
        <h1 className="text-2xl font-bold"> Calories Remaining </h1>
        <div className="flex gap-5 justify-center mt-2">
          <h2> 3000 (Target) </h2>
          <h2> - </h2>
          <h2> 500 (Food) </h2>
          <h2> + </h2>
          <h2> 0 (Exercise) </h2>
          <h2> = </h2>
          <h2> 2500 </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <FoodSection 
          name = "Breakfast"
        />
        <FoodSection 
          name = "Lunch"
        />
        <FoodSection 
          name = "Dinner"
        />
        <ExerciseSection 
          name = "Exercise"/>
      </div>
    </div>
  )
}

export default Tracker;