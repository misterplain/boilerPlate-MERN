import React from "react";
import Box from "@mui/material/Box";

import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
import Github from "../img/github.png";

const styles = {
  wrapper: {
    width: "100%",
    border: "1px solid #000",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    width: "100%",
    border: "1px solid blue",
  },
  loginWrapper: {
    width: "100%",
    border: "1px solid red",
    display: "flex",
    flexDirection: "row",
  },
  socialsWrapper: {
    width: "50%",
    border: "1px solid green",
  },
  formWrapper: {
    width: "50%",
    border: "1px solid yellow",
  },
  loginButton: {
    wicth: "150px",
    padding: "15px 25px",
    borderRadius: "5px",
    color: "white",
    marginBottom: "10px",
  },

};

const AuthScreen = () => {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.title}>Choose a Login Method</Box>
      <Box sx={styles.loginWrapper}>
        <Box sx={styles.socialsWrapper}>
          <Box sx={styles.loginButton} style={{ backgroundColor: "#df4930" }}>
            <Box component="img" src={Google} alt="" sx={styles.google} />
            Google
          </Box>
          <Box sx={styles.loginButton} style={{ backgroundColor: "#507cc0" }}>
            <Box component="img" src={Facebook} alt="" sx={styles.facebook} />
            Facebook
          </Box>
          <Box sx={styles.loginButton} style={{ backgroundColor: "#000" }}>
            <Box component="img" src={Github} alt="" sx={styles.github} />
            Github
          </Box>
        </Box>
        <Box sx={styles.formWrapper}></Box>
      </Box>
    </Box>
  );
};

export default AuthScreen;
