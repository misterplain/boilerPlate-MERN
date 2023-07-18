import {
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAIL,
  CLEAR_REVIEWS,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  EDIT_REVIEW_SUCCESS,
  EDIT_REVIEW_FAIL,
  MODERATE_REVIEW_SUCCESS,
  MODERATE_REVIEW_FAIL,
} from "../constants/reviewsConstants";
import axios from "../api/axios";

// const createReview = (token, productId, review) => async (dispatch) => {
//   console.log("createreviewaction");
// };

const fetchReviews = (token, productId) => async (dispatch) => {
  console.log("fetchreviewsaction");

  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.get(`/reviews/get/${productId}`, options);

    dispatch({
      type: FETCH_REVIEWS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_REVIEWS_FAIL,
      payload: error.message,
    });
  }
};

const getUnmoderatedReviews = (token) => async (dispatch) => {
  console.log("getunmoderatedreviewsaction");
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.get("/reviews/unmoderated", options);

    dispatch({
      type: FETCH_REVIEWS_SUCCESS,
      payload: data.data.unmoderatedReviews,
    });
  } catch (error) {
    dispatch({
      type: FETCH_REVIEWS_FAIL,
      payload: error.message,
    });
  }
};

const moderateReview = (token, reviewId, reviewData) => async (dispatch) => {
  console.log("moderatereviewaction");
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.put(
      `/reviews/moderate/${reviewId}`,
      reviewData,
      options
    );
    console.log(data);
    dispatch({
      type: MODERATE_REVIEW_SUCCESS,
      payload: data.data.reviewToModerate,
    });
  } catch (error) {
    dispatch({
      type: MODERATE_REVIEW_FAIL,
      payload: error.message,
    });
  }
};

const clearReviews = () => async (dispatch) => {
  dispatch({
    type: CLEAR_REVIEWS,
  });
};

const deleteReview = (token, reviewId) => async (dispatch) => {
  console.log("deletereviewaction");
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.delete(`/reviews/delete/${reviewId}`, options);

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.data.updatedReview,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.message,
    });
  }
};

const createReview = (token, productId, reviewData) => async (dispatch) => {
  // console.log(token, productId, reviewData);
  console.log("createreviewaction");
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.post(
      `/reviews/new/${productId}`,
      reviewData,
      options
    );

    dispatch({
      type: CREATE_REVIEW_SUCCESS,
      payload: data.data.newReview,
    });

    return Promise.resolve();
  } catch (error) {
    dispatch({
      type: CREATE_REVIEW_FAIL,
      payload: {
        error: error.response
          ? error.response.data
          : { message: error.message },
      },
    });
    return Promise.reject();
  }
};

const editReview = (token, reviewId, reviewData) => async (dispatch) => {
  console.log(reviewData);
  console.log("deletereviewaction");
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.put(
      `/reviews/edit/${reviewId}`,
      reviewData,
      options
    );

    dispatch({
      type: EDIT_REVIEW_SUCCESS,
      payload: data.data.reviewToEdit,
    });
    return Promise.resolve();
  } catch (error) {
    dispatch({
      type: EDIT_REVIEW_FAIL,
      payload: error.message,
    });
    return Promise.reject();
  }
};

export {
  fetchReviews,
  clearReviews,
  moderateReview,
  deleteReview,
  createReview,
  editReview,
  getUnmoderatedReviews,
};
