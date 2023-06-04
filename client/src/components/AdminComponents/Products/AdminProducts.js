import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import EditProduct from "./EditProduct/EditProduct";
import NewProduct from "./NewProduct/NewProduct";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";

import styles from "./styles";

const AdminProducts = () => {
  return (
    <Box sx={styles.wrapper}>
      {/* <Link component={NavLink} to={"new"}>
        <Button>New</Button>
      </Link>
      <Link component={NavLink} to={"edit"}>
        <Button>edit</Button>
      </Link> */}
      <Routes>
        <Route path="new" element={<NewProduct />} />
        <Route path="edit/:productId" element={<EditProduct />} />
      </Routes>
    </Box>
  );
};

export default AdminProducts;
