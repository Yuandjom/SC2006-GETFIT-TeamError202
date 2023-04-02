import React from 'react'
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateUser.css";
import { useState, useEffect } from "react";




function UpdateUser() {

  //from your url link the id 
  const loggedInUserId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate()
  const [user, setUser] = useState({
    firstName: "",
    age: "",
    height: "",
    weight: "",
  });


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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  }


  // update the user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.age <= 0) {
      alert("Invalid Age!")
      return;
    }

    if (user.height < 50 || user.height > 300) {
      alert("Invaid Height! Please enter height between 50cm to 300cm!")
      return;
    }

    if (user.weight < 20 || user.weight > 500) {
      alert("Invaid Weight! Please enter weight between 20kg to 500kg!")
      return;
    }

    console.log(user)
    const response = await fetch(`http://localhost:3001/users/${loggedInUserId}`, {
      // PUT
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      //update user
      body: JSON.stringify({ firstName: user.firstName, age: user.age, height: user.height, weight: user.weight })
    });

    const updatedUser = await response.json();
    if (updatedUser) {
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
            <div className="mt-12">
              <div className="updateElement">
                <div className="elementTitle">
                  FIRST NAME
                </div>
                <input className="border border-black rounded-lg p-4 w-8/12 h-12 mr-5" name="firstName" value={user.firstName} onChange={handleChange}></input>
              </div>
              <div className="updateElement">
                <div className="elementTitle">
                  AGE
                </div>
                <input className="border border-black rounded-lg p-4 w-8/12 h-12 mr-5" type="number" name="age" value={user.age} onChange={handleChange}></input>

              </div>
              <div className="updateElement">
                <div className="elementTitle">
                  HEIGHT
                </div>
                <div className="flex items-center gap-8 mr-10">
                  <input className="border border-black rounded-lg p-4 w-4/5 h-12" type="number" name="height" value={user.height} onChange={handleChange}></input>
                  <h2 className="font-bold"> CM </h2>
                </div>
              </div>
              <div className="updateElement">
                <div className="elementTitle">
                  WEIGHT
                </div>
                <div className="flex items-center gap-8 mr-10">
                  <input className="border border-black rounded-lg p-4 w-4/5 h-12" type="number" name="weight" value={user.weight} onChange={handleChange}></input>
                  <h2 className="font-bold"> KG </h2>
                </div>
              </div>
              <button className="updateButton" type="submit">
                UPDATE
              </button>
            </div>
          </div>
        </div>
      </form>
    </Box >
  )
}

export default UpdateUser