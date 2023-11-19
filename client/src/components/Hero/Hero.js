import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { loginForm, logoutUser } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import heroBackGround from "../../assets/heroBackGround.jpg";

const styles = {
  wrapper: {
    width: "100%",
    height: "300px",
    // backgroundColor: "#968FFC",
    // backgroundImage: heroBackGround,
    backgroundImage: `url(${heroBackGround})`,
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "3px solid #b3b3cc",
  },
  heroText: {
    width: "90%",
    color: "#b3b3cc",
    fontWeight: "30",
    fontSize: "10rem",
    textAlign: "center",
  },
  adminTestButton: {
    margin: "20px",
  },
};

const Hero = () => {
  const dispatch = useDispatch();

  const signInAdmin = () => {
    dispatch(loginForm("admin@test.com", "123456"));
  };

  const authState = useSelector((state) => state.userAuth);
  const { loginError, authenticated } = authState;

  const userDetailsState = useSelector((state) => state?.userDetails);
  const isAdmin = userDetailsState?.userDetails?.isAdmin;

  return (
    <Box sx={styles.wrapper}>
      {" "}
      {!authenticated && (
        <Button
          variant="contained"
          size="large"
          color="secondary"
          sx={styles.adminTestButton}
          onClick={() => signInAdmin()}
        >
          Login with Admin Credentials to test
        </Button>
      )}
      {authenticated && isAdmin && (
        <Button
          variant="contained"
          size="large"
          color="primary"
          sx={styles.adminTestButton}
          onClick={() => dispatch(logoutUser())}
        >
          Logout of Admin test account
        </Button>
      )}
      <Typography sx={styles.heroText}>hero</Typography>
    </Box>
  );
};

export default Hero;
