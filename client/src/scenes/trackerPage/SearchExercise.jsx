import { useEffect } from "react";
import Navbar from "scenes/navbar";
import fetch from "node-fetch";
import { useState } from "react";
import Spinner from "../../components/Spinner";
import SubmitExercise from "./trackerComponents/SubmitExercise";
import Modal from "./trackerComponents/Popup";

export default function SearchExercise() {

    const [input, setInput] = useState("");
    const [exerciseData, setExerciseData] = useState([]);
    const [ready, setReady] = useState(false);
    const [empty, setEmpty] = useState(false);
    
    const [chosenExercise, setChosenExercise] = useState({});
    const [description, setDescription] = useState("");
    const [show, setShow] = useState(false);

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

        if (input === "") {
            setDescription("Search input cannot be empty!");
            setShow(true);
            setExerciseData([]);
            return;
        }

        setExerciseData([]);
        setChosenExercise({});
        setReady(true);
        setEmpty(false);

        const response = await fetch(`http://localhost:3001/tracker/searchexercise?input=${input}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();

        console.log(data);

        if (data.length == 0) {
            console.log("empty");
            setEmpty(true);
        }
    
        data.map(exercise => {
            const exerciseInfo = {
                name: exercise.name,
                calories: exercise.calories_per_hour,
            }
            setExerciseData(oldArray => [...oldArray, exerciseInfo]);
        })

        setReady(false);
    }

    return (
        <div>
            <Navbar />
            {(ready) && <Spinner />}
            <Modal 
                onClose={() => setShow(false)} 
                show={show} 
                description={description}
            />
            <div className="mt-10 ml-10 mb-5 flex gap-4">
                <input 
                className="px-4 h-12 w-4/5 md:w-3/5 lg:w-2/5"
                type="search" 
                placeholder="Search exercise"
                value = {input}
                onChange = {handleChange}
                />
                <button onClick={Search}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div>        
            <div className="grid grid-cols-1 lg:grid-cols-2"> 
            
                <div> 
                    {empty &&
                    <div className="ml-12 mb-6 w-4/5 md:w-3/5 lg:w-4/5"> 
                        <p> No exercise found. Please check your spelling and try again. </p>
                    </div>
                    }
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
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
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

