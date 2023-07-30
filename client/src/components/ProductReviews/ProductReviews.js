import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { deleteReview} from "../../actions/reviewsActions";
import ReviewModal from "../ReviewModal/ReviewModal";
import ReviewsSummary from "../ReviewsSummary/ReviewsSummary";
import Avatar from "../Avatar/Avatar";
import styles from "./styles";

const ProductReviews = ({ productId }) => {
  const dispatch = useDispatch();
  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const token = userAuthState?.accessToken;
  const userDetailsState = useSelector((state) => state.userDetails);
  const userDetails = userDetailsState?.userDetails || {};
  const { userId, isAdmin } = userDetails;

  const reviewsState = useSelector((state) => state.reviews);
  const { reviews, userReview, filteredReviews } = reviewsState || {};

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

  const getOtherReviews = (filteredReviews, userId) => {
    return (
      filteredReviews &&
      filteredReviews.filter((review) => review.userId !== userId)
    );
  };

  const otherReviews = getOtherReviews(filteredReviews, userId);

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
    <Grid container sx={styles.wrapper}>
      <Grid item xs={12} sm={4}>
        {reviews && (
          <Box sx={styles.summaryWrapper}>
            <ReviewsSummary reviews={reviews} />
          </Box>
        )}
      </Grid>
      <Grid item xs={12} sm={8}>
        <Box sx={styles.reviewsWrapper}>
          {userReview && userReview?.length <= 0 && authenticated && (
            <Button onClick={() => handleOpenModal(null)}>New Review</Button>
          )}

          {userReview &&
            userReview.map((review) => (
              <Box
                sx={{ ...styles.reviewWrapper, ...getReviewStyle(userReview) }}
                key={review._id}
              >
                <Box sx={styles.reviewType}>
                  <Typography>What you've said</Typography>
                </Box>{" "}
                <Box sx={styles.singleReview}>
                  <Box sx={styles.user}>
                    {" "}
                    <Avatar review={review} />
                    <Typography sx={styles.username}>
                      {review.username} says...
                    </Typography>
                  </Box>

                  <Typography
                    sx={styles.reviewTitle}
                    variant="h5"
                    component="div"
                  >
                    {review.reviewTitle}
                  </Typography>
                  <Typography
                    sx={styles.reviewText}
                    variant="h5"
                    component="div"
                  >
                    {review.comment}
                  </Typography>
                  <Typography>{review.rating}</Typography>
                  <Box sx={styles.optionsWrapper}>
                    {userId && userId === review.userId && (
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
                    )}
                    {(isAdmin || userId === review.userId) &&
                      !review.isDeleted && (
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
                  </Box>
                  <Box sx={styles.userReviewStatus}>
                    {" "}
                    {review.isDeleted && (
                      <Typography>
                        THIS REVIEW IS DELETED, EDIT YOUR REVIEW TO REPOST
                      </Typography>
                    )}{" "}
                    {review.awaitingModeration && !review.isDeleted && (
                      <Typography>
                        THIS REVIEW IS AWAITING MODERATION
                      </Typography>
                    )}{" "}
                    {review.approvedByAdmin === false &&
                      review.awaitingModeration === false && (
                        <Typography>
                          THIS REVIEW IS NOT APPROVED, EDIT YOUR REVIEW TO TRY
                          AGAIN OR YOU MAY DELETE YOUR REVIEW
                        </Typography>
                      )}
                  </Box>
                </Box>
              </Box>
            ))}
          {otherReviews && otherReviews?.length > 0 && (
            <Box sx={styles.reviewType}>
              <Typography>What others have said</Typography>
            </Box>
          )}
          {otherReviews &&
            otherReviews.map((review) => (
              <Box sx={styles.singleReview} key={review._id}>
                <Box sx={styles.user}>
                  {" "}
                  <Avatar review={review} />
                  <Typography sx={styles.username}>
                    {review.username} says...
                  </Typography>
                </Box>
                <Typography
                  sx={styles.reviewTitle}
                  variant="h5"
                  component="div"
                >
                  {review.reviewTitle} - test
                </Typography>
                <Typography sx={styles.reviewText} variant="h5" component="div">
                  {review.comment}
                </Typography>
                <Typography>{review.rating}</Typography>
                {isAdmin && (
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
              </Box>
            ))}
        </Box>
      </Grid>

      <ReviewModal
        open={open}
        handleClose={handleCloseModal}
        review={reviewToEdit}
        productId={productId}
      />
    </Grid>
  );
};

export default ProductReviews;
