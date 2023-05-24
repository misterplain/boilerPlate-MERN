import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";

//icons
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

import styles from "./styles";

const Header = ({ isActive, user }) => {

  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };


  console.log(user)
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.logoWrapper}>
        <Link component={NavLink} to="/" sx={{ textDecoration: "none" }}>
          {" "}
          <Typography sx={styles.logo}>MERN E-Commerce BoilerPlate</Typography>
        </Link>
      </Box>
      <Box sx={styles.linksWrapper}>
        {/* <Link
          component={NavLink}
          to="/shop"
          style={({ isActive }) =>
            isActive ? { color: "black" } : { color: "white" }
          }
          sx={{ textDecoration: "none" }}
        >
          {" "}
          <Typography sx={styles.headerButton}>shop</Typography>
        </Link>
        <Link
          component={NavLink}
          to="/contact"
          style={({ isActive }) =>
            isActive ? { color: "black" } : { color: "white" }
          }
          sx={{ textDecoration: "none" }}
        >
          {" "}
          <Typography sx={styles.headerButton}>contact</Typography>
        </Link> */}
        {user ? (
          <>
            <Box
              component="img"
              src={user?.photos[0].value}
              alt=""
              sx={styles.avatar}
            />
            <Typography sx={styles.headerButton}>{user.displayName}</Typography>
            <Link
            component={NavLink}
            to="/auth"
            style={({ isActive }) =>
              isActive ? { color: "black" } : { color: "white" }
            }
            sx={{ textDecoration: "none" }}
          >
            {" "}
            <Typography sx={styles.headerButton} onClick={logout}>
              {/* <BiUserCircle /> */}
              Logout
            </Typography>
          </Link>
            {/* <Link
          component={NavLink}
          to="/cart"
          style={({ isActive }) =>
            isActive ? { color: "black" } : { color: "white" }
          }
          sx={{ textDecoration: "none" }}
        >
          {" "}
          <Box sx={styles.headerButton}>
            <AiOutlineShoppingCart />
          </Box>
        </Link> */}
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
            {" "}
            <Typography sx={styles.headerButton}>
              {/* <BiUserCircle /> */}
              Login
            </Typography>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default Header;
