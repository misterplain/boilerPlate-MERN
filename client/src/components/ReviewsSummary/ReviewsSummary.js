import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RatingIcons from "../RatingIcons/RatingIcons";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { filterReviews, clearFilter } from "../../actions/reviewsActions";
import styles from "./styles";

const ReviewsSummary = ({ reviews }) => {
  const dispatch = useDispatch();
  let reviewCounts = {};
  console.log(reviews);

  const populateReviewCounts = (reviews) => {
    for (let i = 1; i <= 5; i++) {
      reviewCounts[i] = reviews.filter((review) => review.rating === i).length;
    }
  };

  populateReviewCounts(reviews);

  return (
    <Box sx={styles.wrapper}>
      {reviews.length >= 1 && (
        <Button onClick={() => dispatch(clearFilter())}>CLEAR FILTERs</Button>
      )}

     

      {[5, 4, 3, 2, 1].map((rating) => (
        <Box sx={styles.ratingWrapper} key={rating}>
          <RatingIcons rating={rating} />
          {reviewCounts[rating] > 0 ? (
            <Typography
              sx={{ ...styles.reviewText, ...styles.hasReviews }}
              onClick={() => dispatch(filterReviews(rating))}
            >
              {"("}
              {reviewCounts[rating]}
              {")"}
            </Typography>
          ) : (
            <Typography sx={styles.reviewText}>
              {"("}
              {reviewCounts[rating]}
              {")"}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ReviewsSummary;
