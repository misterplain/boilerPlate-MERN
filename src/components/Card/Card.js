import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import styles from "./styles";

const Card = ({ post }) => {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.title}>{post.title}</Box>
      <Box component="img" src={post.img} alt="" sx={styles.image}></Box>
      <Box sx={styles.description}>{post.desc}</Box>
      <Button sx={styles.button}>Read More</Button>
    </Box>
  );
};

export default Card;
