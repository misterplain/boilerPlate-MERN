import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { setInitialOrderInfo } from "../../actions/userOrderActions";
import { useCartDrawer } from "../../context/CartDrawerContext";
import Wrapper from "../Wrapper/Wrapper";

const CartSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartDrawerContext = useCartDrawer();
  const { products } = useSelector((state) => state.productList);
  const cartState = useSelector((state) => state.shoppingCart);
  const { cartItems } = cartState;
  const userDetailsState = useSelector((state) => state.userDetails);
  const { isGuest, userDetails } = userDetailsState;
  const userEmail = userDetails?.email;

  const detailedCartItems = cartItems?.map((item) => {
    const productDetails = products?.find((p) => p._id === item.product);
    return { ...item, product: productDetails };
  });

  const cartItemTotal = (item) => {
    return item?.product?.price * item?.quantity;
  };

  const cartTotal = detailedCartItems?.reduce((acc, item) => {
    return acc + cartItemTotal(item);
  }, 0);

  return (
    <Wrapper
      id="componentWrapper"
      flexDirection="column"
      width="100%"
      customStyles={{
        padding: "15px 0px",
      }}
    >
      <Wrapper id="pricesWrapper" flexDirection="column" alignItems="center">
        <Wrapper id="priceItem" justifyContent="space-between">
          {" "}
          <Typography variant="h6">Free Shipping</Typography>
          <Typography variant="body1">$0</Typography>
        </Wrapper>
        <Wrapper id="priceItem" justifyContent="space-between">
          {" "}
          <Typography variant="h6">Total</Typography>
          <Typography variant="body1">${cartTotal}</Typography>
        </Wrapper>
      </Wrapper>
      <Wrapper id="buttonsWrapper" justifyContent="space-between">
        {" "}
        <Button
          onClick={() => {
            cartDrawerContext.setIsOpen(false);
            navigate("/");
          }}
          variant="outlined"
          color="secondary"
        >
          Continue shopping
        </Button>
        {detailedCartItems && detailedCartItems.length !== 0 && (
          <Link component={NavLink} to="/checkout">
            {" "}
            <Button
              onClick={() => {
                dispatch(
                  setInitialOrderInfo({
                    isGuest,
                    cartItems,
                    totalPrice: cartTotal,
                  })
                );
                cartDrawerContext.setIsOpen(false);
              }}
              variant="outlined"
              color="success"
            >
              Proceed to checkout
            </Button>
          </Link>
        )}
      </Wrapper>
    </Wrapper>
  );
};

export default CartSummary;
