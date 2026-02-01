import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { deleteReview } from "../../actions/reviewsActions";
import ReviewModal from "../ReviewModal/ReviewModal";
import ReviewsSummary from "../ReviewsSummary/ReviewsSummary";
import Avatar from "../Avatar/Avatar";
import { snackbarDispatch } from "../../utils/snackbarDispatch";
import { enqueueSnackbar } from "notistack";
import AlertMessage from "../AlertMessage/AlertMessage";
import Rating from "@mui/material/Rating";
import styles from "./styles";
import Wrapper from "../Wrapper/Wrapper";
import PageTitle from "../PageTitle/PageTitle";

const ProductReviews = ({ productId }) => {
  const dispatch = useDispatch();
  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const token = userAuthState?.accessToken;
  const userDetailsState = useSelector((state) => state.userDetails);
  const userDetails = userDetailsState?.userDetails || {};
  const { userId, isAdmin } = userDetails;

  const reviewsState = useSelector((state) => state.reviews);
  const { reviews, userReview, filteredReviews, error } = reviewsState || {};

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
    <Wrapper
      gridContainer
      customStyles={{
        justifyContent: "flex-start",
      }}
    >
      {" "}
      <Grid item xs={12} sm={4} sx={{ margin: "20px 0px" }}>
        {reviews && (
          <Box sx={styles.summaryWrapper}>
            <ReviewsSummary
              reviews={reviews}
              filteredReviews={filteredReviews}
            />
          </Box>
        )}
      </Grid>
      <Grid item xs={12} sm={8}>
        <Box sx={styles.reviewsWrapper}>
          {userReview && userReview?.length <= 0 && authenticated && (
            <Button onClick={() => handleOpenModal(null)}>New Review</Button>
          )}
          {error && <AlertMessage type="error">{error}</AlertMessage>}
          {userReview &&
            userReview.map((review) => {
              return (
                <Box
                  sx={{
                    ...styles.reviewWrapper,
                    ...getReviewStyle(userReview),
                  }}
                  key={review._id}
                >
                  <PageTitle
                    title="What you've said:"
                    size="h6"
                    lineBorder
                    color="purple"
                  />
                  <Box sx={styles.singleReview}>
                    <Box sx={styles.user}>
                      {" "}
                      <Box
                        sx={{
                          height: "35px",
                          width: "35px",
                          padding: "0px",
                          margin: "5px",
                        }}
                      >
                        {" "}
                        <Avatar item={review} />
                      </Box>
                      <Typography sx={styles.username}>
                        {review.username} says...
                      </Typography>
                    </Box>
                    <Rating
                      name="size-small"
                      defaultValue={review.rating}
                      size="small"
                      readOnly
                    />
                    <Typography
                      sx={styles.reviewTitle}
                      variant="h5"
                      component="div"
                    >
                      {review.reviewTitle}
                    </Typography>
                    <Typography
                      sx={styles.reviewText}
                      variant="h6"
                      component="div"
                    >
                      {review.comment}
                    </Typography>

                    <Box sx={styles.optionsWrapper}>
                      {userId && userId === review.userId && (
                        <Button
                          color="success"
                          sx={styles.button}
                          onClick={() => {
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
                              // dispatch(deleteReview(token, review._id));
                              snackbarDispatch(
                                dispatch(deleteReview(token, review._id)),
                                "Review deleted successfully",
                                "Error deleting review",
                                enqueueSnackbar
                              );
                            }}
                          >
                            Delete
                          </Button>
                        )}
                    </Box>
                    <Box sx={styles.statusWrapper}>
                      {" "}
                      {review.isDeleted && (
                        <Typography sx={styles.reviewStatus}>
                          This review is deleted, edit your review to repost
                        </Typography>
                      )}{" "}
                      {review.awaitingModeration && !review.isDeleted && (
                        <Typography sx={styles.reviewStatus}>
                          This review is awaiting moderation
                        </Typography>
                      )}{" "}
                      {review.approvedByAdmin === false &&
                        review.awaitingModeration === false && (
                          <Typography sx={styles.reviewStatus}>
                            This review is not approved, edit your review to try
                            again or you may delete your review
                          </Typography>
                        )}
                    </Box>
                  </Box>
                </Box>
              );
            })}
          {otherReviews && otherReviews?.length > 0 && (
            <PageTitle
              title="What others have said:"
              size="h6"
              lineBorder
              color="purple"
            />
          )}
          {otherReviews &&
            otherReviews?.length <= 0 &&
            userReview?.length <= 0 && (
              <Box sx={styles.reviewType}>
                <Typography>No reviews for this product</Typography>
              </Box>
            )}
          {otherReviews &&
            otherReviews.map((review) => (
              <Box sx={styles.singleReview} key={review._id}>
                <Box sx={styles.user}>
                  {" "}
                  <Box
                    sx={{
                      height: "35px",
                      width: "35px",
                      padding: "0px",
                      margin: "5px",
                    }}
                  >
                    {" "}
                    <Avatar item={review} />
                  </Box>
                  <Typography sx={styles.username}>
                    {review.username} says...
                  </Typography>
                </Box>{" "}
                <Rating
                  name="size-small"
                  defaultValue={review.rating}
                  size="small"
                  readOnly
                />
                <Typography
                  sx={styles.reviewTitle}
                  variant="h5"
                  component="div"
                >
                  {review.reviewTitle} - test
                </Typography>
                <Typography sx={styles.reviewText} variant="h6" component="div">
                  {review.comment}
                </Typography>
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
    </Wrapper>
  );
};

export default ProductReviews;
