import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import OAuthOptions from "../components/OAuthOptions/OAuthOptions";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";

const RegisterScreen = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={10} sm={6} md={4}>
        {" "}
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
    </Grid>
  );
};

export default RegisterScreen;
