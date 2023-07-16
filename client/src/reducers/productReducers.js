import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_ADD_FAIL,
  PRODUCT_ADD_SUCCESS,
} from "../constants/productConstants";
import {
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_SUCCESS,
} from "../constants/reviewsConstants";

const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.data.allProducts,
      };
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload.data.message,
      };

    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        products: state.products.filter(
          (product) => product._id !== action.payload.data.deletedProduct._id
        ),
      };
    case PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload.data.message,
      };

    case PRODUCT_EDIT_SUCCESS:
      return {
        loading: false,
        products: state.products.map((product) =>
          product._id === action.payload.data.updatedProduct._id
            ? action.payload.data.updatedProduct
            : product
        ),
      };
    case PRODUCT_EDIT_FAIL:
      console.log(action.payload);
      return {
        loading: false,
        error: action.payload.data.message,
      };

    case PRODUCT_ADD_SUCCESS:
      return {
        loading: false,
        products: [...state.products, action.payload.data.newProduct],
      };
    case PRODUCT_ADD_FAIL:
      return {
        loading: false,
        error: action.payload.data.message,
      };

    case DELETE_REVIEW_SUCCESS:

    console.log(action.payload.data)
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload.data.productId
            ? {
                ...product,
                reviews: product.reviews.filter(
                  (review) => review !== action.payload.data.reviewId
                ),
              }
            : product
        ),
      };

    default:
      return state;
  }
};

export { productListReducer };
