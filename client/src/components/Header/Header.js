import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { logoutUser } from "../../actions/authActions";
import { useCartDrawer } from "../../context/CartDrawerContext";
import { CgProfile } from "react-icons/cg";
import Badge from "@mui/material/Badge";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import CartDrawer from "../CartDrawer/CartDrawer";
import { fetchFilteredProducts } from "../../actions/shopActions";
import { useSnackbar } from "notistack";
import { snackbarDispatch } from "../../utils/snackbarDispatch";
import { useNavigate } from "react-router-dom";
import { setShopToCollection } from "../../actions/shopActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import HomeIcon from '@mui/icons-material/Home';

import styles from "./styles";

const Header = ({ isActive }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);

  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const userDetailsState = useSelector((state) => state.userDetails);
  const { username, isAdmin } = userDetailsState?.userDetails || {};
  const cartState = useSelector((state) => state.shoppingCart);
  const { cartItems } = cartState || {};
  const collectionsList = useSelector((state) => state.collections);
  const { collections } = collectionsList;
  const shopState = useSelector((state) => state.shop);
  const { products, error, filters, maxPrice } = shopState;

  const { isOpen, setIsOpen } = useCartDrawer();

  const [searchQuery, setSearchQuery] = useState("");

  const mediumBreakpoint = useMediaQuery((theme) =>
    theme.breakpoints.down("md")
  );

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

  //search
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };
  //search and navigate
  const handleSearchBar = async () => {
    snackbarDispatch(
      dispatch(
        fetchFilteredProducts({
          filterObject: { searchQuery: searchQuery },
        })
      ),
      "Search Successful",
      "Error Searcing",
      enqueueSnackbar,
      [() => navigate("/shop")]
    );
    setSearchQuery("");
  };

  //collection
  const [collection, setCollection] = useState("");
  const handleCollectionChange = (e) => {
    const value = e.target.value;
    if (value === "All") {
      setCollection(value);
      snackbarDispatch(
        dispatch(
          setShopToCollection(value, collections, {
            singleCollection: false,
          })
        ),
        "Collection Filtered",
        "Error Filtering",
        enqueueSnackbar,
        [() => navigate("/shop")]
      );
    } else {
      setCollection(value);
      snackbarDispatch(
        dispatch(
          setShopToCollection(value, collections, {
            singleCollection: true,
          })
        ),
        "Collection Filtered",
        "Error Filtering",
        enqueueSnackbar,
        [() => navigate("/shop")]
      );
    }
  };
  return (
    <>
      {" "}
      <Box sx={styles.wrapper}>
        <Box sx={styles.logoWrapper}>
          <Link component={NavLink} to="/" sx={{ textDecoration: "none" }}>
            {mediumBreakpoint ? (
              <Box sx={styles.homeIcon}>
                <HomeIcon />
              </Box>
            ) : (
              <Typography sx={styles.logo}>MERN E-Commerce</Typography>
            )}
          </Link>
        </Box>
        <Box sx={styles.searchBarWrapper}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            id="outlined-start-adornment"
            // sx={{ m: 1, width: "25ch" }}
            sx={{ background: "white", borderRadius: "5px" }}
            onChange={handleSearchQueryChange}
            InputProps={{
              endAdornment: (
                <>
                  {/* <InputAdornment position="start">kg</InputAdornment>
                  <InputAdornment position="start">kg</InputAdornment> */}
                  <IconButton
                    aria-label="toggleFilter"
                    onClick={handleSearchBar}
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                  <IconButton
                    aria-label="toggleFilter"
                    onClick={() => navigate("/shop")}
                    edge="end"
                  >
                    <TuneIcon />
                  </IconButton>
                </>
              ),
            }}
          />
          <FormControl sx={styles.collections} size="small">
            <InputLabel id="demo-select-small-label">Collections</InputLabel>
            <Select
              labelId="collectionLabel"
              id="collectionLabel"
              value={collection}
              label="Collections"
              onChange={(e) => {
                handleCollectionChange(e);
              }}
            >
              <MenuItem value={"All"}>All</MenuItem>
              {collections?.map((collection) => (
                <MenuItem value={collection._id} key={collection._id}>
                  {collection.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={styles.linksWrapper}>
          {authenticated ? (
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
                {isAdmin && (
                  <MenuItem onClick={handleClose}>
                    <Link
                      component={NavLink}
                      to="/admin"
                      sx={{ textDecoration: "none" }}
                    >
                      <Button variant="contained">Admin Panel</Button>
                    </Link>
                  </MenuItem>
                )}
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


//WRAPPER

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import InputLabel from "@mui/material/InputLabel";
// import TextField from "@mui/material/TextField";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import { NavLink } from "react-router-dom";
// import { Link } from "@mui/material";
// import { logoutUser } from "../../actions/authActions";
// import { useCartDrawer } from "../../context/CartDrawerContext";
// import { CgProfile } from "react-icons/cg";
// import Badge from "@mui/material/Badge";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import SearchIcon from "@mui/icons-material/Search";
// import TuneIcon from "@mui/icons-material/Tune";
// import CartDrawer from "../CartDrawer/CartDrawer";
// import { fetchFilteredProducts } from "../../actions/shopActions";
// import { useSnackbar } from "notistack";
// import { snackbarDispatch } from "../../utils/snackbarDispatch";
// import { useNavigate } from "react-router-dom";
// import { setShopToCollection } from "../../actions/shopActions";
// import Wrapper from "../Wrapper/Wrapper";

// import styles from "./styles";

// const Header = ({ isActive }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();
//   const [anchorEl, setAnchorEl] = useState(null);

//   const userAuthState = useSelector((state) => state.userAuth);
//   const { authenticated } = userAuthState;
//   const userDetailsState = useSelector((state) => state.userDetails);
//   const { username, isAdmin } = userDetailsState?.userDetails || {};
//   const cartState = useSelector((state) => state.shoppingCart);
//   const { cartItems } = cartState || {};
//   const collectionsList = useSelector((state) => state.collections);
//   const { collections } = collectionsList;
//   const shopState = useSelector((state) => state.shop);
//   const { products, error, filters, maxPrice } = shopState;

//   const { isOpen, setIsOpen } = useCartDrawer();

//   const [searchQuery, setSearchQuery] = useState("");

//   const logout = () => {
//     dispatch(logoutUser());
//     setAnchorEl(null);
//   };

//   //user menu
//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleOpenCart = () => {
//     setIsOpen((prevIsOpen) => !prevIsOpen);
//   };

//   //search
//   const handleSearchQueryChange = (e) => {
//     setSearchQuery(e.target.value);
//   };
//   //search and navigate
//   const handleSearchBar = async () => {
//     snackbarDispatch(
//       dispatch(
//         fetchFilteredProducts({
//           filterObject: { searchQuery: searchQuery },
//         })
//       ),
//       "Search Successful",
//       "Error Searcing",
//       enqueueSnackbar,
//       [() => navigate("/shop")]
//     );
//     setSearchQuery("");
//   };

//   //collection
//   const [collection, setCollection] = useState("");
//   const handleCollectionChange = (e) => {
//     const value = e.target.value;
//     if (value === "All") {
//       setCollection(value);
//       snackbarDispatch(
//         dispatch(
//           setShopToCollection(value, collections, {
//             singleCollection: false,
//           })
//         ),
//         "Collection Filtered",
//         "Error Filtering",
//         enqueueSnackbar,
//         [() => navigate("/shop")]
//       );
//     } else {
//       setCollection(value);
//       snackbarDispatch(
//         dispatch(
//           setShopToCollection(value, collections, {
//             singleCollection: true,
//           })
//         ),
//         "Collection Filtered",
//         "Error Filtering",
//         enqueueSnackbar,
//         [() => navigate("/shop")]
//       );
//     }
//   };
//   return (
//     <>
//       <Wrapper
//         id="headerWrapper"
//         flexDirection="row"
//         justifyContent="space-around"
//         alignItems="center"
//         customStyles={styles.wrapper}
//       >
//         <Wrapper
//           id="logoWrapper"
//           customStyles={{
//             // flex: "0 0 auto",
//             border: "1px solid red",
//             maxWidth: "fit-content",
//           }}
//         >
//           {" "}
//           <Link component={NavLink} to="/" sx={{ textDecoration: "none" }}>
//             {" "}
//             <Typography sx={styles.logo}>MERN E-Commerce</Typography>
//           </Link>
//         </Wrapper>
//         <Wrapper
//           id="searchBarWrapper"
//           customStyles={{  
//             maxWidth: "fit-content", 
//             border: "1px solid white" }}
//         >
//           <TextField
//             label="Search"
//             variant="outlined"
//             size="small"
//             value={searchQuery}
//             id="outlined-start-adornment"
//             // sx={{ m: 1, width: "25ch" }}
//             sx={{ background: "white", borderRadius: "5px" }}
//             onChange={handleSearchQueryChange}
//             InputProps={{
//               endAdornment: (
//                 <>
//                   {/* <InputAdornment position="start">kg</InputAdornment>
//                   <InputAdornment position="start">kg</InputAdornment> */}
//                   <IconButton
//                     aria-label="toggleFilter"
//                     onClick={handleSearchBar}
//                     edge="end"
//                   >
//                     <SearchIcon />
//                   </IconButton>
//                   <IconButton
//                     aria-label="toggleFilter"
//                     onClick={() => navigate("/shop")}
//                     edge="end"
//                   >
//                     <TuneIcon />
//                   </IconButton>
//                 </>
//               ),
//             }}
//           />
//           <FormControl
//             sx={{
//               minWidth: 170,
//               background: "white",
//               borderRadius: "5px",
//               margin: "0px 10px",
//             }}
//             size="small"
//           >
//             <InputLabel id="demo-select-small-label">Collections</InputLabel>
//             <Select
//               labelId="collectionLabel"
//               id="collectionLabel"
//               value={collection}
//               label="Collections"
//               onChange={(e) => {
//                 handleCollectionChange(e);
//               }}
//             >
//               <MenuItem value={"All"}>All</MenuItem>
//               {collections?.map((collection) => (
//                 <MenuItem value={collection._id} key={collection._id}>
//                   {collection.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>{" "}
//         </Wrapper>
//         <Wrapper
//           id="linksWrapper"
//           customStyles={{
//             // flex: "0 0 auto",
//             border: "1px solid blue",
//             maxWidth: "fit-content",
//           }}
//         >
//           {" "}
//           {authenticated ? (
//             <>
//               <Button onClick={handleOpenCart}>
//                 {" "}
//                 <Badge
//                   badgeContent={cartItems ? cartItems.length : null}
//                   color="secondary"
//                 >
//                   <AddShoppingCartIcon />
//                 </Badge>
//               </Button>
//               <IconButton
//                 size="large"
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={handleMenu}
//                 color="inherit"
//               >
//                 <Box sx={styles.avatar}>
//                   <CgProfile />
//                 </Box>
//               </IconButton>
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 open={Boolean(anchorEl)}
//                 onClose={handleClose}
//               >
//                 {isAdmin && (
//                   <MenuItem onClick={handleClose}>
//                     <Link
//                       component={NavLink}
//                       to="/admin"
//                       sx={{ textDecoration: "none" }}
//                     >
//                       <Button variant="contained">Admin Panel</Button>
//                     </Link>
//                   </MenuItem>
//                 )}
//                 <MenuItem onClick={handleClose}>
//                   <Link
//                     component={NavLink}
//                     to="/favorites"
//                     sx={{ textDecoration: "none" }}
//                   >
//                     Favorites
//                   </Link>
//                 </MenuItem>
//                 <MenuItem onClick={handleClose}>
//                   <Link
//                     component={NavLink}
//                     to="/useraccount"
//                     sx={{ textDecoration: "none" }}
//                   >
//                     Account
//                   </Link>
//                 </MenuItem>
//                 <MenuItem onClick={logout}>
//                   <Link
//                     component={NavLink}
//                     to="/"
//                     sx={{ textDecoration: "none" }}
//                   >
//                     Logout
//                   </Link>
//                 </MenuItem>
//               </Menu>
//             </>
//           ) : (
//             <>
//               <Button onClick={handleOpenCart}>
//                 {" "}
//                 <Badge
//                   badgeContent={cartItems ? cartItems.length : null}
//                   color="secondary"
//                 >
//                   <AddShoppingCartIcon />
//                 </Badge>
//               </Button>

//               <Link
//                 component={NavLink}
//                 to="/auth"
//                 style={({ isActive }) =>
//                   isActive ? { color: "black" } : { color: "white" }
//                 }
//                 sx={{ textDecoration: "none" }}
//               >
//                 <Typography sx={styles.headerButton}>Login</Typography>
//               </Link>
//             </>
//           )}
//         </Wrapper>
//       </Wrapper>

//       <CartDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
//     </>
//   );
// };

// export default Header;
