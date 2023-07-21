import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import ProductCard from "../components/ProductCard/ProductCard";
import Box from "@mui/material/Box";
import CollectionCard from "../components/CollectionCard/CollectionCard";

const HomeScreen = () => {
  const productList = useSelector((state) => state.productList);
  const collectionsList = useSelector((state) => state.collections);
  const { collections } = collectionsList;

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
        <Typography variant="h3">Featured Products</Typography>
      </Grid>
      {productList?.products
        ?.filter((product) => product.isFeatured)
        .map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h3">Shop by Collection</Typography>
      </Grid>
      {collections?.map((collection) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={collection._id}>
          <CollectionCard collection={collection} />
        </Grid>
      ))}
    </Grid>
  );
};

export default HomeScreen;
