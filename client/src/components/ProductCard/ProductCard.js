import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { updateFavorites } from "../../actions/userActions";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSnackbar } from "notistack";
import { useTheme } from "@mui/material/styles";
import RatingIcons from "../RatingIcons/RatingIcons";

import styles from "./styles";
import { productStyles } from "../AdminComponents/Collections/styles";

const ProductCard = ({ product }) => {

  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const token = userAuthState?.accessToken;
  const userDetailsState = useSelector((state) => state.userDetails);
  const { favorites = [] } = userDetailsState?.userDetails || [];

  return (
    <Box sx={styles.cardWrapper(theme)}>
      <Link
        component={NavLink}
        to={`/product/${product._id}`}
        style={styles.imageTitleWrapper}
      >
        {" "}
        <Box
          sx={styles.cardImage}
          component="img"
          src={
            product.images.length >= 1
              ? product.images[0].url
              : "https://placehold.co/200"
          }
        />
        <Box sx={styles.namePriceWrapper}>
          <Typography sx={styles.name} variant="h6" component="div">
            {product.name} - ${product.price}
          </Typography>
        </Box>
      </Link>

      <Box sx={styles.iconsWrapper}>
        <Box sx={styles.ratings}>
          <RatingIcons
            rating={product.averageRating ? product.averageRating : 0}
          />
          <Typography sx={styles.numberReviews}>
            {"( "}
            {product.reviews.length}
            {" )"}
          </Typography>
        </Box>

        {authenticated && (
          <Box
            sx={styles.favoritesButton}
            size="small"
            onClick={async () => {
              const method =
                favorites && favorites?.includes(product._id)
                  ? "REMOVE"
                  : "ADD";
              await dispatch(
                updateFavorites({
                  token: token,
                  method: method,
                  productId: product._id,
                })
              );
              if (method === "ADD") {
                enqueueSnackbar(`${product.name} added to favorites`, {
                  variant: "success",
                });
              } else {
                enqueueSnackbar(`${product.name} removed from favorites`, {
                  variant: "info",
                });
              }
            }}
          >
            {favorites && favorites?.includes(product._id) ? (
              <FaHeart />
            ) : (
              <FaRegHeart />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductCard;
