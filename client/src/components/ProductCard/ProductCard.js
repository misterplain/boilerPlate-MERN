import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { updateFavorites } from "../../actions/userActions";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSnackbar } from "notistack";

import styles from "./styles";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const token = userAuthState?.accessToken;
  const userDetailsState = useSelector((state) => state.userDetails);
  const { favorites = [] } = userDetailsState?.userDetails || [];

  return (
    <Box sx={styles.cardWrapper}>
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
            {product.name}
          </Typography>
          <Typography sx={styles.price} variant="h6" component="div">
            ${product.price}
          </Typography>
          <Typography sx={styles.price} variant="h6" component="div">
            {product.reviews.length} reviews
          </Typography>
        </Box>
      </Link>

      <Box sx={styles.iconsWrapper}>
        {authenticated && (
          <Button
            sx={styles.favoritesButton}
            size="small"
            // onClick={async () =>
            //   await dispatch(
            //     updateFavorites({
            //       token: token,
            //       method:
            //         favorites && favorites?.includes(product._id)
            //           ? "REMOVE"
            //           : "ADD",
            //       productId: product._id,
            //     })
            //   )
            // }
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
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProductCard;
