import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import ExplorePage from "scenes/explorePage";
import Tracker from "scenes/trackerPage/Tracker";
import SearchFood from "scenes/trackerPage/SearchFood";
import SearchExercise from "scenes/trackerPage/SearchExercise";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import UpdateUser from "scenes/updatePage/UpdateUser";
import Test from "scenes/test/Test";
import Search from "scenes/searchPage/Search";
import { React, useState } from "react";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
   <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/home"
                element={isAuth ? <HomePage /> : <Navigate to="/" />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route
                path="/tracker"
                element={isAuth ? <Tracker /> : <Navigate to="/" />} />
              <Route
                path="/tracker/food"
                element={isAuth ? <SearchFood /> : <Navigate to="/" />} />
              <Route
                path="/tracker/exercise"
                element={isAuth ? <SearchExercise /> : <Navigate to="/" />} />
              <Route
                path="/profile/:userId"
                element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
              <Route
                path="/updateUser"
                element={isAuth ? <UpdateUser /> : <Navigate to="/" />} />
              <Route
                path="/findFriends"
                element={isAuth ? <Search /> : <Navigate to="/" />} />
              <Route path="/test" element={<Test />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
  ); 
}

export default App;
