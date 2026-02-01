import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import OAuthOptions from "../components/OAuthOptions/OAuthOptions";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import Wrapper from "../components/Wrapper/Wrapper";

const RegisterScreen = () => {
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
        <Typography variant="h5">Register</Typography>
        <RegisterForm />
        <OAuthOptions />
        <Typography>
          Already have an account?
          <Link component={NavLink} to="/auth">
            Log in here
          </Link>
        </Typography>
      </Grid>
    </Wrapper>
  );
};

export default RegisterScreen;
