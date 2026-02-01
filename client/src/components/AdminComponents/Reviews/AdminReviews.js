import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "../../Avatar/Avatar";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import Rating from "@mui/material/Rating";
import Wrapper from "../../Wrapper/Wrapper";
import PageTitle from "../../PageTitle/PageTitle";

import { deleteReview, moderateReview } from "../../../actions/reviewsActions";

import styles from "./styles";

const AdminReviews = () => {
  const dispatch = useDispatch();
  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;
  const reviewsState = useSelector((state) => state.reviews);
  const { reviews } = reviewsState || {};

  return (
    <Wrapper
      id="pageWrapper"
      customStyles={{
        margin: "20px",
      }}
    >
      {reviews.length === 0 && (
        <PageTitle
          title="No reviews to moderate"
          customStyles={{ textAlign: "center" }}
          color="purple"
          size="h5"
          lineBorder
        />
      )}
      {reviews &&
        reviews.map((review) => (
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
                {review.username} reviewed{" "}
                <Link component={NavLink} to={`/product/${review.productId}`}>
                  {review.productName}
                </Link>
              </Typography>
            </Box>{" "}
            <Rating
              name="size-small"
              defaultValue={review.rating}
              size="small"
              readOnly
              style={styles.rating}
            />
            <Typography sx={styles.reviewTitle} variant="h5" component="div">
              {review.reviewTitle}
            </Typography>
            <Typography sx={styles.reviewText} variant="body1" component="div">
              {review.comment}
            </Typography>
            <Wrapper id="reviewOptions">
              {" "}
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
            </Wrapper>
          </Box>
        ))}
    </Wrapper>
  );
};

export default AdminReviews;
