import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";

import {
  getUnmoderatedReviews,
  deleteReview,
  moderateReview,
} from "../../../actions/reviewsActions";

import styles from "./styles";

const AdminReviews = () => {
  const dispatch = useDispatch();
  const collectionsList = useSelector((state) => state.collections);
  const { collections } = collectionsList;
  const productsList = useSelector((state) => state.productList);
  const { products } = productsList;
  //get token from state
  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;
  const reviewsState = useSelector((state) => state.reviews);
  const { reviews } = reviewsState || {};

  useEffect(() => {
    dispatch(getUnmoderatedReviews(token));
  }, [dispatch, token]);

  return (
    <Box sx={styles.wrapper}>
      {reviews &&
        reviews.map((review) => (
          <>
            {" "}
            <Box sx={styles.reviewWrapper}>
              <Typography sx={styles.reviewTitle} variant="h5" component="div">
                {review.reviewTitle}
              </Typography>
              <Typography sx={styles.reviewText} variant="h5" component="div">
                {review.comment}
              </Typography>
              <Typography>{review.rating}</Typography>
            </Box>
            <Button
              onClick={() =>
                dispatch(
                  moderateReview(token, review._id, {
                    approvedByAdmin: true,
                    awaitingModeration: false,
                    isDeleted: false,
                  })
                )
              }
            >
              Approve
            </Button>
            <Button
              onClick={() =>
                dispatch(
                  moderateReview(token, review._id, {
                    approvedByAdmin: false,
                    awaitingModeration: false,
                    isDeleted: false,
                  })
                )
              }
            >
              Deny
            </Button>
            <Button
              onClick={() => {
                dispatch(deleteReview(token, review._id));
              }}
            >
              Delete
            </Button>
          </>
        ))}
    </Box>
  );
};

export default AdminReviews;
