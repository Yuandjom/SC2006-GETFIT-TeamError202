import { useEffect } from "react";
import Navbar from "scenes/navbar";
import axios from "axios";

export default function SearchExercise() {

    var activity = 'skiing';
    
    useEffect(() => {

        const {REACT_APP_EXERCISE_API_KEY} = process.env;
        const URL = 'https://api.api-ninjas.com/v1/caloriesburned?activity=' + activity

        axios.get(URL, 
        { headers: {
        'x-api-key': REACT_APP_EXERCISE_API_KEY}
        }
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))
        )
        
    }, []);
    
    
    return (
        <div>
            <Navbar />
            <h1> Search Exercise </h1>
        </div>
    )
}