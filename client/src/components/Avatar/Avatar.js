import React from "react";
import Box from "@mui/material/Box";
import styles from "./styles";

const Avatar = ({ review }) => {
  return (
    <Box sx={styles.wrapper}>
      {review?.userAvatar ? (
        <Box>avatar</Box>
      ) : (
        <Box sx={styles.usernameAvatar}>{review.username[0]}</Box>
      )}
    </Box>
  );
};

export default Avatar;
