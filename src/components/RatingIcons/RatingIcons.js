import React from "react";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const RatingIcons = ({ rating }) => {
  const roundedRating = Math.round(rating * 2) / 2;

  let stars = [];

  for (let i = 0; i < Math.floor(roundedRating); i++) {
    stars.push(<StarIcon key={i} sx={{ color: "#DE970B" }} />);
  }

  if (roundedRating % 1 === 0.5) {
    stars.push(
      <StarHalfIcon key={Math.floor(roundedRating)} sx={{ color: "#DE970B" }} />
    );
  }

  for (let i = Math.ceil(roundedRating); i < 5; i++) {
    stars.push(<StarOutlineIcon key={i} sx={{ color: "#DE970B" }} />);
  }

  return <Box sx={{ margin: "0px", padding: "0px" }}>{stars}</Box>;
};

export default RatingIcons;
