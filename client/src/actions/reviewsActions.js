import {
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAIL,
  CLEAR_REVIEWS,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
} from "../constants/reviewsConstants";
import axios from "../api/axios";

const createReview = (token, productId, review) => async (dispatch) => {
  console.log("createreviewaction");
};

const fetchReviews = (productId) => async (dispatch) => {
  console.log("fetchreviewsaction");
  try {
    const data = await axios.get(`/reviews/get/${productId}`);

    dispatch({
      type: FETCH_REVIEWS_SUCCESS,
      payload: data.data.productReviews,
    });
  } catch (error) {
    dispatch({
      type: FETCH_REVIEWS_FAIL,
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
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.message,
    });
  }
};

export { createReview, fetchReviews, clearReviews, deleteReview };
