import {
  FILTERED_PRODUCTS_REQUEST,
  FILTERED_PRODUCTS_FAIL,
  FILTERED_PRODUCTS_SUCCESS,
  SHOP_COLLECTION_REQUEST,
  SHOP_COLLECTION_FAIL,
  SHOP_COLLECTION_SUCCESS,
} from "../constants/shopConstants";

const initialState = {
  products: [],
  hasSearched: false,
  filters: {
    collections: {},
    priceRange: [0, 1000],
    hasReviews: false,
    inStock: true,
    sortBy: "",
    searchQuery: "",
    onSale: false,
    salePrice: 0,
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
        hasSearched: true,
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
    case SHOP_COLLECTION_REQUEST:
      return {
        ...state,
        loading: true,
        hasSearched: true,
      };
    case SHOP_COLLECTION_SUCCESS:
      console.log(action.filterQuery);
      return {
        ...initialState,
        hasSearched: true,
        loading: false,
        // filters: { ...action.filterQuery.filterObject },
        filters: {
          ...state.filters,
          collections: action.filterQuery.collections,
        },
        products: action.payload.data.filteredProducts,
        maxPrice: action.payload.data.maxPrice,
      };

    case SHOP_COLLECTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
