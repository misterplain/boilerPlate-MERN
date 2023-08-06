import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { deleteCollection } from "../../../actions/collectionsActions";
import CollectionsModal from "./CollectionsModal";
import AlertMessage from "../../AlertMessage/AlertMessage";
import CollectionCard from "../../CollectionCard/CollectionCard";
import { snackbarDispatch } from "../../../utils/snackbarDispatch";
import { enqueueSnackbar } from "notistack";
// import { collectionStyles, productStyles } from "./styles";

import styles from "./styles";

const AdminCollections = () => {
  const dispatch = useDispatch();
  const [collectionName, setCollectionName] = useState("");
  const collectionsState = useSelector((state) => state.collections);
  const { collections, error } = collectionsState;
  const productsList = useSelector((state) => state.productList);
  const { products } = productsList;
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
    <>
      <Box sx={styles.pageWrapper}>
        <Box sx={styles.sectionWrapper}>
          <Box sx={styles.nameAndNewWrapper}>
            {" "}
            <Typography sx={{ marginLeft: "20px" }}>
              Collections
            </Typography>{" "}
            <Button
              variant="outlined"
              color="success"
              sx={{ marginRight: "20px" }}
              onClick={() => handleOpenModal()}
            >
              new collection
            </Button>
          </Box>
          <Grid container>
            {collectionsState?.collections?.map((collection) => (
              <Grid
                item
                xs={12}
                sm={4}
                onClick={() => {
                  setCollectionProductsId(collection._id);
                  setCollectionName(collection.name);
                }}
              >
                <CollectionCard collection={collection} productQuantity />
              </Grid>
            ))}
          </Grid>
        </Box>{" "}
        {collectionProductsId !== null && (
          <Box sx={styles.sectionWrapper}>
            <Box sx={styles.nameAndNewWrapper}>
              <Typography sx={{ marginLeft: "20px" }}>
                Products within {collectionName} collection
              </Typography>{" "}
              <Box sx={styles.addProductButton}>
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
                    <Grid item xs={3} sx={styles.gridItem}>
                      <Typography>{product.name}</Typography>
                    </Grid>
                    <Grid item xs={1} sx={styles.gridItem}>
                      <Typography sx={styles.price}>{product.price}</Typography>
                    </Grid>
                    <Grid item xs={1} sx={styles.gridItem}>
                      <Typography sx={styles.stock(product.stock)}>
                        {product.stock}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sx={styles.gridItem}>
                      <Typography sx={styles.isDisplayed(product.isDisplayed)}>
                        {product.isDisplayed ? "Yes" : "No"}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sx={styles.gridItem}>
                      <Typography sx={styles.isFeatured(product.isFeatured)}>
                        {product.isFeatured ? "Yes" : "No"}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} sx={styles.gridItem}>
                      <Link
                        component={NavLink}
                        to={`/admin/products/edit/${product._id}`}
                        style={styles.productOptions}
                      >
                        <Typography>Edit/Delete</Typography>
                      </Link>
                    </Grid>
                  </Grid>
                ))
            ) : (
              <Box sx={styles.noItems}>
                <Typography>No items within this category</Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default AdminCollections;
