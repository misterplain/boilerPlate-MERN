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
const initialState = {
  reviews: [],
  filteredReviews: [],
  loading: false,
  error: null,
};

export const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: [...state.reviews],
        userReview: [action.payload],
        loading: false,
      };
    case CREATE_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload.error.message,
        loading: false,
      };
    case FETCH_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        error: null,
        userReview: action.payload.userReviews,
        reviews: action.payload.productReviews,
        filteredReviews: action.payload.productReviews,
      };

    case FETCH_REVIEWS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    // top reviews
    case FETCH_TOPREVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TOPREVIEWS_SUCCESS:
      return {
        ...state,
        error: null,
        topReviews: action.payload,
      };

    case FETCH_TOPREVIEWS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_UNMODERATED_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
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
        loading: false,
      };
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        filteredReviews: state.filteredReviews.filter(
          (review) => review._id !== action.payload._id
        ),
        reviews: state.reviews.filter(
          (review) => review._id !== action.payload._id
        ),
        userReview: [],
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CLEAR_REVIEWS:
      return {
        ...state,
        reviews: [],
      };
    case MODERATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MODERATE_REVIEW_SUCCESS:
      const updatedReview = action.payload;
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
        loading: false,
      };
    case EDIT_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case EDIT_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: [...state.reviews],
        userReview: [action.payload],
        loading: false,
      };

    case EDIT_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case FILTER_REVIEWS_SUCCESS:
      return {
        ...state,
        filteredReviews: state.reviews.filter(
          (review) => review.rating === action.rating
        ),
      };

    case FILTER_REVIEWS_FAIL:
      return {
        ...state,
        error: "Error Filtering Review",
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filteredReviews: state.reviews,
      };

    default:
      return state;
  }
};
