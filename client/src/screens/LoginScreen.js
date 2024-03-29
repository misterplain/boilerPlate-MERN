import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import OAuthOptions from "../components/OAuthOptions/OAuthOptions";
import LoginForm from "../components/LoginForm/LoginForm";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import Wrapper from "../components/Wrapper/Wrapper";

const LoginScreen = () => {
  return (
    <Wrapper
      gridContainer
      spacing="2"
      justifyContent="center"
      customStyles={{
        textAlign: "center",
      }}
    >
      <Grid item xs={10} sm={6} md={4}>
        <Typography variant="h5">Login</Typography>
        <LoginForm />
        <OAuthOptions />
        <Typography>
          Don't have an account?{" "}
          <Link component={NavLink} to="/register">
            Register here
          </Link>
        </Typography>
      </Grid>
    </Wrapper>

  );
};

export default LoginScreen;
