import { useState } from "react";
import Navbar from "scenes/navbar";
import SubmitFood from "./trackerComponents/SubmitFood";
import Spinner from "../../components/Spinner";
import fetch from "node-fetch";

export default function SearchFood() {

    const [input, setInput] = useState("");
    const [foodData, setFoodData] = useState([]);

    const [chosenFood, setChosenFood] = useState({});
    const [ready, setReady] = useState(false);

    const [empty, setEmpty] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    }

    const handleSubmitFood = (food) => {
        setChosenFood(food);
    }

    const calCalories = (protein, fat, carbohydrates) => {
        const calories = protein*4 + fat*9 + carbohydrates*4;
        //console.log(calories);
        return Number(calories).toFixed(2);
    }

    //call the api
    const Search = () => {

        setFoodData([]);
        setChosenFood({});
        setReady(true);
        setEmpty(false);

        //call API
        let {REACT_APP_FOOD_API_KEY} = process.env;
        REACT_APP_FOOD_API_KEY = REACT_APP_FOOD_API_KEY.replace(/'/g,'');

        const params = {
                api_key: REACT_APP_FOOD_API_KEY,
                query: input,
                dataType: ["Survey (FNDDS)"],
                pagesize: 20,
        }

        const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=${encodeURIComponent(params.pagesize)}`
        
        function getData() {
            return fetch(api_url)
            .then(response => response.json())
        }

        getData().then(data => {
            //console.log("data");
            console.log(data.foods);

            if (data.foods.length == 0) {
                setEmpty(true);
            }

            else {
                data.foods.map(food => {
                    //nutrients is an array 
                    const nutrients = food.foodNutrients;
                    //get measurements array 
                    const measuresArr = food.foodMeasures;
        
                    var measure;

                    if (measuresArr.length === 0) {
                        measure = {
                            disseminationText: "100g",
                            gramWeight: 100
                        }
                    }
                    else {
                         //get lowest rank 
                        var min = Math.min(...measuresArr.map(item => item.rank));
                        console.log(min);
            
                        for (let i=0; i<measuresArr.length; i++) {
                            if (measuresArr[i].rank === min) {
                                measure = measuresArr[i];
                                break;
                            }
                        }
                    }
        
                    //calculate calories 
                    const calories = calCalories(nutrients[0].value, nutrients[1].value, nutrients[2].value);
                    //need to store foods info in an array 
                    const foodInfo = {
                        name: food.description,
                        protein: nutrients[0].value,
                        lipids: nutrients[1].value,
                        carbohydrates: nutrients[2].value,
                        calories: calories,
                        measure: measure.disseminationText,
                        grams: measure.gramWeight,
                    }
                    setFoodData(oldArray => [...oldArray, foodInfo]);
                })
            }
            setReady(false);
            console.log(ready);
        })
    }

    

    return (
        <div>
            <Navbar />
            {(ready) && <Spinner/>}
            <div className="mt-10 ml-10 mb-5 flex gap-4">
                <input 
                className="px-4 h-12 w-4/5 md:w-3/5 lg:w-2/5"
                type="search" 
                placeholder="Search food"
                value = {input}
                onChange = {handleChange}
                />
                <button onClick={() => Search()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-0"> 
                <div> 
                    {empty &&
                    <div className="ml-12 mb-6 w-4/5 md:w-3/5 lg:w-4/5"> 
                        <p> No food found. Please check your spelling and try again. </p>
                    </div>
                    }
                    {foodData.length > 0 &&
                    <div className="ml-12 mb-6 w-4/5 md:w-3/5 lg:w-4/5">
                        <div className="overflow-y-scroll h-72 border border-black px-5">
                            <div className="mt-4 mr-10 flex justify-between font-bold">
                                    <h2> Description </h2>
                                    <h2> Calories </h2>
                            </div>
                            <hr className="my-2 border-1 border-gray-300"></hr>
                            
                            {foodData.map(food => (
                            <div>
                                <div className="mt-4 flex justify-between items-center">
                                    <h2> {food.name} </h2>
                                    <div className="flex justify-between gap-8 items-center"> 
                                        <h2> {food.calories} </h2>
                                        <button onClick={() => handleSubmitFood(food)}>
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
                        <h2 className="mt-5"> *Calories are in 100g of food </h2>
                    </div>}

                </div>
                <div>
                    {Object.values(chosenFood).length !== 0 &&
                    <SubmitFood 
                    food= {chosenFood} />
                    }  
                </div>
            </div>
        </div>
    )
}