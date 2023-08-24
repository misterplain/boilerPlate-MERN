import { useCartDrawer } from "../../context/CartDrawerContext";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CartItems from "../CartItems/CartItems";
import CartSummary from "../CartSummary/CartSummary";

const CartDrawer = () => {
  const { isOpen, setIsOpen } = useCartDrawer();

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  const list = () => (
    <Box
      sx={{
        width: 400,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <CartItems />
      <CartSummary />
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor="right"
      open={isOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      sx={{ width: "0px" }}
    >
      {list()}
    </SwipeableDrawer>
  );
};

export default CartDrawer;
