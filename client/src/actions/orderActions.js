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
} from "../constants/orderConstants";
import {
  FETCH_USER_ORDERS_SUCCESS,
  FETCH_USER_ORDERS_FAIL,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
} from "../constants/userConstants";
import { EMPTY_CART } from "../constants/cartConstants";
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

const setIsPaid = (isPaid) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: SET_ISPAID, payload: isPaid });
    resolve();
  });
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

    console.log(order);
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.post("/orders/new", order, options);
      console.log(order);

      dispatch({
        type: NEW_USER_ORDER_SUCCESS,
        payload: data.data.orderPlaced,
      });
      proceedToNextStep();
      // dispatch({ type: CLEAR_ORDER });
      dispatch({ type: EMPTY_CART });
    } catch (error) {
      console.log(error);
      dispatch({ type: NEW_USER_ORDER_FAIL, payload: error });
    }
  };

const placeNewOrderGuest = (order, proceedToNextStep) => async (dispatch) => {
  try {
    const data = await axios.post("/orders/newguest", order);
    console.log(order);

    dispatch({
      type: NEW_GUEST_ORDER_SUCCESS,
      payload: data.data.guestOrderPlaced,
    });
    proceedToNextStep();
    // dispatch({ type: CLEAR_ORDER });
    dispatch({ type: EMPTY_CART });
  } catch (error) {
    console.log(error);
    dispatch({ type: NEW_GUEST_ORDER_FAIL, payload: error });
  }
};

const fetchUserOrders = (token) => async (dispatch) => {
  console.log("fetchUserOrders");

  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.get("/orders/getuser", options);

    dispatch({
      type: FETCH_USER_ORDERS_SUCCESS,
      payload: data.data.userOrders,
    });
  } catch (error) {
    dispatch({ type: FETCH_USER_ORDERS_FAIL, payload: error });
  }
};

const cancelOrder = (token, orderId) => async (dispatch) => {
  console.log("cancelOrder");

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const data = await axios.put(`/orders/cancel/${orderId}`, {}, options);
    console.log(data);

    dispatch({
      type: CANCEL_ORDER_SUCCESS,
      payload: data.data.orderCancelled,
    });

    // dispatch(fetchUserOrders(token));

  } catch (error) {
    dispatch({ type: CANCEL_ORDER_FAIL, payload: error });
    console.log(error);
  }
};

export {
  setInitialOrderInfo,
  setShippingAddress,
  setIsPaid,
  placeNewUserOrder,
  placeNewOrderGuest,
  setEmailAddress,
  fetchUserOrders,
  cancelOrder,
};
