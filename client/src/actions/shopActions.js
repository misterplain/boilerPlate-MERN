import {
  FILTERED_PRODUCTS_REQUEST,
  FILTERED_PRODUCTS_FAIL,
  FILTERED_PRODUCTS_SUCCESS,
  SHOP_COLLECTION_REQUEST,
  SHOP_COLLECTION_FAIL,
  SHOP_COLLECTION_SUCCESS,
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
    return Promise.resolve()
  } catch (error) {
    console.log(error);

    dispatch({
      type: FILTERED_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
    return Promise.reject()
  }
};

const setShopToCollection =
  (collectionId, allCollections) => async (dispatch) => {

    const filterQuery = {
      collections: allCollections.reduce((acc, collection) => {
        acc[collection._id] = collection._id === collectionId;
        return acc;
      }, {}),
    };

    dispatch({
      type: SHOP_COLLECTION_REQUEST,
    });
    try {
      const data = await axios.post(`/product/get/filter`, {
        filterObject: filterQuery,
      });

      dispatch({
        type: SHOP_COLLECTION_SUCCESS,
        payload: data,
        filterQuery: filterQuery,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SHOP_COLLECTION_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export { fetchFilteredProducts, setShopToCollection };
