import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import ProductCard from "../components/ProductCard/ProductCard";
import Box from "@mui/material/Box";
import CollectionCard from "../components/CollectionCard/CollectionCard";
import Loading from "../components/Loading/Loading";
import AlertMessage from "../components/AlertMessage/AlertMessage";

const HomeScreen = () => {
  const productList = useSelector((state) => state.productList);
  const collectionsList = useSelector((state) => state.collections);
  const isLoading = collectionsList.loading || productList.loading;
  const error = collectionsList.error || productList.error;
  const products = productList?.products;
  const collections = collectionsList?.collections;

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "stretch",
      }}
    >
      {isLoading && <Loading />}
      {error && <AlertMessage type="error">{error}</AlertMessage>}
      {!isLoading && !error && (
        <>
          {products && (
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="h3">Featured Products</Typography>
            </Grid>
          )}
          {products
            ?.filter((product) => product.isFeatured)
            .map((product) => (
              <Grid item xs={5} sm={3} md={3} lg={3} key={product._id} sx={{display: "flex", alignItems: "stretch"}}>
                <ProductCard product={product} />
              </Grid>
            ))}
          {/* {collections && (
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="h3">Shop by Collection</Typography>
            </Grid>
          )}
          {collections?.map((collection) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={collection._id}>
              <CollectionCard collection={collection} />
            </Grid>
          ))} */}
        </>
      )}
    </Grid>
  );
};

export default HomeScreen;
