import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import ProductCard from "../components/ProductCard/ProductCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CollectionCard from "../components/CollectionCard/CollectionCard";
import Loading from "../components/Loading/Loading";
import AlertMessage from "../components/AlertMessage/AlertMessage";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { setShopToCollection } from "../actions/shopActions";

const styles = {
  productCardsWrapper: {
    width: "80%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "stretch",
    flexWrap: "wrap",
  },
  collectionsCardsWrapper: {
    width: "80%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
  },
};

const HomeScreen = () => {
  const dispatch = useDispatch();
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
      <Link component={NavLink} to="/shop">
        <Button>Shop Screen</Button>
      </Link>

      {isLoading && <Loading />}
      {error && <AlertMessage type="error">{error}</AlertMessage>}
      {!isLoading && !error && (
        <>
          {products && (
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="h3">Featured Products</Typography>
            </Grid>
          )}
          <Box sx={styles.productCardsWrapper}>
            {" "}
            {products
              ?.filter((product) => product.isFeatured && product.isDisplayed)
              .map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </Box>

          {collections && (
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="h3">Shop by Collection</Typography>
            </Grid>
          )}

          <Box sx={styles.collectionsCardsWrapper}>
            {" "}
            {collections?.map(
              (collection) =>
                collection.products.length >= 1 && (

                  <Link
                    component={NavLink}
                    to={"/shop"}
                    key={collection._id}
                    onClick={() => {
                      dispatch(
                        setShopToCollection(collection._id, collections)
                      );
                    }}
                  >
                    <CollectionCard collection={collection} />
                  </Link>
                )
            )}
          </Box>
        </>
      )}
    </Grid>
  );
};

export default HomeScreen;
