import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import ProductCard from "../components/ProductCard/ProductCard";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { fetchAllProducts } from "../actions/productActions";

const styles = {
  fontChange1: {
    fontFamily: "Montserrat",
  },
};

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  return (
    <Grid
      container
      sx={{
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h3">All Products</Typography>
      </Grid>
      {productList?.products?.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
          <Link component={NavLink} to={`/product/${product._id}`}>
            <ProductCard product={product} />
          </Link>
        </Grid>
      ))}{" "}
      <Grid item={12}>
        <></>
        <Typography variant="h1">Heading 1</Typography>
        <Typography variant="h2">Heading 2</Typography>
        <Typography variant="h3">Heading 3</Typography>
        <Typography variant="h4">Heading 4</Typography>
        <Typography variant="h5">Heading 5</Typography>
        <Typography variant="h6">Heading 6</Typography>
        <Typography variant="subtitle1">Subtitle 1</Typography>
        <Typography variant="subtitle2">Subtitle 2</Typography>
        <Typography variant="body1">Body 1</Typography>
        <Typography variant="body2">Body 2</Typography>
        <Typography variant="button">Button</Typography>
        <br></br>
        <Typography variant="caption">Caption</Typography>
        <br></br>
        <Typography variant="overline">Overline</Typography>
        <hr></hr>
        <Typography sx={styles.fontChange1} variant="h1">
          Heading 1
        </Typography>
        <Typography sx={styles.fontChange1} variant="h2">
          Heading 2
        </Typography>
        <Typography sx={styles.fontChange1} variant="h3">
          Heading 3
        </Typography>
        <Typography sx={styles.fontChange1} variant="h4">
          Heading 4
        </Typography>
        <Typography sx={styles.fontChange1} variant="h5">
          Heading 5
        </Typography>
        <Typography sx={styles.fontChange1} variant="h6">
          Heading 6
        </Typography>
        <Typography sx={styles.fontChange1} variant="subtitle1">
          Subtitle 1
        </Typography>
        <Typography sx={styles.fontChange1} variant="subtitle2">
          Subtitle 2
        </Typography>
        <Typography sx={styles.fontChange1} variant="body1">
          Body 1
        </Typography>
        <Typography sx={styles.fontChange1} variant="body2">
          Body 2
        </Typography>
        <Typography sx={styles.fontChange1} variant="button">
          Button
        </Typography>
        <br></br>
        <Typography sx={styles.fontChange1} variant="caption">
          Caption
        </Typography>
        <br></br>
        <Typography sx={styles.fontChange1} variant="overline">
          Overline
        </Typography>
        <Typography sx={styles.fontChange1} variant="overline">
          test commit
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HomeScreen;
