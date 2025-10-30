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

  try {
    const data = await axios.post(`/product/get/filter`, filterQuery);

    dispatch({
      type: FILTERED_PRODUCTS_SUCCESS,
      payload: data,
      filterQuery: filterQuery,
    });
    return Promise.resolve();
  } catch (error) {
    console.log(error);

    dispatch({
      type: FILTERED_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
    return Promise.reject();
  }
};

const setShopToCollection =
  (collectionId, allCollections, options={}) => async (dispatch) => {
 const {singleCollection } = options;

    const filterQuerySingle = {
      collections: allCollections.reduce((acc, collection) => {
        acc[collection._id] = collection._id === collectionId;
        return acc;
      }, {}),
    };

    const filterQueryAll = {
      collections: allCollections.reduce((acc, collection) => {
        acc[collection._id] = true;
        return acc;
      }, {}),
    };

    dispatch({
      type: SHOP_COLLECTION_REQUEST,
    });
    try {
      const data = await axios.post(`/product/get/filter`, {
        filterObject:
          singleCollection === true ? filterQuerySingle : filterQueryAll,
      });

      dispatch({
        type: SHOP_COLLECTION_SUCCESS,
        payload: data,
        filterQuery: singleCollection === true ? filterQuerySingle : filterQueryAll,
      });
      return Promise.resolve()
    } catch (error) {
      console.log(error);
      dispatch({
        type: SHOP_COLLECTION_FAIL,
        payload: error.response.data.message,
      });
      return Promise.reject()
    }
  };

export { fetchFilteredProducts, setShopToCollection };
