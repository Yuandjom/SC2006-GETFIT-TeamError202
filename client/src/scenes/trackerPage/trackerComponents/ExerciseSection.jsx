import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFoodExercise } from "state";

export default function ExerciseSection({name, exercise, deleteItem}) {

    console.log(exercise);

    const dispatch = useDispatch();

    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const date = useSelector((state) => state.date);
    //const foodexercise = useSelector((state) => state.foodexercise);
    
    const [exerciseArr, setExerciseArr] = useState([]);

    useEffect(() => {
        setExerciseArr(exercise);
    }, [exercise]);

    const deleteExercise = async (exercise) => {
        const response = await fetch(
          `http://localhost:3001/tracker/exercise`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userid: _id, date: date.startDate, name: exercise.name, duration: exercise.duration }),
          }
        );
        const updatedFoodExercise = await response.json();
        dispatch(setFoodExercise({ foodexercise: updatedFoodExercise }));

        deleteItem(true);
        
        //setExerciseArr(updatedFoodExercise);
    };

    return (

        <div className="mx-10 my-8">
            <div className="grid grid-cols-[2fr_100px_100px_50px]">
                <h2 className="font-bold text-xl"> {name} </h2>
                <h2> Duration </h2>
                <h2 className="mr-10"> Calories </h2>
            </div>
            
            {exerciseArr.length > 0 && exerciseArr.map(exercise => (
            <div className="grid grid-cols-[2fr_100px_100px_30px] bg-gray-200 rounded-xl py-2 px-3 my-2 items-center">
                <h2> {exercise.name} </h2>
                <h2> {exercise.duration} </h2>
                <h2> {exercise.calories} </h2>
                <button onClick={() => deleteExercise(exercise)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
            ))
            }
            <div>
                <Link to={'/tracker/exercise'} className="font-bold mx-10"> Add Exercise </Link>
                <hr className="my-2 border-2 border-gray-300"></hr>
            </div>
        </div>
    )
}