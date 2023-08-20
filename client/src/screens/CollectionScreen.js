import React from "react";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard/ProductCard";
import Wrapper from "../components/Wrapper/Wrapper";

const CollectionScreen = () => {
  const { collectionId } = useParams();

  const productList = useSelector((state) => state.productList);

  const productsWithinCollection = productList?.products?.filter(
    (product) => product.collectionId === collectionId
  );

  return (

    <Wrapper gridContainer justifyContent="space-around">
      {" "}
      {productsWithinCollection.map((product) => (
        <Grid
          item
          xs={5}
          sm={3}
          md={3}
          lg={3}
          key={product._id}
          sx={{ display: "flex", alignItems: "stretch" }}
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Wrapper>
  );
};

export default CollectionScreen;
