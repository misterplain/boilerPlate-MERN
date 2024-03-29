import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Formik } from "formik";
import * as Yup from "yup";
import { editReview, createReview } from "../../actions/reviewsActions";
import AlertMessage from "../AlertMessage/AlertMessage";
import { snackbarDispatch } from "../../utils/snackbarDispatch";
import { enqueueSnackbar } from "notistack";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ReviewModal = ({ open, handleClose, review, productId }) => {
  const dispatch = useDispatch();
  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const token = userAuthState?.accessToken;
  const userDetailsState = useSelector((state) => state.userDetails);
  const userDetails = userDetailsState?.userDetails || {};
  const { userId } = userDetails;

  const reviewsState = useSelector((state) => state.reviews);
  const { reviews, error } = reviewsState || {};

  const validationSchema = Yup.object({
    reviewTitle: Yup.string().required("Required"),
    reviewRating: Yup.number().required("Required"),
    reviewContent: Yup.string().required("Required"),
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {error && <AlertMessage type="error">{error}</AlertMessage>}
          <Box>
            <Formik
              initialValues={{
                reviewTitle: review ? review.reviewTitle : "",
                reviewRating: review ? review.rating : "",
                reviewContent: review ? review.comment : "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                const reviewData = {
                  reviewTitle: values.reviewTitle,
                  rating: values.reviewRating,
                  comment: values.reviewContent,
                  approvedByAdmin: false,
                  awaitingModeration: true,
                };
                try {
                  if (review) {
                    snackbarDispatch(
                      dispatch(editReview(token, review._id, reviewData)),
                      "Review updated successfully",
                      "Error updating review",
                      enqueueSnackbar,
                      [
                        () => {
                          handleClose();
                        },
                        () => {
                          resetForm();
                        },
                      ]
                    );
                  } else {
                    snackbarDispatch(
                      dispatch(createReview(token, productId, reviewData)),
                      "Review created successfully",
                      "Error creating review",
                      enqueueSnackbar,
                      [
                        () => {
                          handleClose();
                        },
                        () => {
                          resetForm();
                        },
                      ]
                    );
                  }

                } catch (error) {
                  console.log("Review operation failed", error);
                }
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlue,
                values,
                isValid,
                errors,
                touched,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={1} sx={{fontSize: "30px"}} >
                    <Rating
                      name="reviewRating"
                      defaultValue={review ? review.rating : 5}
                      precision={1}
                      value={values.reviewRating}
                      onChange={handleChange}
                      size="large"
                    />

                  </Stack>
                  <FormControl>
                    <FormLabel id="reviewTitle">Review Title</FormLabel>
                    <FormGroup>
                      <TextField
                        name="reviewTitle"
                        variant="filled"
                        color="success"
                        value={values.reviewTitle}
                        onChange={handleChange}
                        helperText={errors.reviewTitle}
                      />
                    </FormGroup>
                  </FormControl>
                  <hr></hr>
                  <FormControl>
                    <FormLabel id="reviewContent">Review Content</FormLabel>
                    <FormGroup>
                      <TextField
                        name="reviewContent"
                        variant="filled"
                        color="success"
                        value={values.reviewContent}
                        onChange={handleChange}
                        helperText={errors.reviewContent}
                      />
                    </FormGroup>
                  </FormControl>
                  <hr></hr>
                  <Button type="submit">Post Review</Button>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ReviewModal;
