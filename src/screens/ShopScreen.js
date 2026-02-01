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
import { useNavigate } from "react-router-dom";

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

  },
};

const ShopScreen = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const productList = useSelector((state) => state.productList);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (productList?.products?.length === 0) {
      navigate("/");
    }
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
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2,
              ...(open && { display: "none" }),
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          >
            <MenuIcon style={{ color: "purple" }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: "purple", margin: "10px" }}
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
