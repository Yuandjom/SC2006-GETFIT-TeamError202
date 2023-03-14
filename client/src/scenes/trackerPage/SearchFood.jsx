import { useState } from "react";
import Navbar from "scenes/navbar";
import SubmitFood from "./trackerComponents/SubmitFood";

export default function SearchFood() {

    const [input, setInput] = useState("");
    const [foodData, setFoodData] = useState([]);

    const [chosenFood, setChosenFood] = useState({});

    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    }

    const handleSubmitFood = (food) => {
        /*
        const foodInfo = {
            name: food.name,
            protein: food.protein,
            lipids: food.lipids,
            carbohydrates: food.carbohydrates,
        }
        */
        setChosenFood(food);
    }

    

    //call the api
    const Search = () => {

        setFoodData([]);
        setChosenFood({});

        //call API
        const {REACT_APP_FOOD_API_KEY} = process.env;
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
            console.log(data);
            data.foods.map(food => {
            //nutrients is an array 
            const nutrients = food.foodNutrients;
            //need to store foods info in an array 
            const foodInfo = {
                name: food.description,
                protein: nutrients[0].value,
                lipids: nutrients[1].value,
                carbohydrates: nutrients[2].value,
            }
            setFoodData(oldArray => [...oldArray, foodInfo]);
        })})
    }

    return (
        <div>
            <Navbar />
            <div className="mt-10 ml-10 mb-5 flex gap-4">
                <input 
                className="px-4 h-12 w-4/5 md:w-3/5 lg:w-2/5"
                type="search" 
                placeholder="Search food"
                value = {input}
                onChange = {handleChange}
                />
                <button onClick={() => Search()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-0"> 
                <div> 
                    {foodData.length > 0 && 
                    <div className="ml-12 mb-10 overflow-y-scroll h-72 w-4/5 md:w-3/5 lg:w-4/5 border border-black px-5">
                        <div className="mt-4 grid grid-cols-4 gap-2 font-bold">
                                <h2> Description </h2>
                                <h2> Protein </h2>
                                <h2> Lipids </h2>
                                <h2> Carbohydrates </h2>
                        </div>
                        <hr className="my-2 border-1 border-gray-300"></hr>
                        
                        {foodData.map(food => (
                        <div>
                            <div className="mt-4 grid grid-cols-4 items-center">
                                <h2> {food.name} </h2>
                                <h2> {food.protein} </h2>
                                <h2> {food.lipids} </h2>
                                <div className="flex justify-between items-center"> 
                                    <h2> {food.carbohydrates} </h2>
                                    <button onClick={() => handleSubmitFood(food)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <hr className="my-2 border-1 border-gray-300"></hr>
                        </div>
                        ))}
                    </div>}
                </div>
                <div>
                    { Object.values(chosenFood).length !== 0 &&
                    <SubmitFood 
                    food= {chosenFood} />
                    }  
                </div>
            </div>
        </div>
    )
}