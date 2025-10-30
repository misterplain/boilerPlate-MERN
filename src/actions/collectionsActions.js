import {
  COLLECTIONS_LIST_SUCCESS,
  COLLECTIONS_LIST_FAIL,
  COLLECTIONS_LIST_REQUEST,
  NEW_COLLECTION_REQUEST,
  NEW_COLLECTION_SUCCESS,
  NEW_COLLECTION_FAIL,
  COLLECTION_EDIT_REQUEST,
  COLLECTION_EDIT_SUCCESS,
  COLLECTION_EDIT_FAIL,
  DELETE_COLLECTION_REQUEST,
  DELETE_COLLECTION_SUCCESS,
  DELETE_COLLECTION_FAIL,
  FETCH_PEXEL_REQUEST,
  FETCH_PEXEL_FAIL,
  FETCH_PEXEL_SUCCESS,
} from "../constants/collectionsConstants";
import axios from "../api/axios";

const fetchAllCollections = () => async (dispatch) => {
  try {
    dispatch({
      type: COLLECTIONS_LIST_REQUEST,
    });

    const data = await axios.get("/collection/get", {
      timeout: 3000,
    });

    dispatch({
      type: COLLECTIONS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const emailSent = await axios.post(
      "https://friendly-apron-goat.cyclic.app/contact?source=boilerPlate",
      {
        result: "ERROR",
        message: JSON.stringify(error),
      }
    );
    console.log(emailSent);
    dispatch({
      type: COLLECTIONS_LIST_FAIL,
      payload:
        error?.response?.data?.message ||
        "Render.com server spins down due to inactivity, please refresh in 30 seconds",
    });
  }
};

//create new collection
const createNewCollection = (collectionData, token) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({
        type: NEW_COLLECTION_REQUEST,
      });
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.post(
        "/collection/new",
        { collectionData },
        options
      );

      dispatch({
        type: NEW_COLLECTION_SUCCESS,
        payload: data,
      });
      resolve();
    } catch (error) {
      dispatch({
        type: NEW_COLLECTION_FAIL,
        payload: error.response,
      });
      reject();
    }
  });
};

const updateCollection = (id, collectionData, token) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({
        type: COLLECTION_EDIT_REQUEST,
      });
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.put(
        `/collection/edit/${id}`,
        { collectionData },
        options
      );

      dispatch({
        type: COLLECTION_EDIT_SUCCESS,
        payload: data,
      });
      resolve();
    } catch (error) {
      dispatch({
        type: COLLECTION_EDIT_FAIL,
        payload: error.response,
      });
      reject();
    }
  });
};

const deleteCollection = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_COLLECTION_REQUEST,
    });
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.delete(`/collection/delete/${id}`, options);

    dispatch({
      type: DELETE_COLLECTION_SUCCESS,
      payload: data,
    });
    return Promise.resolve();
  } catch (error) {
    dispatch({
      type: DELETE_COLLECTION_FAIL,
      payload: error.response,
    });
    return Promise.reject();
  }
};

const fetchPexel = (token, name) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_PEXEL_REQUEST,
    });
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.get(
      "/collection/pexel",
      { params: { name: name } },
      options
    );

    dispatch({
      type: FETCH_PEXEL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PEXEL_FAIL,
      payload: error.response.data.message,
    });
    console.log(error);
  }
};

export {
  fetchAllCollections,
  createNewCollection,
  updateCollection,
  deleteCollection,
  fetchPexel,
};
