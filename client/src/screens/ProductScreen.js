import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ProductScreen = () => {
  const location = useLocation();
  const { productId } = useParams();
  console.log(productId);
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  console.log(productList);

  const displayedProduct = productList.products.find(
    (product) => product._id === productId
  );

  console.log(displayedProduct);

  const styles = {
    wrapper: {
      border: "1px solid black",
      display: "flex",
      flexDirection: "column",
    },
  };

  return (
    <Box sx={styles.wrapper}>
      <Typography variant="h3">Product Screen</Typography>
      <Typography variant="h5">{displayedProduct?.name}</Typography>
      <Typography variant="h5">{displayedProduct?.price}</Typography>
    </Box>
  );
};

export default ProductScreen;
