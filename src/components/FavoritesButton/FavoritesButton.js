import React from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { updateFavorites } from "../../actions/userActions";

const FavoritesButton = ({
  authenticated,
  favorites,
  displayedProduct,
  isGuest,
  token,
  dispatch,
}) => {

  if (!authenticated || isGuest || !favorites || !displayedProduct) {
    return null; 
  }

  const handleFavoriteClick = async (method) => {
    await dispatch(
      updateFavorites({
        token: token,
        method: method,
        productId: displayedProduct._id,
      })
    );
  };

  return favorites.includes(displayedProduct._id) ? (
    <Box
      onClick={() => handleFavoriteClick("REMOVE")}
      sx={{
        color: "purple",
        fontSize: "1.5rem",
        cursor: "pointer",
        marginTop: "10px",
      }}
    >
      <FaHeart />
    </Box>
  ) : (
    <Box
      onClick={() => handleFavoriteClick("ADD")}
      sx={{
        color: "purple",
        fontSize: "1.5rem",
        cursor: "pointer",
        marginTop: "10px",
      }}
    >
      <FaRegHeart />
    </Box>
  );
};

export default FavoritesButton;
