import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import ProductCard from "../components/ProductCard/ProductCard";
import CollectionCard from "../components/CollectionCard/CollectionCard";
import Loading from "../components/Loading/Loading";
import AlertMessage from "../components/AlertMessage/AlertMessage";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { setShopToCollection } from "../actions/shopActions";
import Wrapper from "../components/Wrapper/Wrapper";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const collectionsList = useSelector((state) => state.collections);
  const isLoading = collectionsList.loading || productList.loading;
  const error = collectionsList.error || productList.error;
  const products = productList?.products;
  const collections = collectionsList?.collections;

  return (
    <Wrapper
      gridContainer
      customStyles={{
        justifyContent: "space-around",
        alignItems: "stretch",
        textAlign: "center",
      }}
    >
      {isLoading && <Loading />}
      {error && <AlertMessage type="error">{error}</AlertMessage>}
      {products && (
        <Grid item xs={12}>
          <Typography variant="h3">Featured Products</Typography>
        </Grid>
      )}
      <Wrapper width="80%" justifyContent="space-around">
        {products
          ?.filter((product) => product.isFeatured && product.isDisplayed)
          .map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
      </Wrapper>
      {collections && (
        <Grid item xs={12}>
          <Typography variant="h3">Shop by Collection</Typography>
        </Grid>
      )}
      <Wrapper width="80%" justifyContent="space-around">
        {" "}
        {collections?.map(
          (collection) =>
            collection.products.length >= 1 && (
              <Link
                component={NavLink}
                to={"/shop"}
                key={collection._id}
                onClick={() => {
                  dispatch(setShopToCollection(collection._id, collections));
                }}
              >
                <CollectionCard collection={collection} />
              </Link>
            )
        )}
      </Wrapper>
    </Wrapper>
  );
};

export default HomeScreen;
