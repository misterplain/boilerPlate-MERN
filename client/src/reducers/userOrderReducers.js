import {
  SET_ISGUEST,
  SET_ITEMS,
  SET_ADDRESS,
  SET_EMAIL_ADDRESS,
  SET_PAYMENT_METHOD,
  SET_TOTAL_PRICE,
  SET_ISCANCELLED,
  SET_ISPAID,
  SET_ISSHIPPEDTOCOURIER,
  SET_ISDELIVERED,
  CLEAR_ORDER,
  NEW_USER_ORDER_SUCCESS,
  NEW_USER_ORDER_FAIL,
  NEW_GUEST_ORDER_SUCCESS,
  NEW_GUEST_ORDER_FAIL,
  NEW_USER_ORDER_REQUEST,
} from "../constants/userOrderConstants";

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ISGUEST:
      return { ...state, isGuest: action.payload };
    case SET_ITEMS:
      return { ...state, cartItems: action.payload };
    case SET_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case SET_EMAIL_ADDRESS:
      return { ...state, emailAddress: action.payload };
    // case SET_PAYMENT_METHOD:
    //   return { ...state, paymentMethod: action.payload };
    case SET_TOTAL_PRICE:
      return { ...state, totalPrice: action.payload };
    // case SET_ISCANCELLED:
    //   return { ...state, isCancelled: action.payload };
    case SET_ISPAID:
      return { ...state, isPaid: action.payload };
    // case SET_ISSHIPPEDTOCOURIER:
    //   return { ...state, isShippedToCourier: action.payload };
    // case SET_ISDELIVERED:
    //   return { ...state, isDelivered: action.payload };
    case NEW_USER_ORDER_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case NEW_USER_ORDER_SUCCESS:
      return { ...state, orderNumber: action.payload.shortId };
    case NEW_USER_ORDER_FAIL:
      return { ...state, error: action.payload, loading: false };
    case NEW_GUEST_ORDER_SUCCESS:
      return { ...state, orderNumber: action.payload.shortId };
    case NEW_GUEST_ORDER_FAIL:
      return { ...state, error: action.payload };
    case CLEAR_ORDER:
      return {};
    default:
      return state;
  }
};

export { orderReducer };
