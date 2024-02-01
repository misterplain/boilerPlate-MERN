import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { loginForm, logoutUser } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import heroBackGround from "../../assets/heroBackGround.jpg";
import Wrapper from "../Wrapper/Wrapper";
import { useTheme } from "@mui/material/styles";
import ResponsiveWrapper from "../Wrapper/ResponsiveWrapper";
import { Link, NavLink } from "react-router-dom";
import { setShopToCollection } from "../../actions/shopActions";
import { useSnackbar } from "notistack";
import { snackbarDispatch } from "../../utils/snackbarDispatch";
import { useNavigate } from "react-router-dom";

const styles = {
  contentWrapper: (theme) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "3rem 0rem",
  }),
  collectionsCardsWrapper: (theme) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    flexWrap: "wrap",
    [theme.breakpoints.up("sm")]: {},
  }),
  collectionsCard: (theme) => ({
    margin: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
    [theme.breakpoints.up("md")]: {
      width: "28%",
    },
    // [theme.breakpoints.up("lg")]: {
    //   width: "30%",
    // },
  }),
  cardImage: (theme) => ({
    borderRadius: "8px",
    width: "100%",
  }),
  collectionName: (theme) => ({
    marginTop: "1rem",
  }),
  collectionItems: (theme) => ({
    color: "gray",
  }),
  allCollectionsButton: (theme) => ({
    // border: "1px solid red",
    alignSelf: "center",
    // padding: "0.5rem",
    marginTop: "1rem",
    // cursor: "pointer",
  }),
  //admin login bar
  adminLoginBar: (theme) => ({
    height: "45px",
    // backgroundColor: "#A87CA0",
    borderRadius: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: "colorChange 5s infinite linear",
    "@keyframes colorChange": {
      "0%": {
        backgroundColor: "#A87CA0",
      },
      "20%": {
        backgroundColor: "#7B4E7B", // Intermediate color
      },
      "40%": {
        backgroundColor: "#5E366E",
      },
      "60%": {
        backgroundColor: "#5E366E",
      },
      "80%": {
        backgroundColor: "#7B4E7B",
      },
      "100%": {
        backgroundColor: "#A87CA0",
      },
    },
  }),
  adminTestButton: (theme) => ({
    color: "white",
    fontSize: "1.3rem",
    backgroundColor: "#A87CA0",
    border: "1px solid white",
    padding: "2px 10px",
    borderRadius: "20px",
    cursor: "pointer",
  }),
};

const Hero = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const signInAdmin = () => {
    dispatch(loginForm("admin1@test.com", "123456"));
  };

  const authState = useSelector((state) => state.userAuth);
  const { loginError, authenticated } = authState;

  const userDetailsState = useSelector((state) => state?.userDetails);
  const isAdmin = userDetailsState?.userDetails?.isAdmin;
  const collectionsList = useSelector((state) => state.collections);
  const collections = collectionsList?.collections;

  //route to shop page with all collections query

  //collection
  const [collection, setCollection] = useState("");
  const handleCollectionChange = (allCollections) => {
    setCollection(allCollections);
    snackbarDispatch(
      dispatch(
        setShopToCollection(allCollections, collections, {
          singleCollection: false,
        })
      ),
      "Collection Filtered",
      "Error Filtering",
      enqueueSnackbar,
      [() => navigate("/shop")]
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F0F0F0",
        width: "100%",
        borderBottom: "1px solid black",
      }}
    >
      <ResponsiveWrapper>
        {" "}
        {!authenticated && !isAdmin && (
          <Box sx={styles.adminLoginBar}>
            {" "}
            <Box
              variant="contained"
              size="small"
              color="secondary"
              sx={styles.adminTestButton(theme)}
              onClick={() => signInAdmin()}
            >
              Login with Admin Credentials to test
            </Box>{" "}
          </Box>
        )}
        <Box id="boxwrapper" sx={styles.contentWrapper(theme)}>
          <Typography variant="h1">
            Grabby hero title to capture attention
          </Typography>
          <Typography variant="h5" sx={{ color: "gray" }}>
            A slightly longer piece of text to get the user interested to
            explore more and add products to the shopping cart
          </Typography>
          <Box sx={styles.collectionsCardsWrapper(theme)}>
            {collections?.slice(0, 3).map((collection, index) => (
              <Box sx={styles.collectionsCard(theme)}>
                <Link
                  component={NavLink}
                  to={"/shop"}
                  key={collection._id}
                  style={{ textDecoration: "none", width: "100%" }}
                  onClick={() => {
                    dispatch(
                      setShopToCollection(collection._id, collections, {
                        singleCollection: true,
                      })
                    );
                  }}
                >
                  <Box
                    component="img"
                    sx={styles.cardImage(theme)}
                    src={collection.image.url}
                  ></Box>
                </Link>

                <Typography variant="body1" sx={styles.collectionName(theme)}>
                  {collection.name}
                </Typography>
                <Typography variant="body2" sx={styles.collectionItems(theme)}>
                  {" "}
                  {collection.products.length} products in this collection
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={styles.allCollectionsButton(theme)}>
            <Button
              color="secondary"
              size="small"
              variant="outlined"
              onClick={() => handleCollectionChange("All")}
            >
              Browse all collections and products
            </Button>
          </Box>
        </Box>
      </ResponsiveWrapper>
    </Box>

    // <Box sx={styles.wrapper}>
    //   {" "}
    // {!authenticated && (
    //   <Button
    //     variant="contained"
    //     size="large"
    //     color="secondary"
    //     sx={styles.adminTestButton}
    //     onClick={() => signInAdmin()}
    //   >
    //     Login with Admin Credentials to test
    //   </Button>
    // )}
    // {authenticated && isAdmin && (
    //   <Button
    //     variant="contained"
    //     size="large"
    //     color="primary"
    //     sx={styles.adminTestButton}
    //     onClick={() => dispatch(logoutUser())}
    //   >
    //     Logout of Admin test account
    //   </Button>
    // )}
    //   <Typography sx={styles.heroText}>hero</Typography>
    // </Box>
  );
};

export default Hero;
