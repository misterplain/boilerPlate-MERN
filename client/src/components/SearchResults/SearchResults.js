import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./styles";

function valuetext(value) {
  return `${value}°C`;
}

const SearchResults = () => {
  const dispatch = useDispatch();
  const collectionsList = useSelector((state) => state.collections);
  const shopState = useSelector((state) => state.shop);
  const { products, error } = shopState;
  const { collections } = collectionsList;


  return (
    <Box sx={styles.wrapper}>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "stretch",
        }}
      >

          <Box sx={styles.productCardsWrapper}>
          {products &&
          products?.map((product) => (

            <ProductCard product={product} key={product._id}/>

          ))}
          </Box>
      </Grid>
    </Box>
  );
};

export default SearchResults;
