import React, { useEffect } from "react";
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
import PageTitle from "../components/PageTitle/PageTitle";
import Hero from "../components/Hero/Hero";
import { fetchTopTenReviews } from "../actions/reviewsActions";
import Testimonials from "../components/Testimonials/Testimonials";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const collectionsList = useSelector((state) => state.collections);
  const isLoading = collectionsList.loading || productList.loading;
  const error = collectionsList.error || productList.error;
  const products = productList?.products;
  const collections = collectionsList?.collections;

  useEffect(() => {
    dispatch(fetchTopTenReviews());
  }, [dispatch]);

  return (
    <Wrapper
      gridContainer
      customStyles={{
        justifyContent: "space-around",
        alignItems: "stretch",
      }}
    >
      {isLoading && <Loading />}
      {error && <AlertMessage type="error">{error}</AlertMessage>}
      {!isLoading && !error && (
        <>
          <Hero />
          <Testimonials />
        </>
      )}
      {/* {products && (
        <Wrapper width="90%" justifyContent="space-around" customStyles={{
          marginTop: "50px"
        }}>
          {" "}
          <PageTitle
            size="h5"
            title="Featured Products"
            color="purple"
            lineBorder
          />
          {products
            ?.filter((product) => product.isFeatured && product.isDisplayed)
            .map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
        </Wrapper>
      )} */}

      {/* {collections && (
        <Wrapper width="90%" justifyContent="space-around" customStyles={{
          marginTop: "50px"
        }}>
          <PageTitle
            size="h5"
            title="Shop by Collection"
            color="purple"
            lineBorder
          />{" "}
          {collections?.map(
            (collection) =>
              collection.products.length >= 1 && (
                <Link
                  component={NavLink}
                  to={"/shop"}
                  key={collection._id}
                  onClick={() => {
                    dispatch(
                      setShopToCollection(collection._id, collections, {
                        singleCollection: true,
                      })
                    );
                  }}
                >
                  <CollectionCard collection={collection} />
                </Link>
              )
          )}
        </Wrapper>
      )} */}
    </Wrapper>
  );
};

export default HomeScreen;
