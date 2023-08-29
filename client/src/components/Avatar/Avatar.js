import React from "react";
import Box from "@mui/material/Box";
import styles from "./styles";

const Avatar = ({ item }) => {
  
  // const avatar = item?.userAvatar || item?.review
  return (
    <>
      {" "}
      {item?.userAvatar ? (
        <Box component="img" sx={styles.photoAvatar} src={item.userAvatar.url}/>
   
      ) : (
        <Box sx={styles.usernameAvatar}>{item?.username[0]}</Box>
      )}
    </>
  );
};

export default Avatar;
