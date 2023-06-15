import {
  SET_ISGUEST,
  SET_ITEMS,
  SET_ADDRESS,
  SET_PAYMENT_METHOD,
  SET_TOTAL_PRICE,
  SET_ISCANCELLED,
  SET_ISPAID,
  SET_ISSHIPPEDTOCOURIER,
  SET_ISDELIVERED,
} from "../constants/orderConstants";

const setInitialOrderInfo =
  ({ isGuest, cartItems, shippingAddress, paymentMethod, totalPrice }) =>
  (dispatch) => {
    console.log(cartItems);
    dispatch({ type: SET_ISGUEST, payload: isGuest ? true : false });
    dispatch({ type: SET_ITEMS, payload: cartItems ? cartItems : [] });
    // dispatch({ type: SET_ADDRESS, payload: shippingAddress });
    // dispatch({ type: SET_PAYMENT_METHOD, payload: paymentMethod });
    dispatch({ type: SET_TOTAL_PRICE, payload: totalPrice ? totalPrice : 0 });
  };

const setShippingAddress = (shippingAddress) => (dispatch) => {
  dispatch({ type: SET_ADDRESS, payload: shippingAddress });
};

const setIsPaid = (isPaid) => (dispatch) => {
    dispatch({ type: SET_ISPAID, payload: isPaid });
}

const placeNewOrder = () => (dispatch) => {
    // dispatch({ type: SET_ISCANCELLED, payload: false });
    // dispatch({ type: SET_ISPAID, payload: false });
    // dispatch({ type: SET_ISSHIPPEDTOCOURIER, payload: false });
    // dispatch({ type: SET_ISDELIVERED, payload: false });
};

export { setInitialOrderInfo, setShippingAddress, setIsPaid, placeNewOrder };
