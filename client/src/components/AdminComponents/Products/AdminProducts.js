import React from "react";
import {  Route, Routes } from "react-router-dom";
import EditProduct from "./EditProduct/EditProduct";
import NewProduct from "./NewProduct/NewProduct";
import Box from "@mui/material/Box";

import styles from "./styles";

const AdminProducts = () => {
  return (
    <Box sx={styles.wrapper}>
      <Routes>
        <Route path="new" element={<NewProduct />} />
        <Route path="edit/:productId" element={<EditProduct />} />
      </Routes>
    </Box>
  );
};

export default AdminProducts;
