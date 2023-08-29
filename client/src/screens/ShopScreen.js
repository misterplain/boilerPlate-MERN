import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
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
  boxShadow: "none",
  backgroundColor: "none",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    height: "0px",
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {

    height: "0px",
  }),
}));

const styles = {
  searchPage: {
    // display: "flex",
    // marginTop: "30px",
  },
};

const ShopScreen = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const collectionsList = useSelector((state) => state.collections);
  const collections = collectionsList?.collections;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //scroll
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.scrollY;
    console.log(window);
    console.log(scrollPosition);
    setScrollPosition(position, () => {
      console.log(scrollPosition);
    });
  };

  useEffect(() => {
    console.log("mounted");
    console.log(window);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      console.log("unmounted");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box sx={{ display: "flex", overflow: "auto", height: "100%" }}>
      <CssBaseline />
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
          <IconButton
            color="green"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
            <Typography
              noWrap
              component="div"
              sx={{ color: "black", margin: "10px" }}
            >
              Search Filters
            </Typography>
          </IconButton>

          <SearchResults />
        </Box>
      </Main>
    </Box>
  );
};

export default ShopScreen;
