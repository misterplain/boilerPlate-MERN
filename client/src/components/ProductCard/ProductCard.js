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
import Rating from "@mui/material/Rating";

import styles from "./styles";
// import { productStyles } from "../AdminComponents/Collections/styles";

const ProductCard = ({ product }) => {
  const theme = useTheme();
  // console.log(theme)
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const token = userAuthState?.accessToken;
  const userDetailsState = useSelector((state) => state.userDetails);
  const { favorites = [] } = userDetailsState?.userDetails || [];

  return (
    <Link
      component={NavLink}
      to={`/product/${product._id}`}
      style={{ textDecoration: "none" }}
    >
      <Box sx={styles.cardWrapper(theme)}>
        {" "}
        <Box
          sx={styles.cardImage(theme)}
          component="img"
          src={
            product.images.length >= 1
              ? product.images[0].url
              : "https://placehold.co/200"
          }
        />
        <Box sx={styles.namePriceWrapper(theme)}>
          <Typography sx={styles.name} variant="body1" component="div">
            {product.name}
          </Typography>
          {product.stock > 10 && (
            <Typography
              sx={{ fontSize: "0.8rem",color: "green" }}
              variant="body1"
              component="div"
            >
              In stock
            </Typography>
          )}
          {product.stock > 0 && product.stock <= 10 && (
            <Typography
              sx={{ fontSize: "0.8rem", color: "orange" }}
              variant="body1"
              component="div"
            >
              Only {product.stock} left in stock
            </Typography>
          )}
          {product.stock === 0 && (
            <Typography sx={{fontSize: "0.8rem",color: "grey"}} variant="body1" component="div">
              Out of stock
            </Typography>
          )}
          <Box id="price" sx={styles.priceWrapper(theme)}>
            {!product.onSale && (
              <Typography sx={styles.price} variant="body1" component="div">
                ${product.price}
              </Typography>
            )}
            {product.onSale && (
              <>
                {" "}
                <Typography
                  sx={styles.price}
                  variant="body1"
                  // component="div"
                  style={{ textDecoration: "line-through" }}
                >
                  ${product.price}
                </Typography>
                <Typography>&nbsp;on sale for</Typography>
                <Typography
                  sx={styles.salePrice}
                  variant="body1"
                  // component="div"
                >
                  &nbsp;${product.salePrice}
                </Typography>
              </>
            )}
          </Box>
        </Box>{" "}
        <Box sx={styles.iconsWrapper(theme)}>
          <Box sx={styles.ratings}>
            {/* <RatingIcons
            rating={product.averageRating ? product.averageRating : 0}
          /> */}
            <Rating
              name="size-small"
              defaultValue={product.averageRating ? product.averageRating : 0}
              size="small"
              readOnly
            />
            <Typography sx={styles.numberReviews(theme)}>
              {"("}
              {product.reviews.length}
              {")"}
            </Typography>
          </Box>

          {authenticated && (
            <Box
              sx={styles.favoritesButton(theme)}
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
      </Box>{" "}
    </Link>
  );
};

export default ProductCard;
