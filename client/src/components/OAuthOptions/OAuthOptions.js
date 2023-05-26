import React from "react";
import Box from "@mui/material/Box";
import Google from "../../img/google.png";
import Facebook from "../../img/facebook.png";
import Github from "../../img/github.png";

const styles = {
  loginButton: {
    padding: "10px 25px",
    borderRadius: "5px",
    color: "white",
    marginBottom: "10px",
  },
};

const OAuthOptions = () => {
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };

  return (
    <>
      <Box
        sx={styles.loginButton}
        style={{ backgroundColor: "#df4930" }}
        onClick={google}
      >
        <Box component="img" src={Google} alt="" sx={styles.google} />
        Google
      </Box>
      <Box
        sx={styles.loginButton}
        style={{ backgroundColor: "#507cc0" }}
        onClick={facebook}
      >
        <Box component="img" src={Facebook} alt="" sx={styles.facebook} />
        Facebook
      </Box>
      <Box
        sx={styles.loginButton}
        style={{ backgroundColor: "#000" }}
        onClick={github}
      >
        <Box component="img" src={Github} alt="" sx={styles.github} />
        Github
      </Box>
    </>
  );
};

export default OAuthOptions;
