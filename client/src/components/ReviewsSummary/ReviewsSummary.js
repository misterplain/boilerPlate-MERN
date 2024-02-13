import React from "react";
import Button from "@mui/material/Button";
import RatingIcons from "../RatingIcons/RatingIcons";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { filterReviews, clearFilter } from "../../actions/reviewsActions";
import styles from "./styles";
import Wrapper from "../Wrapper/Wrapper";

const ReviewsSummary = ({ reviews, filteredReviews }) => {
  const dispatch = useDispatch();
  let reviewCounts = {};

  const populateReviewCounts = (reviews) => {
    for (let i = 1; i <= 5; i++) {
      reviewCounts[i] = reviews.filter((review) => review.rating === i).length;
    }
  };

  populateReviewCounts(reviews);

  return (
    <Wrapper
      alignItems="center"
      justifyContent="flex-start"
      flexDirection="column"
    >
      {" "}
      {reviews.length >= 1 && filteredReviews.length < reviews.length && (
        <Button onClick={() => dispatch(clearFilter())}>All Reviews</Button>
      )}
      {[5, 4, 3, 2, 1].map((rating) => (
        <Wrapper alignItems="center" justifyContent="flex-start" key={rating}>
          {" "}
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
        </Wrapper>
      ))}
    </Wrapper>
  );
};

export default ReviewsSummary;
