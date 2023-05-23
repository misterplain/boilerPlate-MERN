import React from "react";
import { Box, Typography } from "@mui/material";
import Card from "../components/Card/Card";

import {posts} from "../data";


const styles = {
  wrapper: {
    border: "1px solid black",
    display: "flex", 
    padding: "50px 20px",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
};
const HomeScreen = () => {
  return (
    <Box sx={styles.wrapper}>
      {posts.map((post) => (
        <Card post={post} key={post.id}/>
      ))}
    </Box>
  );
};

export default HomeScreen;
