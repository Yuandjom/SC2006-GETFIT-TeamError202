import React from 'react'
import Navbar from 'scenes/navbar'
import { Box, Typography , useMediaQuery} from '@mui/material'
import FriendListWidget from 'scenes/widgets/FriendListWidget'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

function Search() {
    
    const [user, setUser] = useState(null);
    const { _id, picturePath } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${_id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
      };
    
      useEffect(() => {
        getUser();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
      if (!user) return null;
    
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={_id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Box justifyContent={'center'}>
            <Typography fontSize={20}> Find Friends </Typography>
          </Box>
          <Box m="2rem 0" />
          {/* <PostsWidget userId={userId} isProfile /> */}
        </Box>
      </Box>
    </Box>
  )
}

export default Search