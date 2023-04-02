import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFoodExercise } from "state";
import Modal from "./Popup";

export default function SubmitExercise({exercise}) {

    //console.log(exercise);
    
    const dispatch = useDispatch();

    //get userid
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const date = useSelector((state) => state.date);

    const [show, setShow] = useState(false);

    const [hours,setHours] = useState(1);
    const [description, setDescription] = useState("");

    //after submit --> post
    const handleSubmit = async () => {

        if (hours < 1) {
            setDescription("Number of hours need to be larger than 0!");
            setShow(true);
            return;
        }

        var finalCalories;
        
        //get calories for exercise
        finalCalories = hours*exercise.calories;

        //console.log(finalCalories);

        //create data to be passed in 
        
        const exerciseData = {
            userid: _id,
            date: date.startDate, 
            name: exercise.name,
            duration: hours,
            calories: finalCalories,
        }

        console.log(exerciseData);

        const response = await fetch(`http://localhost:3001/tracker/exercise`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(exerciseData),
        });
        const updatedFoodExercise = await response.json();

        dispatch(setFoodExercise({foodexercise: updatedFoodExercise}));

        setDescription("Exercise added!");
        setShow(true);
    }

    return (
        <div> 
            <Modal 
                onClose={() => setShow(false)} 
                show={show} 
                description={description}
            />
            <div className="ml-12 mb-10 bg-white h-60 w-4/5 md:w-3/5 lg:w-4/5 border border-black p-5 flex flex-col items-center rounded-xl">
                <h2 className="text-xl font-bold"> {exercise.name} </h2>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col items-center">
                        <h2 className="mt-3 text-xl text-center"> How long did you exercise? </h2>

                        <div className="mt-6 flex gap-5 items-center">
                            <input 
                            className="px-4 w-14 h-10 p-3 border border-black rounded-xl"
                            type="number" 
                            placeholder="1.0"
                            value = {hours}
                            min = {1}
                            onChange = {e => setHours(e.target.value)}
                            />
                            <p className="text-sm text-center"> hour(s) </p>
                        </div>
                    </div>
                    <div className="px-5">
                        <h2 className="mt-3 text-xl text-center"> Calories burned: </h2> 
                        <h2 className="text-center"> {exercise.calories*hours} kcal </h2>
                        <div className="flex justify-center mt-6">  
                            <button onClick={handleSubmit} className="bg-gray-400 p-3 rounded-xl text-white text-lg"> Add Exercise </button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}