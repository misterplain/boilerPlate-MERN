import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import {
  deleteCollection,
} from "../../../actions/collectionsActions";
import CollectionsModal from "./CollectionsModal";
import AlertMessage from "../../AlertMessage/AlertMessage";
import { useSnackbar } from "notistack";

import { collectionStyles, productStyles } from "./styles";

const AdminCollections = () => {
  const dispatch = useDispatch();
  const [collectionName, setCollectionName] = useState("");
  const collectionsState = useSelector((state) => state.collections);
  const { collections, error } = collectionsState;
  const productsList = useSelector((state) => state.productList);
  const { products } = productsList
  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;
  const [collectionProductsId, setCollectionProductsId] = useState(null);


  const [open, setOpen] = useState(false);
  const [collectionToEdit, setCollectionToEdit] = useState(null);

  const handleOpenModal = (collection) => {
    setCollectionToEdit(collection);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setCollectionToEdit(null);
    setOpen(false);
  };

  return (
    <Box sx={collectionStyles.pageWrapper}>
      {error && <AlertMessage type="error">{error}</AlertMessage>}

      <hr />
      <Box sx={collectionStyles.sectionWrapper}>
        <Box sx={collectionStyles.nameAndNewWrapper}>
          <Typography sx={{ marginLeft: "20px" }}>Collections</Typography>{" "}
          <Button
            variant="outlined"
            color="success"
            sx={{ marginRight: "20px" }}
            onClick={() => handleOpenModal()}
          >
            new collection
          </Button>
        </Box>

        <Box sx={collectionStyles.list}>
          {collectionsState?.collections?.map((collection) => (
            <Box
              key={collection._id}
              sx={collectionStyles.card}
              onClick={() => {
                setCollectionProductsId(collection._id);
                setCollectionName(collection.name);
              }}
            >
              <Box sx={collectionStyles.cardImageWrapper}>
                <Box
                  component="img"
                  sx={collectionStyles.image}
                  src={collection.image.url}
                  alt="alt"
                />
                <Box sx={collectionStyles.overlayBox}>
                  <Typography sx={collectionStyles.name}>
                    {collection.name}
                  </Typography>
                  <Typography sx={collectionStyles.length}>
                    {collection.products.length} products
                  </Typography>
                </Box>
              </Box>
              <Box sx={collectionStyles.optionsWrapper}>
                <Button
                  onClick={() => {
                    handleOpenModal(collection);
                  }}
                  color="secondary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    dispatch(deleteCollection(collection._id, token));
                  }}
                  color="error"
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {collectionProductsId !== null && (
        <Box sx={productStyles.sectionWrapper}>
          <Box sx={productStyles.nameAndNewWrapper}>
            <Typography sx={{ marginLeft: "20px" }}>
              Products within {collectionName} collection
            </Typography>{" "}
            <Box sx={productStyles.addProductButton}>
              <Link component={NavLink} to={"/admin/products/new"}>
                <Button
                  variant="outlined"
                  color="success"
                  sx={{ marginRight: "20px" }}
                >
                  New Product
                </Button>
              </Link>
            </Box>
          </Box>

          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              textAlign: "center",
              borderBottom: "1px solid black",
              marginBottom: "10px",
            }}
          >
            {" "}
            <Grid item xs={3}>
              <Typography>Name</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography>Price</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography>Stock</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>isDisplayed</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>isFeatured</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>Actions</Typography>
            </Grid>
          </Grid>

          {products &&
          products.filter(
            (product) => product.collectionId === collectionProductsId
          ).length > 0 ? (
            products
              .filter(
                (product) => product.collectionId === collectionProductsId
              )
              .map((product) => (
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    textAlign: "center",
                  }}
                  key={product._id}
                >
                  <Grid item xs={3} sx={productStyles.gridItem}>
                    <Typography>{product.name}</Typography>
                  </Grid>
                  <Grid item xs={1} sx={productStyles.gridItem}>
                    <Typography sx={productStyles.price}>
                      {product.price}
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sx={productStyles.gridItem}>
                    <Typography sx={productStyles.stock(product.stock)}>
                      {product.stock}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} sx={productStyles.gridItem}>
                    <Typography
                      sx={productStyles.isDisplayed(product.isDisplayed)}
                    >
                      {product.isDisplayed ? "Yes" : "No"}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} sx={productStyles.gridItem}>
                    <Typography
                      sx={productStyles.isFeatured(product.isFeatured)}
                    >
                      {product.isFeatured ? "Yes" : "No"}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sx={productStyles.gridItem}>
                    <Link
                      component={NavLink}
                      to={`/admin/products/edit/${product._id}`}
                      style={productStyles.productOptions}
                    >
                      <Typography>Edit/Delete</Typography>
                    </Link>
                  </Grid>
                </Grid>
              ))
          ) : (
            <Box sx={productStyles.noItems}>
              <Typography>No items within this category</Typography>
            </Box>
          )}
        </Box>
      )}
      <CollectionsModal
        open={open}
        handleClose={handleCloseModal}
        collection={collectionToEdit}
      />
    </Box>
  );
};

export default AdminCollections;
