import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFoodExercise } from "state";

export default function SubmitFood({food}) {

    const dispatch = useDispatch();

    //get userid
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const date = useSelector((state) => state.date);

    const [servings,setServings] = useState(1);
    const [meal, setMeal] = useState("breakfast");
    const [measure, setMeasure] = useState('100g');


    //after submit --> post
    const handleSubmit = async () => {

        var finalCalories;

        //count total calories 
        if (measure === '100g') {
            finalCalories = Number(food.calories*servings).toFixed(2);
        }
        else {
            finalCalories = Number(food.calories*servings*(food.grams/100)).toFixed(2);
        }
        
        //create data to be passed in 
        
        const foodData = {
            userid: _id,
            date: date.startDate, 
            name: food.name,
            calories: finalCalories,
            meal: meal,
            measure: measure,
            servings: servings,
        }

        //console.log(foodData);

        //need check to see if the post has been created??? --> then add meal 
        //if not created then create a new one 
        const response = await fetch(`http://localhost:3001/tracker/food`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(foodData),
        });
        const updatedFoodExercise = await response.json();

        dispatch(setFoodExercise({foodexercise: updatedFoodExercise}));
    }

    return (
        <div className="ml-12 mb-10 bg-white h-72 w-4/5 md:w-3/5 lg:w-4/5 border border-black p-5 flex flex-col items-center rounded-xl">
            
            <h2 className="text-xl font-bold"> {food.name} </h2>
            <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center">
                    <h2 className="mt-3 text-xl"> Serving portion </h2>

                    <div className="mt-6 flex gap-1 items-center">
                        <input 
                        className="px-4 w-14 h-10 p-3 border border-black rounded-xl"
                        type="number" 
                        placeholder="1.0"
                        value = {servings}
                        onChange = {e => setServings(e.target.value)}
                        />
                        <p className="text-sm text-center"> servings of </p>
                        <label>
                            <select 
                                className="p-3 w-24" 
                                name="selectedMeasure"
                                value={measure} 
                                onChange={e => setMeasure(e.target.value)}>
                                <option value="100g">100g</option>
                                <option value={food.measure}>{food.measure} ({food.grams}g)</option>
                            </select>
                        </label>
                    </div>

                    <h2 className="mt-2 text-xl"> Which meal? </h2>

                    <div className="mt-2">
                        {/*shadow shadow-inner shadow-xl shadow-black */}
                        <label className="p-3">
                            <select name="selectedMeal" value={meal} onChange={e => setMeal(e.target.value)}>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className="px-5">
                    <h2 className="mt-3 text-xl text-center"> Nutrients: </h2> 
                    <div className="mt-3">               
                        <h2> Protein: {food.protein} g </h2>
                        <h2> Lipids (Fats):  {food.lipids} g </h2>
                        <h2> Carbohydrates: {food.carbohydrates} g </h2>
                        <h2> Calories: {food.calories} kcal </h2>
                    </div> 
                    <div className="flex justify-center mt-6">  
                        <button onClick={handleSubmit} className="bg-gray-400 p-3 rounded-xl text-white text-lg"> Add Food </button>
                    </div> 
                </div>
            </div>
            
        </div>
    )
}