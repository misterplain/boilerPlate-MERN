import React from "react";
import Box from "@mui/material/Box";
import {useDispatch } from "react-redux";
import Google from "../../img/google.png";
import Facebook from "../../img/facebook.png";
import Github from "../../img/github.png";
import { loginOAuth } from "../../actions/authActions";

const styles = {
  loginButton: {
    padding: "10px 25px",
    borderRadius: "5px",
    color: "white",
    marginBottom: "10px",
  },
};

const OAuthOptions = () => {
  const dispatch = useDispatch()

  const handleSubmit = (provider) => {
    dispatch(loginOAuth(provider))
  }

  return (
    <>
      <Box
        sx={styles.loginButton}
        style={{ backgroundColor: "#df4930" }}
        onClick={()=>handleSubmit("google")}
      >
        <Box component="img" src={Google} alt="" sx={styles.google} />
        Google
      </Box>
      <Box
        sx={styles.loginButton}
        style={{ backgroundColor: "#507cc0" }}
        onClick={()=>handleSubmit("facebook")}
      >
        <Box component="img" src={Facebook} alt="" sx={styles.facebook} />
        Facebook
      </Box>
      <Box
        sx={styles.loginButton}
        style={{ backgroundColor: "#000" }}
        onClick={()=>handleSubmit("github")}
      >
        <Box component="img" src={Github} alt="" sx={styles.github} />
        Github
      </Box>
    </>
  );
};

export default OAuthOptions;
