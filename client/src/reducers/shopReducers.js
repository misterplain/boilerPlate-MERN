import {
  FILTERED_PRODUCTS_REQUEST,
  FILTERED_PRODUCTS_FAIL,
  FILTERED_PRODUCTS_SUCCESS,
} from "../constants/shopConstants";

const initialState = {
  products: [],
  filters: {
    collection: {},
    priceRange: [0, 1000],
    hasReviews: false,
    inStock: false,
    sortBy: "",
    searchQuery: "",
  },
  error: null,
  loading: true,
};

export const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTERED_PRODUCTS_REQUEST:
      console.log(action.filterQuery);
      return {
        ...state,
        loading: true,
        filters: { ...action.filterQuery.filterObject },
      };
    case FILTERED_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.data.filteredProducts,
        filters: { ...action.filterQuery.filterObject },
        maxPrice: action.payload.data.maxPrice,
      };
    case FILTERED_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
