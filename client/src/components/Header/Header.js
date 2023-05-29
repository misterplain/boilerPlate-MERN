import React, { useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { logoutUser } from "../../actions/authActions";

//icons
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

import styles from "./styles";

const Header = ({ isActive }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const userDetailsState = useSelector((state) => state.userDetails);
  const { email, username, isAdmin } = userDetailsState?.userDetails || {};

  const logout = () => {
    // window.open("http://localhost:5000/auth/logout", "_self");
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

  // console.log(user);
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.logoWrapper}>
        <Link component={NavLink} to="/" sx={{ textDecoration: "none" }}>
          {" "}
          <Typography sx={styles.logo}>MERN E-Commerce BoilerPlate</Typography>
        </Link>
      </Box>
      <Box sx={styles.linksWrapper}>
        {authenticated ? (
          <>
            <Typography sx={styles.headerButton}>
              {username ? username : null}
            </Typography>

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
                  to="/editprofile"
                  sx={{ textDecoration: "none" }}
                >
                  Edit Profile
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
        )}
      </Box>
    </Box>
  );
};

export default Header;
