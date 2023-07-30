import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";

import styles from "./styles";

const CollectionCard = ({ collection }) => {
  console.log(collection)
  const dispatch = useDispatch();
  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const token = userAuthState?.accessToken;
  const userDetailsState = useSelector((state) => state.userDetails);
  const { favorites = [] } = userDetailsState?.userDetails || [];

  return (
    <Box sx={styles.cardWrapper}>
      <Link
        component={NavLink}
        to={`/collection/${collection._id}`}
        style={styles.imageTitleWrapper}
      >
        <Box>{collection.name}</Box>
      </Link>
    </Box>
  );
};

export default CollectionCard;
