import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import {
  createNewCollection,
  updateCollectionName,
  deleteCollection,
} from "../../../actions/collectionsActions";
import { deleteProduct } from "../../../actions/productActions";
import CollectionsModal from "./CollectionsModal";
import AlertMessage from "../../AlertMessage/AlertMessage";
import { SnackbarProvider, useSnackbar } from 'notistack';

import styles from "./styles";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
});

const AdminCollections = () => {
  const dispatch = useDispatch();
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const collectionsState = useSelector((state) => state.collections);
  const { collections, error } = collectionsState;
  const productsList = useSelector((state) => state.productList);
  const { products } = productsList;
  //get token from state
  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;
  const [collectionProductsId, setCollectionProductsId] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  //modal state

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

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('This is a success message!', { variant });
  };

  return (
    <Box sx={styles.wrapper}>
      {error && <AlertMessage type="error">{error}</AlertMessage>}

      <Button onClick={handleClickVariant("success")}>
        Show success snackbar
      </Button>
      <Box sx={styles.newCollectionWrapper}>
        <Button onClick={() => handleOpenModal()}>new collection</Button>
      </Box>
      <hr />
      <Box sx={styles.collectionsWrapper}>
        <Typography>Collections</Typography>
        <Box sx={styles.collectionsList}>
          {collectionsState?.collections?.map((collection) => (
            <Box key={collection._id} sx={styles.collectionName}>
              <Button
                onClick={() => {
                  setCollectionProductsId(collection._id);
                  setCollectionName(collection.name);
                }}
              >
                {collection.name} - {collection.products.length} products
              </Button>
              <Box sx={styles.optionsWrapper}>
                <Button
                  onClick={() => {
                    handleOpenModal(collection);
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    dispatch(deleteCollection(collection._id, token));
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <hr />

      {collectionProductsId !== null && (
        <Box sx={styles.productsWrapper}>
          <Typography>Products within {collectionName} Collection</Typography>
          <Box sx={styles.addProductButton}>
            <Link component={NavLink} to={"/admin/products/new"}>
              <Button>New Product</Button>
            </Link>
          </Box>
          <Box sx={styles.productsList}>
            {products &&
            products.filter(
              (product) => product.collectionId === collectionProductsId
            ).length > 0 ? (
              products
                .filter(
                  (product) => product.collectionId === collectionProductsId
                )
                .map((product) => (
                  <Box sx={styles.productName} key={product._id}>
                    <Link component={NavLink} to={`/product/${product._id}`}>
                      <Button sx={styles.productLink}>{product.name}</Button>
                    </Link>

                    <Box sx={styles.productOptions}>
                      <Link
                        component={NavLink}
                        to={`/admin/products/edit/${product._id}`}
                      >
                        <Button>Edit Product</Button>
                      </Link>
                      <Button
                        onClick={() => {
                          dispatch(deleteProduct(product._id, token));
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                ))
            ) : (
              <Box sx={styles.noItems}>
                {" "}
                <Typography>No items within this category</Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}
      <CollectionsModal
        open={open}
        handleClose={handleCloseModal}
        collection={collectionToEdit}
        // productId={productId}
      />
    </Box>
  );
};

export default AdminCollections;
