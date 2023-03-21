import { useState } from "react";
import TextField from "@mui/material/TextField";
import data from "../../components/List";

export default function List() {

    const [inputText, setInputText] = useState("");
    const inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    //create a new array by filtering the original array
     filteredData = 
    
    data.map((el) => {
        //if no input the return the original
        if (inputText === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.text.toLowerCase().includes(inputText)
        }
    })


    return (
        <div>
            <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            value = {inputText}
            label="Search"
            onChange={inputHandler} />
            <ul>
                {filteredData.map((item) => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        </div>
    )


    



}