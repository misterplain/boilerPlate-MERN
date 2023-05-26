import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import OAuthOptions from "../components/OAuthOptions/OAuthOptions";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";

const styles = {
  wrapper: {
    width: "100%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    width: "100%",
  },
  loginWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  socialsWrapper: {
    width: "50%",
  },
  formWrapper: {
    width: "50%",
    height: "500px",
  },
};

const RegisterScreen = () => {
  return (
    <Box sx={styles.wrapper}>
      <Typography variant="h5" sx={styles.title}>
        Register
      </Typography>
      <Box sx={styles.loginWrapper}>
        <Box sx={styles.formWrapper}>
          <RegisterForm />
        </Box>
        <Box sx={styles.socialsWrapper}>
          <OAuthOptions />

        </Box>
      </Box>
      <Box sx={styles.reroute}>
        <Typography>
          Already have an account?{" "}
          <Link component={NavLink} to="/auth">
            Log in here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterScreen;
