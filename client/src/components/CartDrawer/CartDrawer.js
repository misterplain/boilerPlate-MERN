import { useCartDrawer } from "../../context/CartDrawerContext";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
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
      // onClick={toggleDrawer(false)}
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
