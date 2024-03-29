import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFoodExercise } from "state";

export default function FoodSection({name, food, deleteItem}) {

    //console.log(food);

    const dispatch = useDispatch();

    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const date = useSelector((state) => state.date);

    const [foodArr, setFoodArr] = useState([]);

    useEffect(() => {
        setFoodArr(food);
    }, [food])

    const deleteFood = async (food) => {
        const response = await fetch(
            `http://localhost:3001/tracker/food`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ 
                userid: _id, 
                date: date.startDate, 
                name: food.name, 
                meal: food.meal,
                servings: food.servings, 
                measure: food.measure}),
            }
          );
          const updatedFoodExercise = await response.json();
          dispatch(setFoodExercise({ foodexercise: updatedFoodExercise }));
            
          deleteItem((current) => !current);
          
          //setFoodArr(updatedFoodExercise);
    }
    
    return (
        <div className="mx-10 my-8">
            <div className="grid grid-cols-[2fr_70px_70px_70px_70px]">
                <h2 className="font-bold text-xl"> {name} </h2>
                <h2 className=""> Serving(s) </h2>
                <h2 className="ml-2"> Measure  </h2>
                <h2 className="ml-4"> Calories(kcal) </h2>
            </div>
            {foodArr.length > 0 &&
            foodArr.map(food =>
            <div className="grid grid-cols-[2fr_70px_70px_70px_30px] gap-2 bg-gray-200 rounded-xl py-2 px-3 my-2 items-center">
                <h2> {food.name}  </h2>
                <h2> {food.servings} </h2>
                <h2> {food.measure} </h2>
                <h2> {food.calories} </h2>
                <button onClick={()=>deleteFood(food)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>)
            }
            <div>
                <Link to={'/tracker/food'} className="font-bold mx-10"> Add Food </Link>
                <hr className="my-2 border-2 border-gray-300"></hr>
            </div>
        </div>
    )
}