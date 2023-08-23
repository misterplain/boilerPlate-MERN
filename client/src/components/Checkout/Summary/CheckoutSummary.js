import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Wrapper from "../../Wrapper/Wrapper";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";

const CheckoutSummary = ({ proceedToNextStep }) => {
  const dispatch = useDispatch();
  const userAuthState = useSelector((state) => state.userAuth);
  const productState = useSelector((state) => state.productList);
  const { products } = productState;
  const orderState = useSelector((state) => state.userOrder);
  const {
    cartItems,
    shippingAddress,
    totalPrice,
    emailAddress,
  } = orderState;

  const detailedCartItems = cartItems?.map((item) => {
    const productDetails = products.find((p) => p._id === item.product);
    return { ...item, product: productDetails };
  });

  console.log(detailedCartItems);

  if (detailedCartItems && detailedCartItems.length === 0) {
    return (
      <Wrapper
        id="pageWrapper"
        flexDirection="column"
        width="80%"
        alignItems="center"
        justifyContent="center"
        customStyles={{
          border: "1px solid blue",
        }}
      >
        {" "}
        <Typography variant="h4">No tems in cart</Typography>
      </Wrapper>
    );
  }

  return (
    <Wrapper
      id="pageWrapper"
      flexDirection="column"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h3">Order Summary</Typography>
      {detailedCartItems &&
        detailedCartItems.map((item) => (
          <Wrapper
            flexDirection="row"
            key={item.product._id}
            width="60%"
            justifyContent="center"
            customStyles={{
              margin: "5px",
              padding: "10px",
              border: "1px solid grey",
              borderRadius: "10px",
            }}
          >
            <Typography variant="h5">{item.quantity} x&nbsp;</Typography>

            <Link component={NavLink} to={`/product/${item.product._id}`}>
              {" "}
              <Typography variant="h5">{item.product.name}</Typography>
            </Link>

            <Typography variant="h5">
              &nbsp;at&nbsp;${item.product.price} each
            </Typography>
          </Wrapper>
        ))}
      <Wrapper flexDirection="column" alignItems="center">
        {" "}
        <Typography variant="h6">Shipping - $0</Typography>
        <Typography variant="h6">Total - ${totalPrice}</Typography>
      </Wrapper>
      <Wrapper
        flexDirection="column"
        alignItems="center"
        customStyles={{ margin: "20px" }}
      >
        {shippingAddress && (
          <Box>
            <Typography variant="body1">
              Contact Email: {emailAddress}
            </Typography>
            <Typography variant="body1">
              Shipping Address: {shippingAddress.street}, {shippingAddress.city}
              ,{shippingAddress.postalCode}, {shippingAddress.country}
            </Typography>
          </Box>
        )}
      </Wrapper>
      <Box>
        <Button onClick={proceedToNextStep}>Confirm and Pay Now</Button>
      </Box>
    </Wrapper>
  );
};

export default CheckoutSummary;
