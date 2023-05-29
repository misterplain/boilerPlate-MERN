import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {
                loading: true,
                products: [],
            };
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.data.allProducts,
            };
        case PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload.data.message,
            };
        default:
            return state;
    }
}

export { productListReducer };