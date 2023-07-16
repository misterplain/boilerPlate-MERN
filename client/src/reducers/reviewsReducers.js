import {
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAIL,
  CLEAR_REVIEWS,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
} from "../constants/reviewsConstants";

export const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        review: action.payload.data.review,
      };
    case CREATE_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload.data.message,
      };
    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        error: null,
        reviews: action.payload,
      };
    case FETCH_REVIEWS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_REVIEW_SUCCESS:
        console.log(action.payload)
      return {
        ...state,
        error: null,
        reviews: state.reviews.filter(
          (review) => review._id !== action.payload.data.reviewId
        ),
      };

    case CLEAR_REVIEWS:
      return {
        ...state,
        reviews: null,
      };
    default:
      return state;
  }
};
