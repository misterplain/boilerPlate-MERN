import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";

import styles from "./styles";

const CollectionCard = ({ collection, productQuantity }) => {
  const dispatch = useDispatch();
  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const token = userAuthState?.accessToken;
  const userDetailsState = useSelector((state) => state.userDetails);
  const { favorites = [] } = userDetailsState?.userDetails || [];

  return (
    <Box sx={styles.cardWrapper}>
        <Box sx={styles.cardImageWrapper}>
          <Box
            component="img"
            sx={styles.image}
            src={collection.image.url}
            alt="alt"
          />
          <Box sx={styles.overlayBox}>
            <Typography sx={styles.name}>{collection.name}</Typography>
            {productQuantity && (
              <Typography sx={styles.length}>
                {collection.products.length} products
              </Typography>
            )}
          </Box>

      </Box>
    </Box>
  );
};

export default CollectionCard;
