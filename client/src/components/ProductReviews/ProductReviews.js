import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { deleteReview, editReview } from "../../actions/reviewsActions";
import ReviewModal from "../ReviewModal/ReviewModal";

import styles from "./styles";

const ProductReviews = ({ productId }) => {
  const dispatch = useDispatch();
  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const token = userAuthState?.accessToken;
  const userDetailsState = useSelector((state) => state.userDetails);
  const userDetails = userDetailsState?.userDetails || {};
  const { userId } = userDetails;

  const reviewsState = useSelector((state) => state.reviews);
  const { reviews, userReview } = reviewsState || {};

  //modal state

  const [open, setOpen] = useState(false);
  const [reviewToEdit, setReviewToEdit] = useState(null);

  const handleOpenModal = (review) => {
    setReviewToEdit(review);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setReviewToEdit(null);
    setOpen(false);
  };

  const getOtherReviews = (reviews, userId) => {
    return reviews && reviews.filter((review) => review.userId !== userId);
  };

  const otherReviews = getOtherReviews(reviews, userId);

  const getReviewStyle = (review) => {
    if (review.awaitingModeration) {
      return styles.reviewAwaitingModeration;
    } else if (review.isApproved) {
      return styles.reviewApproved;
    } else {
      return styles.reviewDeleted;
    }
  };

  return (
    <Box sx={styles.wrapper}>
      {userReview && userReview?.length <= 0 && authenticated && (
        <Button onClick={() => handleOpenModal(null)}>New Review</Button>
      )}
      {userReview && 
        userReview.map((review) => (
          <Box
            sx={{ ...styles.reviewWrapper, ...getReviewStyle(userReview) }}
            key={review._id}
          >
            {review.isDeleted && (
              <Typography>
                THIS REVIEW IS DELETED, EDIT YOUR REVIEW TO REPOST
              </Typography>
            )}
            {review.awaitingModeration && !review.isDeleted && (
              <Typography>THIS REVIEW IS AWAITING MODERATION</Typography>
            )}
            {review.approvedByAdmin === false &&
              review.awaitingModeration === false && (
                <Typography>
                  THIS REVIEW IS NOT APPROVED, EDIT YOUR REVIEW TO TRY AGAIN OR
                  YOU MAY DELETE YOUR REVIEW
                </Typography>
              )}
            <Typography sx={styles.reviewTitle} variant="h5" component="div">
              {review.reviewTitle}
            </Typography>
            <Typography sx={styles.reviewText} variant="h5" component="div">
              {review.comment}
            </Typography>
            <Typography>{review.rating}</Typography>
            {userId && userId === review.userId ? (
              <>
                {" "}
                <Button
                  color="success"
                  sx={styles.button}
                  onClick={() => {
                    console.log("Edit review");
                    handleOpenModal(review);
                  }}
                >
                  Edit
                </Button>
                {!review.isDeleted && (
                  <Button
                    color="secondary"
                    sx={styles.button}
                    onClick={() => {
                      dispatch(deleteReview(token, review._id));
                    }}
                  >
                    Delete
                  </Button>
                )}
              </>
            ) : null}
          </Box>
        ))}
      {otherReviews &&
        otherReviews.map((review) => (
          <Box sx={styles.reviewWrapper} key={review._id}>
            <Typography sx={styles.reviewTitle} variant="h5" component="div">
              {review.reviewTitle} - test
            </Typography>
            <Typography sx={styles.reviewText} variant="h5" component="div">
              {review.comment}
            </Typography>
            <Typography>{review.rating}</Typography>
          </Box>
        ))}
      <ReviewModal
        open={open}
        handleClose={handleCloseModal}
        review={reviewToEdit}
        productId={productId}
      />
    </Box>
  );
};

export default ProductReviews;
