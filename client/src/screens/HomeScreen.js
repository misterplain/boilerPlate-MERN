import React from "react";
import {  useSelector } from "react-redux";
import {  Typography } from "@mui/material";
import { Grid } from "@mui/material";
import ProductCard from "../components/ProductCard/ProductCard";

const HomeScreen = () => {
  const productList = useSelector((state) => state.productList);

  return (
    <Grid
      container
      sx={{
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h3">All Products</Typography>
      </Grid>
      {productList?.products?.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>

            <ProductCard product={product} />

        </Grid>
      ))}
    </Grid>
  );
};

export default HomeScreen;
