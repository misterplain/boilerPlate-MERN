import {
  ADD_ADDRESS_FAIL,
  ADD_ADDRESS_SUCCESS,
  REMOVE_ADDRESS_FAIL,
  REMOVE_ADDRESS_SUCCESS,
  UPDATE_FAVORITE_SUCCESS,
  UPDATE_FAVORITE_FAIL,
} from "../constants/userConstants";
import axios from "../api/axios";

const addAddress = (token, address) => async (dispatch) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.post(`/user/addaddress`, address, options);

    dispatch({
      type: ADD_ADDRESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_ADDRESS_FAIL,
      payload: error.message,
    });
  }
};

const deleteAddress = (token, addressId) => async (dispatch) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.delete(
      `/user/deleteaddress/${addressId}`,
      options
    );

    dispatch({
      type: REMOVE_ADDRESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: REMOVE_ADDRESS_FAIL,
      payload: error.message,
    });
  }
};

const updateFavorites = ({token, method, productId}) => async (dispatch) => {

  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.post(
      `/user/updatefavorites`,
      { method, productId },
      options
    );

    console.log(data)

    dispatch({
      type: UPDATE_FAVORITE_SUCCESS,
      payload: data.data.updatedUser.favorites,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_FAVORITE_FAIL,
      payload: error.message,
    });
  }
};

export { addAddress, deleteAddress, updateFavorites };
