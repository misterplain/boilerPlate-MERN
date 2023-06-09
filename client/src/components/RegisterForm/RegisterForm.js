import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { Formik } from "formik";
import { registerForm } from "../../actions/authActions";

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
  },
  formGroup: {
    width: "100%",
  },
};

const loginSchema = Yup.object({
  username: Yup.string().required("Field required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Field required")
    .min(5, "Email must be at least 5 characters"),
  password: Yup.string()
    .min(6)
    .required("Please provide a password of at least 6 characters"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const shoppingCartState = useSelector((state) => state.shoppingCart);
  const { cartItems } = shoppingCartState;

  const handleSubmit = (values) => {

    dispatch(
      registerForm(
        values.username,
        values.email,
        values.password,
        values.confirmPassword,
        cartItems
      )
    );
  };

  return (
    <Box sx={styles.formContainer}>
      {" "}
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
                  name="username"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    touched.username && errors.username ? errors.username : " "
                  }
                />
              </Box>
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
                <TextField
                  name="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    touched.password && errors.password ? errors.password : " "
                  }
                />
              </Box>
              <Box sx={styles.formGroup}>
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    touched.confirmPassword && errors.confirmPassword
                      ? errors.confirmPassword
                      : " "
                  }
                />
              </Box>
              <Button variant="contained" type="submit" disabled={!isValid}>
                Login
              </Button>{" "}
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterForm;
