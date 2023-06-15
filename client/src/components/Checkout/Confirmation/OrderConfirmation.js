import React from "react";
import { useSelector, useDispatch } from "react-redux";


const OrderConfirmation = () => {
    const dispatch = useDispatch();
    //get token from state
    const userAuthState = useSelector((state) => state.userAuth);
    const userDetailsState = useSelector((state) => state.userDetails);
    const userDetails = userDetailsState?.userDetails;
  
    const token = userAuthState?.accessToken;
    const { authenticated } = userAuthState;
  return (
    <div>OrderConfirmation</div>
  )
}

export default OrderConfirmation