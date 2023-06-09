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

const CartDrawer = () => {
  const { isOpen, setIsOpen } = useCartDrawer();

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 400 }} // change width to 50% to cover half screen
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {/* <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Item 1" />
          </ListItemButton>
        </ListItem>
      </List> */}
      <CartItems />
    </Box>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor="right" // drawer will slide in from the right
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
