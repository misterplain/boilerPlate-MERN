import React from "react";
import { Box, Typography } from "@mui/material";
import Card from "../components/Card/Card";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";

import { posts } from "../data";

const styles = {
  wrapper: {
    border: "1px solid black",
    display: "flex",
    flexDirection: "row",
    padding: "50px 20px",
    justifyContent: "center",
    alignItems: "center",
    // flexWrap: "wrap",

  },
};
const HomeScreen = () => {
  return (
    <Box  sx={styles.wrapper}>
      {posts.map((post) => (
        <Link component={NavLink} to={`/post/${post.id}`} >
          {" "}
          <Card post={post} key={post.id} />
        </Link>
      ))}
    </Box>
  );
};

export default HomeScreen;
