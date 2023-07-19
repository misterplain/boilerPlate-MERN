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

  //determine if user has posted a review and what type of review this is

  // Helper function to check if user has already posted a review
  // const userHasReview = (reviews, userId) => {
  //   return reviews && reviews.some((review) => review.userId === userId);
  // };

  // Helper function to get the user's review
  // const getUserReview = (reviews, userId) => {
  //   return reviews && reviews.find((review) => review.userId === userId);
  // };

  // Helper function to get other reviews
  const getOtherReviews = (reviews, userId) => {
    return reviews && reviews.filter((review) => review.userId !== userId);
  };

  // const userReview = getUserReview(reviews, userId);
  const otherReviews = getOtherReviews(reviews, userId);

  // Helper function to get review style based on status
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
      {/* {authenticated && <Button onClick={() => handleOpenModal(null)}> New Review</Button>} */}
      {/* {!userHasReview(reviews, userId) && authenticated && (
        <Button onClick={() => handleOpenModal(null)}>New Review</Button>
      )} */}
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
      {/* {userReview && (
        <Box
          sx={{ ...styles.reviewWrapper, ...getReviewStyle(userReview) }}
          key={userReview._id}
        >
          <Typography sx={styles.reviewTitle} variant="h5" component="div">
            {userReview.reviewTitle}
          </Typography>
          <Typography sx={styles.reviewText} variant="h5" component="div">
            {userReview.comment}
          </Typography>
          <Typography>{userReview.rating}</Typography>
          {userId && userId === userReview.userId ? (
            <>
              {" "}
              <Button
                color="success"
                sx={styles.button}
                onClick={() => {
                  console.log("Edit review");
                  handleOpenModal(userReview);
                }}
              >
                Edit
              </Button>
              <Button
                color="secondary"
                sx={styles.button}
                onClick={() => {
                  dispatch(deleteReview(token, userReview._id));
                }}
              >
                Delete
              </Button>
            </>
          ) : null}
        </Box>
      )} */}
      {otherReviews &&
        otherReviews.map((review) => (
          <Box sx={styles.reviewWrapper} key={review._id}>
            {/* <Typography variant="h5" component="div">
            {review.reviewTitle}
          </Typography>
          ... */}
            <Typography sx={styles.reviewTitle} variant="h5" component="div">
              {review.reviewTitle} - test
            </Typography>
            <Typography sx={styles.reviewText} variant="h5" component="div">
              {review.comment}
            </Typography>
            <Typography>{review.rating}</Typography>
          </Box>
        ))}
      {/* {reviews &&
        reviews.map((review) => (
          <Box sx={styles.reviewWrapper} key={review._id}>
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
                <Button
                  color="secondary"
                  sx={styles.button}
                  onClick={() => {
                    dispatch(deleteReview(token, review._id));
                  }}
                >
                  Delete
                </Button>
              </>
            ) : null}

          </Box>
        ))} */}
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
