import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { deleteReview, editReview } from "../../actions/reviewsActions";
import ReviewModal from "../ReviewModal/ReviewModal";

import styles from "./styles";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const token = userAuthState?.accessToken;
  const userDetailsState = useSelector((state) => state.userDetails);
  const userDetails = userDetailsState?.userDetails || {};
  const { userId } = userDetails;

  const reviewsState = useSelector((state) => state.reviews);
  const { reviews } = reviewsState || {};

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

  return (
    <Box sx={styles.wrapper}>
      <Button onClick={() => handleOpenModal(null)}> New Review</Button>
      {reviews &&
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
            <ReviewModal
              open={open}
              handleClose={handleCloseModal}
              isEdit={review}
            />
          </Box>
        ))}
      <ReviewModal
        open={open}
        handleClose={handleCloseModal}
        review={reviewToEdit}
      />
    </Box>
  );
};

export default ProductReviews;
