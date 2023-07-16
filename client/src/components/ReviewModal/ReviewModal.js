import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  deleteReview,
  editReview,
  createReview,
} from "../../actions/reviewsActions";

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

const ReviewModal = ({ open, handleClose, review }) => {
  const dispatch = useDispatch();
  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const token = userAuthState?.accessToken;
  const userDetailsState = useSelector((state) => state.userDetails);
  const userDetails = userDetailsState?.userDetails || {};
  const { userId } = userDetails;

  const reviewsState = useSelector((state) => state.reviews);
  const { reviews } = reviewsState || {};

  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);

  console.log(review);

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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {review && review.reviewTitle}
          </Typography>
          <Box>
            <Formik
              initialValues={{
                reviewTitle: review ? review.reviewTitle : "",
                reviewRating: review ? review.rating : "",
                reviewContent: review ? review.comment : "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                const productData = {};
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
                    <FormLabel id="reviewRating">Rating 1-5</FormLabel>
                    <FormGroup>
                      <TextField
                        name="reviewRating"
                        variant="filled"
                        color="success"
                        type="number"
                        value={values.reviewRating}
                        onChange={handleChange}
                        helperText={errors.reviewRating}
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