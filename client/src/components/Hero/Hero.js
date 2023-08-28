import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const styles = {
  wrapper: {
    width: "100%",
    height: "300px",
    backgroundColor: "grey",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heroText: {
    width: "90%",
    color: "white",
    fontWeight: "30", 
    fontSize: "10rem", 
    textAlign: "center"
  },
};

const Hero = () => {
  return (
    <Box sx={styles.wrapper}>
      <Typography sx={styles.heroText}>hero</Typography>
    </Box>
  );
};

export default Hero;
