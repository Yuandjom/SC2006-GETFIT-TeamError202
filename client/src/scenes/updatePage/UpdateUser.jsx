import React from 'react'
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import "./UpdateUser.css";

// import {
//   ChatBubbleOutlineOutlined,
//   FavoriteBorderOutlined,
//   FavoriteOutlined,
//   ShareOutlined,
// } from "@mui/icons-material";
// import { Divider, IconButton, Typography, useTheme } from "@mui/material";
// import FlexBetween from "components/FlexBetween";
// import Friend from "components/Friend";
// import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { setPost } from "state";


function UpdateUser() {

  //from your url link the id 
  const loggedInUserId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const navigate = useNavigate()
  const [user, setUser] = useState({
    firstName: "",
    age: "",
    height: "", 
    weight: "",
  });
  const [input, setInput] = useState("");


  //fetch your user id data
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${loggedInUserId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser({
      firstName: data.firstName, 
      age: data.age, 
      height: data.height, 
      weight: data.weight
    });
  };

  useEffect(() => {
    getUser();
    console.log(user)
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //mount it 
  if (!user) {
    return ""
  }
  // const onClickHandler = (e) => {
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    // setInput(e.target.value);
    // setInput()
  }

  // update the user data
  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(user)
      const response = await fetch(`http://localhost:3001/users/${loggedInUserId}`, {
        // PUT
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` ,
        "Content-Type": "application/json",
      },

        //update user
        body: JSON.stringify({firstName: user.firstName, age: user.age, height: user.height, weight: user.weight})
      });
  
      const updatedUser = await response.json();
      if(updatedUser){
        // dispatch(setUser({ 
        //   firstName: updatedUser.firstName, 
        //   age: updatedUser.age,
        //   weight: updatedUser.weight,
        //   height: updatedUser.height,
        // }));
        navigate("/home");
      }

  }



  return (

    <Box>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className="updatePrompt">
          <div className="updateBox">
            <div className="updateTitle">
              EDIT INFORMATION
            </div>
            <div className="updateElement">
              <div className="elementTitle">
                FIRST NAME
              </div>
              <input type="updateText" name="firstName" value={user.firstName} onChange={handleChange}></input>
            </div>
            <div className="updateElement">
              {/* <div className="elementTitle">
                GENDER
              </div>
              <select id="selectGender">
                <option value="0"> Select Gender </option>
                <option value="1"> Male </option>
                <option value="2"> Female </option>
              </select> */}
              <div className="elementTitle">
                AGE
              </div>
              <input type="number" name="age" value={user.age} onChange={handleChange}></input>

            </div>
            <div className="updateElement">
              <div className="elementTitle">
                HEIGHT
              </div>
              <div className="inputContainer">
                <input type="number" name="height" value={user.height} onChange={handleChange}></input>
                <span className="inputAdd"> CM </span>
              </div>
            </div>
            <div className="updateElement">
              <div className="elementTitle">
                WEIGHT
              </div>
              <div className="inputContainer">
                <input type="number" name="weight" value={user.weight} onChange={handleChange}></input>
                <span className="inputAdd"> KG </span>
              </div>
            </div>
            <button className="updateButton" type="submit">
              UPDATE
            </button>
          </div>
        </div>
      </form>
    </Box >
  )
}

export default UpdateUser