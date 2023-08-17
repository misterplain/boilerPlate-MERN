import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "../../Avatar/Avatar";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import { deleteReview, moderateReview } from "../../../actions/reviewsActions";

import styles from "./styles";

const AdminReviews = () => {
  const dispatch = useDispatch();
  const collectionsList = useSelector((state) => state.collections);
  const { collections } = collectionsList;
  const productsList = useSelector((state) => state.productList);
  const { products } = productsList;
  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;
  const reviewsState = useSelector((state) => state.reviews);
  const { reviews } = reviewsState || {};

  return (
    <Box sx={styles.wrapper}>
      {reviews &&
        reviews.map((review) => (
          <>
            {" "}
            <Box sx={styles.reviewWrapper}>
              {/* <Typography sx={styles.reviewTitle} variant="h5" component="div">
                {review.reviewTitle}
              </Typography>
              <Typography sx={styles.reviewText} variant="h5" component="div">
                {review.comment}
              </Typography>
              <Typography>{review.rating}</Typography> */}
              {/* <Box sx={styles.reviewType}>
                <Typography>What you've said</Typography>
              </Box>{" "} */}
              <Box sx={styles.singleReview}>
                <Box sx={styles.user}>
                  {" "}
                  <Avatar review={review} />
                  <Typography sx={styles.username}>
                    {review.username} says...
                  </Typography>
                  <Link component={NavLink} to={`/product/${review.productId}`}>
                    <Typography sx={styles.productName}>
                      {review.productName}
                    </Typography>
                  </Link>
                </Box>

                <Typography
                  sx={styles.reviewTitle}
                  variant="h5"
                  component="div"
                >
                  {review.reviewTitle}
                </Typography>
                <Typography sx={styles.reviewText} variant="h5" component="div">
                  {review.comment}
                </Typography>
                <Rating name="size-small" defaultValue={review.rating} size="small" readOnly/>
              </Box>
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
