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
} from "../constants/collectionsConstants";
import axios from "../api/axios";

import { useSelector, useDispatch } from "react-redux";

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

//create new collection - admin only
const createNewCollection = (name, token) => async (dispatch) => {
  try {

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.post("/collection/new", { name }, options);

    dispatch({
      type: NEW_COLLECTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_COLLECTION_FAIL,
      payload: error.response,
    });
  }
};

const updateCollectionName = (name, id, token) => async (dispatch) => {

  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.put(`/collection/edit/${id}`, { name }, options);


    dispatch({
      type: NAME_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NAME_UPDATE_FAIL,
      payload: error.response,
    });
  }
};

const deleteCollection = (id, token) => async (dispatch) => {
  try{
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
    })
  } catch(error){

    dispatch({
      type: DELETE_COLLECTION_FAIL,
      payload: error.response,
    })

  }
}

export { fetchAllCollections, createNewCollection, updateCollectionName, deleteCollection };
