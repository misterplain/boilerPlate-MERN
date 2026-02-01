import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { Formik } from "formik";
import { loginForm } from "../../actions/authActions";
import AlertMessage from "../AlertMessage/AlertMessage";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';

const styles = {
  formContainer: {
    padding: "10px",
  },
  formWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background : "white",
    padding: "10px",
    borderRadius: "5px",
  },
  formGroup: {
    width: "100%",
    
  },
};

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Field required")
    .min(5, "Email must be at least 5 characters"),
  password: Yup.string()
    .min(6)
    .required("Please provide a password of at least 6 characters"),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const shoppingCartState = useSelector((state) => state.shoppingCart);
  const { cartItems } = shoppingCartState;

  const authState = useSelector((state) => state.userAuth);
  const { loginError } = authState;


  const handleSubmit = (values) => {
    dispatch(loginForm(values.email, values.password, cartItems));
  };

  //show password state
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={styles.formContainer}>

      {loginError && <AlertMessage type="error">{loginError}</AlertMessage>}

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          isValid,
          errors,
          touched,
        }) => (
          <form onSubmit={handleSubmit} styles={{ width: "100%" }}>
            <Box sx={styles.formWrapper}>
              {" "}
              <Box sx={styles.formGroup}>
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    touched.email && errors.email ? errors.email : " "
                  }

                />
              </Box>
              <Box sx={styles.formGroup}>
                <OutlinedInput
                  name="password"
                  // label="Password"
                  placeholder="Password"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    touched.password && errors.password ? errors.password : " "
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Box>
              <Button variant="contained" type="submit" disabled={!isValid} sx={{marginTop: "20px"}}>
                Login
              </Button>{" "}
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
