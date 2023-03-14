import { useState } from "react";


export default function SubmitFood({food}) {
    
    const [servings,setServings] = useState(0);
    const [meal, setMeal] = useState('Breakfast');

    return (
        <div className="ml-12 mb-10 bg-white h-72 w-4/5 md:w-3/5 lg:w-4/5 border border-black p-5 flex flex-col items-center rounded-xl">
            
            <h2 className="text-xl font-bold"> {food.name} </h2>
            <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col items-center">
                    <h2 className="mt-3 text-xl"> Serving portion </h2>

                    <div className="mt-6 flex gap-3 items-center">
                        <input 
                        className="px-4 w-16 h-10 shadow shadow-inner shadow-xl shadow-black p-3"
                        type="number" 
                        placeholder="1.0"
                        value = {servings}
                        onChange = {e => setServings(e.target.value)}
                        />
                        <h2> servings of </h2>
                        <h2> 1 cup </h2>
                    </div>

                    <h2 className="mt-5 text-xl"> Which meal? </h2>

                    <div className="mt-5">
                        <label className="shadow shadow-inner shadow-xl shadow-black p-3">
                            <select name="selectedFruit" value={meal} onChange={e => setMeal(e.target.value)}>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className="px-5">
                    <h2 className="mt-3 text-xl text-center"> Nutrients: </h2> 
                    <div className="mt-3">               
                        <h2> Protein: {food.protein} </h2>
                        <h2> Lipids (Fats):  {food.lipids} </h2>
                        <h2> Carbohydrates: {food.carbohydrates} </h2>
                    </div> 
                    <div className="flex justify-center mt-6">  
                        <button className="bg-gray-400 p-3 rounded-xl text-white text-lg"> Add Food </button>
                    </div> 
                </div>
            </div>
            
        </div>
    )
}