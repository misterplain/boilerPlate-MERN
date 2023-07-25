import {
  COLLECTIONS_LIST_SUCCESS,
  COLLECTIONS_LIST_FAIL,
  COLLECTIONS_LIST_REQUEST,
  NEW_COLLECTION_SUCCESS,
  NEW_COLLECTION_FAIL,
  NAME_UPDATE_SUCCESS,
  NAME_UPDATE_FAIL,
  DELETE_COLLECTION_SUCCESS,
  DELETE_COLLECTION_FAIL,
  FETCH_PEXEL_FAIL,
  FETCH_PEXEL_SUCCESS,
} from "../constants/collectionsConstants";
import axios from "../api/axios";

const fetchAllCollections = () => async (dispatch) => {
  try {
    dispatch({
      type: COLLECTIONS_LIST_REQUEST,
    });

    const data = await axios.get("/collection/get");

    dispatch({
      type: COLLECTIONS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COLLECTIONS_LIST_FAIL,
      payload: error.response,
    });
  }
};

//create new collection
const createNewCollection = (collectionData, token) => async (dispatch) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.post("/collection/new", { collectionData }, options);

    dispatch({
      type: NEW_COLLECTION_SUCCESS,
      payload: data,
    });
    return Promise.resolve();
  } catch (error) {
    dispatch({
      type: NEW_COLLECTION_FAIL,
      payload: error.response,
    });
    return Promise.reject();
  }
};

const updateCollection =
  (id, collectionData, token) =>
  async (dispatch) => {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.put(`/collection/edit/${id}`, { collectionData }, options);

      dispatch({
        type: NAME_UPDATE_SUCCESS,
        payload: data,
      });
      return Promise.resolve();
    } catch (error) {
      dispatch({
        type: NAME_UPDATE_FAIL,
        payload: error.response,
      });
      return Promise.reject();
    }
  };

const deleteCollection = (id, token) => async (dispatch) => {
  try {
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
  } catch (error) {
    dispatch({
      type: DELETE_COLLECTION_FAIL,
      payload: error.response,
    });
  }
};

const fetchPexel = (token, name) => async (dispatch) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(name);

    const data = await axios.get(
      "/collection/pexel",
      { params: { name: name } },
      options
    );
    console.log(data);

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
