import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import Wrapper from "../Wrapper/Wrapper";


const SearchResults = () => {
  const shopState = useSelector((state) => state.shop);
  const { products } = shopState;

  return (

    <Wrapper justifyContent="space-around">
      {" "}
      {products &&
        products?.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
    </Wrapper>
  );
};

export default SearchResults;
