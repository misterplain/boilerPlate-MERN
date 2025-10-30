import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import Wrapper from "../Wrapper/Wrapper";
import Box from "@mui/material/Box";

const styles = {
  searchStatus: {
    fontSize: "1.5rem",
    width: "100%",
    textAlign: "center",
    margin: "2rem 0",
  },
};

const SearchResults = () => {
  const shopState = useSelector((state) => state.shop);
  const productList = useSelector((state) => state.productList);
  const allProducts = productList?.products;
  const { products, hasSearched } = shopState;

  const featuredProducts = allProducts?.filter(
    (product) => product.isFeatured && product.isDisplayed
  );

  return (
    <Wrapper justifyContent="space-around">
      {!hasSearched && allProducts && (
        <>
          {" "}
          <Box sx={styles.searchStatus}>
            No searches made, please see below out featured products{" "}
          </Box>
          <Wrapper width="100%" justifyContent="space-around">
            {featuredProducts?.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </Wrapper>
        </>
      )}
      {hasSearched && products.length === 0 && (
        <Box sx={styles.searchStatus}>No products found, please try again </Box>
      )}

      {hasSearched && products && products.length >= 1 && (
        <>
          <Box sx={styles.searchStatus}>
            {products.length} product{products.length === 1 ? "" : "s"} matched
            your search:
          </Box>
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </>
      )}
    </Wrapper>
  );
};

export default SearchResults;
