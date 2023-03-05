import { useState } from 'react';
import fetch from "node-fetch";

export default function FoodApi() {
    const [data, setData] = useState([]);

    const {REACT_APP_API_KEY} = process.env;
    console.log('WCynUB6VjAGTmj5Y3MaSY36o8x2KQnzB0FVn1KPb');

    const params = {
            api_key: REACT_APP_API_KEY,
            query: 'cheddar cheese',
            dataType: ["Survey (FNDDS)"],
            pagesize: 5,
    }
        
    const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=${encodeURIComponent(params.pagesize)}`

    function getData() {
        return fetch(api_url)
        .then(response => response.json())
    }

    getData().then(data => {
        console.log(data);
        setData(oldArray => [...oldArray, data]);
    })

    return (
        <div>
            <h2> Hello </h2>
        </div>
    )
}