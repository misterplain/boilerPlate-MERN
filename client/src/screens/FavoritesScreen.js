import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard/ProductCard";
import Wrapper from "../components/Wrapper/Wrapper";
import PageTitle from "../components/PageTitle/PageTitle";
import Box from "@mui/material/Box";

const FavoritesScreen = () => {
  const shopState = useSelector((state) => state.shop);
  const productList = useSelector((state) => state.productList);
  const allProducts = productList?.products;
  const { products, hasSearched } = shopState;
  const userDetailsState = useSelector((state) => state.userDetails);
  const { favorites = [] } = userDetailsState?.userDetails || [];

  const favoritesToDisplay = allProducts?.filter(
    (product) => favorites.includes(product._id) && product.isDisplayed
  );

  return (
    <Wrapper flexDirection="column" width="100%" alignItems="center">
      <PageTitle
        title={favorites.length < 1 ? "Nothing favorited yet" : "Favorites"}
        size="h4"
        lineBorder
        color="purple"
      />
      <Wrapper
        flexDirection="row"
        width="100%"
        justifyContent="space-around"
        customStyles={{ margin: "20px 0px" }}
      >
        {" "}
        {favoritesToDisplay.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </Wrapper>
    </Wrapper>
  );
};

export default FavoritesScreen;
