import { useEffect } from "react";
import Navbar from "scenes/navbar";
import fetch from "node-fetch";
import { useState } from "react";
import SubmitExercise from "./trackerComponents/SubmitExercise";

export default function SearchExercise() {

    const [input, setInput] = useState("");
    const [exerciseData, setExerciseData] = useState([]);
    
    const [chosenExercise, setChosenExercise] = useState({});

    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    }

    const handleSubmitExercise = (exercise) => {
        setChosenExercise(exercise);
    }

    //call the api
    const Search = async (e) => {
        e.preventDefault();

        setExerciseData([]);

        const {REACT_APP_EXERCISE_API_KEY} = process.env;

        const options = {
            method: 'GET',
            headers: {
                'x-api-key': REACT_APP_EXERCISE_API_KEY
            }
        };
        
        const url = 'https://api.api-ninjas.com/v1/caloriesburned?activity=' + input
            
        const data = await fetch(url, options)
        .then(res => res.json())

        data.map(exercise => {
            const exerciseInfo = {
                name: exercise.name,
                calories: exercise.calories_per_hour,
            }
            setExerciseData(oldArray => [...oldArray, exerciseInfo]);
        })
    }

    return (
        <div>
            <Navbar />
            <div className="mt-10 ml-10 mb-5 flex gap-4">
                <input 
                className="px-4 h-12 w-4/5 md:w-3/5 lg:w-2/5"
                type="search" 
                placeholder="Search exercise"
                value = {input}
                onChange = {handleChange}
                />
                <button onClick={Search}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2"> 
            
                <div> 
                    {exerciseData.length > 0 && 
                    <div className="ml-12 mb-6 w-4/5 md:w-3/5 lg:w-4/5">
                        <div className="overflow-y-scroll h-72 border border-black px-5">
                            <div className="mt-4 flex justify-between font-bold">
                                    <h2> Description </h2>
                                    <h2 className="mr-10"> Calories </h2>
                            </div>
                            <hr className="my-2 border-1 border-gray-300"></hr>
                            
                            {exerciseData.map(exercise => (
                            <div>
                                <div className="mt-4 flex justify-between items-center">
                                    <h2> {exercise.name} </h2>
                                    <div className="flex gap-10">
                                        <h2> {exercise.calories} </h2>
                                        <button onClick={() => handleSubmitExercise(exercise)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <hr className="my-2 border-1 border-gray-300"></hr>
                            </div>
                            ))}
                        </div>
                        <h2 className="mt-5"> *Calories burned in 60 minutes of exercise </h2>
                    </div>
                    }
                </div>
                <div>
                    {Object.values(chosenExercise).length !== 0 &&
                    <SubmitExercise 
                    exercise = {chosenExercise} />
                    }  
                </div>
            </div>
        </div>
)

}

