import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { logoutUser } from "../../actions/authActions";
import { useCartDrawer } from "../../context/CartDrawerContext";

//icons
import { CgProfile } from "react-icons/cg";
import Badge from "@mui/material/Badge";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import styles from "./styles";
import CartDrawer from "../CartDrawer/CartDrawer";

const Header = ({ isActive }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const userDetailsState = useSelector((state) => state.userDetails);
  const { username, isAdmin } = userDetailsState?.userDetails || {};
  const cartState = useSelector((state) => state.shoppingCart);
  const { cartItems} = cartState || {};

  const { isOpen, setIsOpen } = useCartDrawer();

  const logout = () => {
    dispatch(logoutUser());
    setAnchorEl(null);
  };

  //user menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenCart = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);

  };
  return (
    <>
      {" "}
      <Box sx={styles.wrapper}>
        <Box sx={styles.logoWrapper}>
          <Link component={NavLink} to="/" sx={{ textDecoration: "none" }}>
            {" "}
            <Typography sx={styles.logo}>
              MERN E-Commerce BoilerPlate
            </Typography>
          </Link>
        </Box>
        <Box sx={styles.linksWrapper}>
          {authenticated ? (
            <>
              <Typography sx={styles.headerButton} marginRight>
                {username ? username : null}
              </Typography>
              {isAdmin && (
                <Link component={NavLink} to="/admin">
                  <Button variant="contained">Admin Panel</Button>
                </Link>
              )}

              <Button onClick={handleOpenCart}>
                {" "}
                <Badge
                  badgeContent={cartItems ? cartItems.length : null}
                  color="secondary"
                >
                  <AddShoppingCartIcon />
                </Badge>
              </Button>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Box sx={styles.avatar}>
                  <CgProfile />
                </Box>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    component={NavLink}
                    to="/favorites"
                    sx={{ textDecoration: "none" }}
                  >
                    Favorites
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    component={NavLink}
                    to="/useraccount"
                    sx={{ textDecoration: "none" }}
                  >
                    Account
                  </Link>
                </MenuItem>
                <MenuItem onClick={logout}>
                  <Link
                    component={NavLink}
                    to="/"
                    sx={{ textDecoration: "none" }}
                  >
                    Logout
                  </Link>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button onClick={handleOpenCart}>
                {" "}
                <Badge
                  badgeContent={cartItems ? cartItems.length : null}
                  color="secondary"
                >
                  <AddShoppingCartIcon />
                </Badge>
              </Button>

              <Link
                component={NavLink}
                to="/auth"
                style={({ isActive }) =>
                  isActive ? { color: "black" } : { color: "white" }
                }
                sx={{ textDecoration: "none" }}
              >
                <Typography sx={styles.headerButton}>Login</Typography>
              </Link>
            </>
          )}
        </Box>
      </Box>
      <CartDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Header;
