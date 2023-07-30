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
      sx={{ width: 400 }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <CartItems />
      <CartSummary/>
    </Box>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
};

export default CartDrawer;
