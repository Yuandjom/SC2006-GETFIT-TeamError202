import React from 'react'
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";

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
import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setPost } from "state";

function UpdateUser() {

  return (

    <Box>
      <Navbar />
      <div className="updatePrompt">
        <div className="updateBox">
          <div className="updateTitle">
            EDIT INFORMATION
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