import {
    FILTER_PERIOD_FAIL,
    FILTER_PERIOD_REQUEST,
    FILTER_PERIOD_SUCCESS,
    CANCEL_ORDER_FAIL,
    CANCEL_ORDER_REQUEST,
    CANCEL_ORDER_SUCCESS,
    EDIT_ORDER_FAIL,
    EDIT_ORDER_REQUEST,
    EDIT_ORDER_SUCCESS,
    FETCH_USER_ORDERS_FAIL,
    FETCH_USER_ORDERS_REQUEST,
    FETCH_USER_ORDERS_SUCCESS,
  } from "../constants/orderHistoryConstants";

const initialState = {
  loading: false,
  quickView: null,
  advancedSearch: {
    email: null,
    orderNumer: null,
    status: null,
  },
  orders: [],
};

export const orderHistoryReducer = (state = initialState , action) => {
  switch (action.type) {
    case FILTER_PERIOD_REQUEST:
      return { ...state, loading: true };
    case FILTER_PERIOD_SUCCESS:
      return {
        loading: false,
        quickView: action.days,
        orders: [...action.payload.data.timePeriodOrders],
      };
    case FILTER_PERIOD_FAIL:
      return { loading: false, error: action.payload };

      case FETCH_USER_ORDERS_REQUEST:
        return { ...state, loading: true };
  
      case FETCH_USER_ORDERS_SUCCESS:
        return { ...state, orders: action.payload };
  
      case FETCH_USER_ORDERS_FAIL:
        return { ...state, error: action.payload };
      case CANCEL_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CANCEL_ORDER_SUCCESS:
        return {
          ...state,
          orders: state.orders.map((order) =>
            order._id === action.payload._id ? action.payload : order
          ),
        };
      case CANCEL_ORDER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload.error.message,
        };
      case EDIT_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case EDIT_ORDER_SUCCESS:
        return {
          ...state,
          orders: state.orders.map((order) =>
            order._id === action.payload._id ? action.payload : order
          ),
        };
      case EDIT_ORDER_FAIL:
        return {
          ...state,
          error: action.payload,
        };
    default:
      return state;
  }
};
