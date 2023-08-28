import {
  ADD_ADDRESS_FAIL,
  ADD_ADDRESS_SUCCESS,
  REMOVE_ADDRESS_FAIL,
  REMOVE_ADDRESS_SUCCESS,
  UPDATE_FAVORITE_SUCCESS,
  UPDATE_FAVORITE_FAIL,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_REQUEST,
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

const updateFavorites =
  ({ token, method, productId }) =>
  async (dispatch) => {
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

      dispatch({
        type: UPDATE_FAVORITE_SUCCESS,
        payload: data.data.updatedUser.favorites,
      });
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      dispatch({
        type: UPDATE_FAVORITE_FAIL,
        payload: error.message,
      });
      return Promise.reject();
    }
  };

const updateProfile = (token, profileData) => async (dispatch) => {
  console.log(profileData)
  dispatch({
    type: UPDATE_PROFILE_REQUEST,
  });

  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.put(`/user/editprofile`, {profileData}, options);
    console.log(data);
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    return Promise.resolve();
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.message,
    });
    return Promise.reject();
  }
};

export { addAddress, deleteAddress, updateFavorites, updateProfile };
