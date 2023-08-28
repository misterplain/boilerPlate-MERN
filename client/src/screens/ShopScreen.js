import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchFilter from "../components/SearchFilter/SearchFilter";
import SearchResults from "../components/SearchResults/SearchResults";
import { setShopToCollection } from "../actions/shopActions";
import Wrapper from "../components/Wrapper/Wrapper";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    // marginTop: theme.spacing(8),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginTop: "60px",
    // height: "100%",
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    width: "100%",
    marginTop: "60px",
  }),
}));

const styles = {
  searchPage: {
    display: "flex",
    marginTop: "30px",
  },
};

const ShopScreen = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const collectionsList = useSelector((state) => state.collections);
  // const isLoading = collectionsList.loading || productList.loading;
  // const error = collectionsList.error || productList.error;
  // const products = productList?.products;
  const collections = collectionsList?.collections;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar variant="small" sx={{ backgroundColor: "white" }}>
          <IconButton
            color="green"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            noWrap
            component="div"
            sx={{ color: "black", ...(open && { display: "none" }) }}
          >
            Search Filters
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          paddingTop: "64px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            marginTop: "64px",
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>

        <Divider />
        <SearchFilter />

      </Drawer>
      <Main open={open}>
        <Box sx={{ ...styles.searchPage, ...(open && { marginTop: "30px" }) }}>
          <SearchResults />
        </Box>

      </Main>
    </Box>
  );
};

export default ShopScreen;
// import React, { useEffect, useState } from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import { useDispatch, useSelector } from "react-redux";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Drawer from "@mui/material/Drawer";
// import CssBaseline from "@mui/material/CssBaseline";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import SearchFilter from "../components/SearchFilter/SearchFilter";
// import SearchResults from "../components/SearchResults/SearchResults";
// import { setShopToCollection } from "../actions/shopActions";
// import Wrapper from "../components/Wrapper/Wrapper";

// const drawerWidth = 240;

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     height: "100%",
//     zIndex: theme.zIndex.appBar,
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     // marginTop: theme.spacing(8),
//     ...(open && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   })
// );

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(["margin", "width"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   position: "sticky",
//   top: "60px", // Adjust this value as needed
//   zIndex: theme.zIndex.appBar,
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginTop: "60px",
//     // height: "100%",
//     // display: "block",
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
//   ...(!open && {
//     // width: "100%",
//     // marginTop: "60px",
//     // display: "block",
//     // backgroundColor: "none"
//     // position: "fixed",
//     // top: 60,
//     // width: "100%",
//     // zIndex: theme.zIndex.appBar,
//     // backgroundColor: "white",
//     width: "100%",
//     backgroundColor: "white", 
//   }),
// }));

// const styles = {
//   searchPage: {
//     display: "flex",
//     marginTop: "30px",
//   },
// };

// const ShopScreen = () => {
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(true);

//   const collectionsList = useSelector((state) => state.collections);
//   // const isLoading = collectionsList.loading || productList.loading;
//   // const error = collectionsList.error || productList.error;
//   // const products = productList?.products;
//   const collections = collectionsList?.collections;

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const [scrollPosition, setScrollPosition] = useState(0);

//   useEffect(() => {
//     function handleScroll() {
//       const position = window.scrollY;
//       setScrollPosition(position);
//       console.log(position)
//     }

//     window.addEventListener("scroll", handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <Box sx={{ display: "flex" }}>
      
//       <CssBaseline />
//       <AppBar  open={open}>
//         <Toolbar variant="small" position="absolute" sx={{ backgroundColor: "white" }}>
//           <IconButton
//             color="green"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{ mr: 2, ...(open && { display: "none" }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             noWrap
//             component="div"
//             sx={{ color: "black", ...(open && { display: "none" }) }}
//           >
//             Search Filters
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           paddingTop: "64px",
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             marginTop: "64px",
//             boxSizing: "border-box",
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <IconButton onClick={handleDrawerClose}>
//           {theme.direction === "ltr" ? (
//             <ChevronLeftIcon />
//           ) : (
//             <ChevronRightIcon />
//           )}
//         </IconButton>

//         <Divider />
//         <SearchFilter />
//       </Drawer>
//       <Main open={open} sx={{border: "1px solid blue"}}>
//         <Box sx={{ ...styles.searchPage, ...(open && { marginTop: "30px" }) }}>
//           <SearchResults />
//         </Box>
//       </Main>
//     </Box>
//   );
// };

// export default ShopScreen;

// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import { useDispatch, useSelector } from "react-redux";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Drawer from "@mui/material/Drawer";
// import CssBaseline from "@mui/material/CssBaseline";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import SearchFilter from "../components/SearchFilter/SearchFilter";
// import SearchResults from "../components/SearchResults/SearchResults";
// import { setShopToCollection } from "../actions/shopActions";
// import Wrapper from "../components/Wrapper/Wrapper";

// const drawerWidth = 240;

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     // marginTop: theme.spacing(8),
//     marginTop: open ? "30px" : "60px",
//     height: "300px",
//     ...(open && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   })
// );

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(["margin", "width"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     // marginTop: "60px",
//     top:"0px",

//     height: "0px",
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
//   ...(!open && {
//     width: "100%",
//     height: "30px"
//     // marginTop: "60px",
//   }),
// }));

// const styles = {
//   searchPage: {
//     display: "flex",
//     marginTop: "30px",
//   },
// };

// const ShopScreen = () => {
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(true);

//   const collectionsList = useSelector((state) => state.collections);
//   // const isLoading = collectionsList.loading || productList.loading;
//   // const error = collectionsList.error || productList.error;
//   // const products = productList?.products;
//   const collections = collectionsList?.collections;

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="relative"  open={open}>
//         <Toolbar variant="small" sx={{ backgroundColor: "white" }}>
//           <IconButton
//             color="green"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{ mr: 2, ...(open && { display: "none" }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             noWrap
//             component="div"
//             sx={{ color: "black", ...(open && { display: "none" }) }}
//           >
//             Search Filters
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           paddingTop: "64px",
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             marginTop: "64px",
//             boxSizing: "border-box",
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <IconButton onClick={handleDrawerClose}>
//           {theme.direction === "ltr" ? (
//             <ChevronLeftIcon />
//           ) : (
//             <ChevronRightIcon />
//           )}
//         </IconButton>

//         <Divider />
//         <SearchFilter />

//       </Drawer>
//       <Main open={open}>
//         <Box sx={{ ...styles.searchPage, ...(open && { marginTop: "30px" }) }}>
//           <SearchResults />
//         </Box>

//       </Main>
//     </Box>
//   );
// };

// export default ShopScreen;

// import React, { useState, useEffect } from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import { useDispatch, useSelector } from "react-redux";
// import { withTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Drawer from "@mui/material/Drawer";
// import CssBaseline from "@mui/material/CssBaseline";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import SearchFilter from "../components/SearchFilter/SearchFilter";
// import SearchResults from "../components/SearchResults/SearchResults";
// import { setShopToCollection } from "../actions/shopActions";
// import Wrapper from "../components/Wrapper/Wrapper";

// const drawerWidth = 240;

// const styles = {
//   searchPage: {
//     display: "flex",
//     marginTop: "30px",
//   },
// };

// const ShopScreen = () => {
//   //appbar
//   const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== "open",
//   })(({ theme, open, scrollY }) => ({
//     marginTop: scrollY > 60 ? "0px" : "60px",
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     ...(open && {
//       width: `calc(100% - ${drawerWidth}px)`,
//       // marginTop: "60px",
//       // height: "100%",
//       marginLeft: `${drawerWidth}px`,
//       transition: theme.transitions.create(["margin", "width"], {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//     }),
//     ...(!open && {
//       width: "100%",
//       marginTop: "60px",
//       top: "0",
//     }),

//   }));

//   //main
//   const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//     ({ theme, open, scrollY }) => ({
//       flexGrow: 1,
//       padding: theme.spacing(3),
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//       marginLeft: `-${drawerWidth}px`,
//       marginTop: scrollY > 60 ? "0px" : "60px",
//       ...(open && {
//         transition: theme.transitions.create("margin", {
//           easing: theme.transitions.easing.easeOut,
//           duration: theme.transitions.duration.enteringScreen,
//         }),
//         marginLeft: 0,
//       }),
//     })
//   );

//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(true);

//   const collectionsList = useSelector((state) => state.collections);
//   const collections = collectionsList?.collections;

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   //sroll
//   const [scrollY, setScrollY] = useState(0);

//   const handleScroll = () => {
//     const newScrollY = window.scrollY;
//     setScrollY(newScrollY);
//     console.log(newScrollY);
//     console.log(window);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar variant="small" sx={{ backgroundColor: "white" }}>
//           <IconButton
//             color="green"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{ mr: 2, ...(open && { display: "none" }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             noWrap
//             component="div"
//             sx={{ color: "black", ...(open && { display: "none" }) }}
//           >
//             Search Filters
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           paddingTop: "64px",
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             marginTop: "64px",
//             boxSizing: "border-box",
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <IconButton onClick={handleDrawerClose}>
//           {theme.direction === "ltr" ? (
//             <ChevronLeftIcon />
//           ) : (
//             <ChevronRightIcon />
//           )}
//         </IconButton>

//         <Divider />
//         <SearchFilter />
//       </Drawer>
//       <Main open={open}>
//         <Box sx={{ ...styles.searchPage, ...(open && { marginTop: "30px" }) }}>
//           <SearchResults />
//         </Box>
//       </Main>
//     </Box>
//   );
// };

// export default ShopScreen;
// import  React, {useState, useEffect} from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import { useDispatch, useSelector } from "react-redux";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Drawer from "@mui/material/Drawer";
// import CssBaseline from "@mui/material/CssBaseline";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import SearchFilter from "../components/SearchFilter/SearchFilter";
// import SearchResults from "../components/SearchResults/SearchResults";
// import { setShopToCollection } from "../actions/shopActions";
// import Wrapper from "../components/Wrapper/Wrapper";

// const drawerWidth = 240;

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     marginTop: open ? "30px" : 0,
//     ...(open && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   })
// );

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(["margin", "width"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginTop: "30px",
//     // height: "100%",
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
//   ...(!open && {
//     width: "100%",
//     marginTop: "60px",

//   }),
// }));

// const styles = {
//   searchPage: {
//     display: "flex",
//     marginTop: "30px",
//   },
// };

// const ShopScreen = () => {
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(true);

//   const collectionsList = useSelector((state) => state.collections);
//   // const isLoading = collectionsList.loading || productList.loading;
//   // const error = collectionsList.error || productList.error;
//   // const products = productList?.products;
//   const collections = collectionsList?.collections;

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   //scroll
//   const [scrollY, setScrollY] = useState(0);

// const handleScroll = () => {
//   setScrollY(window.scrollY);
//   console.log(scrollY)
// };

// useEffect(() => {
//   window.addEventListener("scroll", handleScroll);
//   return () => {
//     window.removeEventListener("scroll", handleScroll);
//   };
// }, [window.scrollY]);

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="sticky" anchor="left" open={open}>
//         <Toolbar variant="small" sx={{ backgroundColor: "white" }}>
//           <IconButton
//             color="green"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{ mr: 2, ...(open && { display: "none" }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             noWrap
//             component="div"
//             sx={{ color: "black", ...(open && { display: "none" }) }}
//           >
//             Search Filters
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           paddingTop: "64px",
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             marginTop: "64px",
//             boxSizing: "border-box",
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <IconButton onClick={handleDrawerClose}>
//           {theme.direction === "ltr" ? (
//             <ChevronLeftIcon />
//           ) : (
//             <ChevronRightIcon />
//           )}
//         </IconButton>

//         <Divider />
//         <SearchFilter />

//       </Drawer>
//       <Main open={open}>
//         <Box >
//           <SearchResults />
//         </Box>

//       </Main>
//     </Box>
//   );
// };

// export default ShopScreen;
