import {
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAIL,
  FETCH_UNMODERATED_REVIEWS_SUCCESS,
  FETCH_UNMODERATED_REVIEWS_FAIL,
  CLEAR_REVIEWS,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  MODERATE_REVIEW_SUCCESS,
  MODERATE_REVIEW_FAIL,
  EDIT_REVIEW_SUCCESS,
  EDIT_REVIEW_FAIL,
} from "../constants/reviewsConstants";

export const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVIEW_SUCCESS:
      const updatedReviews = [...state.reviews, action.payload];
      return {
        ...state,
        reviews: [...state.reviews],
        userReview: [action.payload],
      };
    case CREATE_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload.error.message,
      };
    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        error: null,
        userReview: action.payload.userReviews,
        reviews: action.payload.productReviews,
      };

    case FETCH_REVIEWS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case FETCH_UNMODERATED_REVIEWS_SUCCESS:
      return {
        ...state,
        error: null,
        reviews: action.payload,
      };

    case FETCH_UNMODERATED_REVIEWS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_REVIEW_SUCCESS:
      // const updatedReviewsDelete = state.reviews.filter(
      //   (review) => review._id !== action.payload._id
      // );

      return {
        ...state,
        error: null,
        reviews: [...state.reviews],
        userReview: [action.payload],
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_REVIEWS:
      return {
        ...state,
        reviews: null,
      };

    case MODERATE_REVIEW_SUCCESS:
      const updatedReview = action.payload;
      console.log(updatedReview);
      return {
        ...state,
        reviews: state.reviews.filter(
          (review) => review._id !== action.payload._id
        ),
        error: null,
      };

    case MODERATE_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case EDIT_REVIEW_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        reviews: [...state.reviews],
        userReview: [action.payload],
      };

    case EDIT_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
