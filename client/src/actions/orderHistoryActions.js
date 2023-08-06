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
import axios from "../api/axios";

const fetchUserOrders = (token) => async (dispatch) => {
  console.log("fetchUserOrders");

  try {
    dispatch({
      type: FETCH_USER_ORDERS_REQUEST,
    });
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
  try {
    dispatch({ type: CANCEL_ORDER_REQUEST });
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.put(`/orders/cancel/${orderId}`, {}, options);

    dispatch({
      type: CANCEL_ORDER_SUCCESS,
      payload: data.data.orderCancelled,
    });
  } catch (error) {
    dispatch({ type: CANCEL_ORDER_FAIL, payload: error });
    console.log(error);
  }
};

const fetchAllOrders = (token) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_USER_ORDERS_REQUEST,
    });
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.get("/orders/get", options);

    dispatch({
      type: FETCH_USER_ORDERS_SUCCESS,
      payload: data.data.allOrders,
    });
  } catch (error) {
    dispatch({ type: FETCH_USER_ORDERS_FAIL, payload: error.message });
  }
};

const editOrder =
  ({ token, orderId, requestData }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: EDIT_ORDER_REQUEST,
      });
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const data = await axios.put(
        `/orders/edit/${orderId}`,
        { editRequest: requestData },
        options
      );

      dispatch({ type: EDIT_ORDER_SUCCESS, payload: data.data.editedOrder });
    } catch (error) {
      dispatch({ type: EDIT_ORDER_FAIL, payload: error.message });
    }
  };

//admin filter
const filterPeriod = (days, token) => async (dispatch) => {
  console.log("filter period accessed");
  try {
    dispatch({ type: FILTER_PERIOD_REQUEST });

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.get(`/orders/quick-view?days=${days}`, options);

    console.log(data);

    dispatch({
      type: FILTER_PERIOD_SUCCESS,
      payload: data ? data : null,
      days,
    });
  } catch (error) {
    dispatch({
      type: FILTER_PERIOD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export {
  fetchUserOrders,
  cancelOrder,
  fetchAllOrders,
  editOrder,
  filterPeriod,
};
