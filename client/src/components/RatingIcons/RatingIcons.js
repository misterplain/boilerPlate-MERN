import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import Box from "@mui/material/Box";

const RatingIcons = ({ rating }) => {

  const roundedRating = Math.round(rating * 2) / 2;

  let stars = [];

  for (let i = 0; i < Math.floor(roundedRating); i++) {
    stars.push(
      <BsStarFill
        style={{ color: "yellow", stroke: "black", strokeWidth: "0.1rem" }}
        key={i}
      />
    );
  }

  if (roundedRating % 1 === 0.5) {
    stars.push(
      <BsStarHalf
        style={{ color: "yellow", stroke: "black", strokeWidth: "0.1rem" }}
        key={Math.floor(roundedRating)}
      />
    );
  }

  for (let i = Math.ceil(roundedRating); i < 5; i++) {
    stars.push(<BsStar key={i} />);
  }

  return <Box sx={{margin: "0px", padding: "0px"}}>{stars}</Box>;
};

export default RatingIcons;
