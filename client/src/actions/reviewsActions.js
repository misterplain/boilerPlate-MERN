import {
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAIL,
  FETCH_TOPREVIEWS_REQUEST,
  FETCH_TOPREVIEWS_SUCCESS,
  FETCH_TOPREVIEWS_FAIL,
  FETCH_UNMODERATED_REVIEWS_REQUEST,
  FETCH_UNMODERATED_REVIEWS_SUCCESS,
  FETCH_UNMODERATED_REVIEWS_FAIL,
  CLEAR_REVIEWS,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  EDIT_REVIEW_REQUEST,
  EDIT_REVIEW_SUCCESS,
  EDIT_REVIEW_FAIL,
  MODERATE_REVIEW_REQUEST,
  MODERATE_REVIEW_SUCCESS,
  MODERATE_REVIEW_FAIL,
  FILTER_REVIEWS_SUCCESS,
  FILTER_REVIEWS_FAIL,
  CLEAR_FILTER,
} from "../constants/reviewsConstants";
import axios from "../api/axios";

const fetchTopTenReviews = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_TOPREVIEWS_REQUEST,
    });

    const data = await axios.get("/reviews/top");

    dispatch({
      type: FETCH_TOPREVIEWS_SUCCESS,
      payload: data.data.topTenReviews,
    });
  } catch (error) {
    dispatch({
      type: FETCH_TOPREVIEWS_FAIL,
      payload: error.message,
    });
  }
}


const fetchReviews = (token, productId) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_REVIEWS_REQUEST,
    });
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
  try {
    dispatch({
      type: FETCH_UNMODERATED_REVIEWS_REQUEST,
    });
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.get("/reviews/unmoderated", options);

    dispatch({
      type: FETCH_UNMODERATED_REVIEWS_SUCCESS,
      payload: data.data.unmoderatedReviews,
    });
  } catch (error) {
    dispatch({
      type: FETCH_UNMODERATED_REVIEWS_FAIL,
      payload: error.message,
    });
  }
};

const moderateReview = (token, reviewId, reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: MODERATE_REVIEW_REQUEST,
    });
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
  try {
    dispatch({
      type: DELETE_REVIEW_REQUEST,
    });
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
    return Promise.resolve()
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
    return Promise.reject()
  }
};

const createReview = (token, productId, reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_REVIEW_REQUEST,
    });
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
  try {
    dispatch({
      type: EDIT_REVIEW_REQUEST,
    });
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

const filterReviews = (rating) => async (dispatch) => {
  try {
    dispatch({
      type: FILTER_REVIEWS_SUCCESS,
      rating: rating,
    });
  } catch (error) {
    dispatch({
      type: FILTER_REVIEWS_FAIL,
      payload: error.message,
    });
  }
};

const clearFilter = () => async (dispatch) => {
  dispatch({
    type: CLEAR_FILTER,
  });
};

export {
  fetchTopTenReviews,
  fetchReviews,
  clearReviews,
  moderateReview,
  deleteReview,
  createReview,
  editReview,
  getUnmoderatedReviews,
  filterReviews,
  clearFilter,
};
