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
// import {
//   PRODUCT_EDIT_COLLECTION_FAIL,
//   PRODUCT_EDIT_COLLECTION_SUCCESS,
//   PRODUCT_DELETE_COLLECTION_FAIL,
//   PRODUCT_DELETE_COLLECTION_SUCCESS,
//   PRODUCT_ADD_COLLECTION_FAIL,
//   PRODUCT_ADD_COLLECTION_SUCCESS,
// } from "../constants/collectionsConstants";
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
    console.log(error)
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

const deleteProduct = (productId, token) => async (dispatch) => {
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

    // dispatch({
    //   type: PRODUCT_DELETE_COLLECTION_SUCCESS,
    //   payload: data,
    // });
    dispatch(fetchAllCollections());
  } catch (error) {
    console.log(error);
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response,
    });

    // dispatch({
    //   type: PRODUCT_DELETE_COLLECTION_FAIL,
    //   payload: error.response,
    // });
  }
};

const editProduct = (productId, token, product) => async (dispatch) => {
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

    // dispatch({
    //   type: PRODUCT_EDIT_COLLECTION_SUCCESS,
    //   payload: data,
    // });
    dispatch(fetchAllCollections());
  } catch (error) {
    console.log(error);
    dispatch({
      type: PRODUCT_EDIT_FAIL,
      payload: error.message,
    });

    // dispatch({
    //   type: PRODUCT_EDIT_COLLECTION_FAIL,
    //   payload: error.message,
    // });
  }
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
      payload: error.message,
    });
  }
};

const newProduct = (token, product) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_ADD_REQUEST,
    })
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

    // dispatch({
    //   type: PRODUCT_ADD_COLLECTION_SUCCESS,
    //   payload: data,
    // });
    dispatch(fetchAllCollections());
  } catch (error) {
    console.log(error);

    dispatch({
      type: PRODUCT_ADD_FAIL,
      payload: error.message,
    });

    // dispatch({
    //   type: PRODUCT_ADD_COLLECTION_FAIL,
    //   payload: error.message,
    // });
  }
};

export {
  fetchAllProducts,
  deleteProduct,
  editProduct,
  newProduct,
  deleteImage,
};
