import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_FAIL,
  PRODUCT_ADD_SUCCESS,
} from "../constants/productConstants";
import axios from "../api/axios";
import { fetchAllCollections } from "./collectionsActions";

const fetchAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });

    const data = await axios.get("/product/get");

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

const deleteProduct = (productId, token) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({
        type: PRODUCT_DELETE_REQUEST,
      });
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.delete(`/product/delete/${productId}`, options);

      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
        payload: data,
      });
      dispatch(fetchAllCollections());
      resolve()
    } catch (error) {
      console.log(error);
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload: error.response.data.message,
      });

      reject()
    }
  });
};


const editProduct = (productId, token, product) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({
        type: PRODUCT_EDIT_REQUEST,
      });

      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.put(
        `/product/edit/${productId}`,
        product,
        options
      );

      dispatch({
        type: PRODUCT_EDIT_SUCCESS,
        payload: data,
      });

      dispatch(fetchAllCollections());

      resolve();
    } catch (error) {
      dispatch({
        type: PRODUCT_EDIT_FAIL,
        payload: error.response.data.message,
      });

      reject(error);
    }
  });
};

const deleteImage = (productId, token, image) => async (dispatch) => {
  console.log(image);
  try {
    dispatch({
      type: PRODUCT_EDIT_REQUEST,
    });
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.put(
      `/product/deleteImage/${productId}`,
      image,
      options
    );

    dispatch({
      type: PRODUCT_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PRODUCT_EDIT_FAIL,
      payload: error.response.data.message,
    });
  }
};

const newProduct = (token, product) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_ADD_REQUEST,
    });
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.post("/product/new", product, options);

    dispatch({
      type: PRODUCT_ADD_SUCCESS,
      payload: data,
    });
    dispatch(fetchAllCollections());
    return Promise.resolve()
  } catch (error) {
    console.log(error);

    dispatch({
      type: PRODUCT_ADD_FAIL,
      payload: error.response.data.message,
    });
    return Promise.reject()
  }
};

export {
  fetchAllProducts,
  deleteProduct,
  editProduct,
  newProduct,
  deleteImage,
};
