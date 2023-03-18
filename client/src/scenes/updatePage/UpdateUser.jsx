import React from 'react'
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
// import { useDispatch, useSelector } from "react-redux";
// import { setPost } from "state";


function UpdateUser() {

  //from your url link the id 
  const loggedInUserId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);

  const [user, setUser] = useState();
  const [input, setInput] = useState("");
  //fetch your user id data
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${loggedInUserId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
    console.log(user)
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onClickHandler = (e) => {
    
  }
  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  }
  //mount it 
  if(!user){
    return ""
  }

  return (

    <Box>
      <Navbar />
      <div className="updatePrompt">
        <div className="updateBox">
          <div className="updateTitle">
            {/* EDIT INFORMATION */}
            {user.firstName}
          </div>
          <div className="updateElement">
            <div className="elementTitle">
              USERNAME
            </div>
            <input type="updateProfileText" id="elementBox"></input>
          </div>
          <div className="updateElement">
            <div className="elementTitle">
              GENDER
            </div>
            <select id="selectGender">
              <option value="0"> Select Gender </option>
              <option value="1"> Male </option>
              <option value="2"> Female </option>
            </select>

          </div>
          <div className="updateElement">
            <div className="elementTitle">
              HEIGHT
            </div>
            <input type="updateProfileText" id="elementBox"></input>
          </div>
          <div className="updateElement">
            <div className="elementTitle">
              WEIGHT
            </div>
            <input type="updateProfileText" id="elementBox"></input>
          </div>
          <button className="updateButton">
            UPDATE
          </button>
        </div>
      </div>
    </Box >
  )
}

export default UpdateUser