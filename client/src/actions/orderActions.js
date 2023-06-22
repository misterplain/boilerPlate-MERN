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
  NEW_USER_ORDER_SUCCESS,
  NEW_USER_ORDER_FAIL,
  NEW_GUEST_ORDER_SUCCESS,
  NEW_GUEST_ORDER_FAIL,
} from "../constants/orderConstants";
import axios from "../api/axios";

const setInitialOrderInfo =
  ({
    isGuest,
    cartItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    userEmail,
  }) =>
  (dispatch) => {
    dispatch({ type: SET_ISGUEST, payload: isGuest ? true : false });
    dispatch({ type: SET_ITEMS, payload: cartItems ? cartItems : [] });
    // dispatch({ type: SET_EMAIL_ADDRESS, payload: userEmail });
    // dispatch({ type: SET_ADDRESS, payload: shippingAddress });
    // dispatch({ type: SET_PAYMENT_METHOD, payload: paymentMethod });
    dispatch({ type: SET_TOTAL_PRICE, payload: totalPrice ? totalPrice : 0 });
  };

const setShippingAddress = (shippingAddress) => (dispatch) => {
  dispatch({ type: SET_ADDRESS, payload: shippingAddress });
};

const setIsPaid = (isPaid) => (dispatch) => {
  dispatch({ type: SET_ISPAID, payload: isPaid });
};

const setEmailAddress = (emailAddress) => (dispatch) => {
  dispatch({ type: SET_EMAIL_ADDRESS, payload: emailAddress });
};

const placeNewUserOrder =
  (token, order, proceedToNextStep) => async (dispatch) => {
    // dispatch({ type: SET_ISCANCELLED, payload: false });
    // dispatch({ type: SET_ISPAID, payload: false });
    // dispatch({ type: SET_ISSHIPPEDTOCOURIER, payload: false });
    // dispatch({ type: SET_ISDELIVERED, payload: false });

    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.post("/orders/new", order, options);

      dispatch({ type: NEW_USER_ORDER_SUCCESS, payload: data });
      proceedToNextStep();
    } catch (error) {
      console.log(error);
      dispatch({ type: NEW_USER_ORDER_FAIL, payload: error });
    }
  };

const placeNewOrderGuest = (order, proceedToNextStep) => async (dispatch) => {
  console.log("placeNewOrderGuest")
  try {
    const data = await axios.post("/orders/newguest", order);

    dispatch({ type: NEW_GUEST_ORDER_SUCCESS, payload: data });
    proceedToNextStep();
  } catch (error) {
    console.log(error);
    dispatch({ type: NEW_GUEST_ORDER_FAIL, payload: error });
  }
};

export {
  setInitialOrderInfo,
  setShippingAddress,
  setIsPaid,
  placeNewUserOrder,
  placeNewOrderGuest,
  setEmailAddress,
};
