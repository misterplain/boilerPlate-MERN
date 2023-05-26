import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import OAuthOptions from "../components/OAuthOptions/OAuthOptions";
import LoginForm from "../components/LoginForm/LoginForm";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
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
    height: "300px",
  },
};

const LoginScreen = () => {
  return (
    <Box sx={styles.wrapper}>
      <Typography variant="h5" sx={styles.title}>
        Login
      </Typography>
      <Box sx={styles.loginWrapper}>
        <Box sx={styles.formWrapper}>
          <LoginForm />
        </Box>
        <Box sx={styles.socialsWrapper}>
          <OAuthOptions />
        </Box>
      </Box>
      <Box sx={styles.reroute}>
        <Typography>
          Don't have an account?{" "}
          <Link component={NavLink} to="/register">
            Register here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginScreen;
