import {
    FILTERED_PRODUCTS_REQUEST,
    FILTERED_PRODUCTS_FAIL,
    FILTERED_PRODUCTS_SUCCESS,
  } from "../constants/shopConstants";
  import axios from "../api/axios";

const fetchFilteredProducts = (filterQuery) => async (dispatch) => {
  dispatch({
    type: FILTERED_PRODUCTS_REQUEST,
    filterQuery: filterQuery,
  });
  console.log(filterQuery);
  try {
    const data = await axios.post(`/product/get/filter`, filterQuery);
    console.log(data);

    dispatch({
      type: FILTERED_PRODUCTS_SUCCESS,
      payload: data,
      filterQuery: filterQuery,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: FILTERED_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export { fetchFilteredProducts };
