import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";
import axios from "../api/axios";

const fetchAllProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST,
        });

        const data = await axios.get("/product/get");

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {

        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response,
        });
    }
}

export { fetchAllProducts };