import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
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
import { SnackbarProvider, useSnackbar } from "notistack";

import { collectionStyles, productStyles } from "./styles";

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
    enqueueSnackbar("This is a success message!", { variant });
  };

  return (
    <Box sx={collectionStyles.wrapper}>
      {error && <AlertMessage type="error">{error}</AlertMessage>}
      <Box sx={collectionStyles.newCollectionWrapper}>
        <Button onClick={() => handleOpenModal()}>new collection</Button>
      </Box>
      <hr />
      <Box sx={collectionStyles.collectionsWrapper}>
        <Typography>Collections</Typography>
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
        <Box sx={productStyles.productsWrapper}>
          <Typography>Products within {collectionName} Collection</Typography>
          {/* <Box sx={productStyles.addProductButton}>
            <Link component={NavLink} to={"/admin/products/new"}>
              <Button>New Product</Button>
            </Link>
          </Box> */}
          <Box sx={productStyles.list}>
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
                      justifyContent: "space-between",
                      alignItems: "center",
                      border: "1px solid black",
                    }}
                    key={product._id}
                  >
                    <Grid item xs={2} md={2} marginLeft>
                      <Typography>{product.name}</Typography>
                    </Grid>
                    <Grid item xs={3} md={2}>
                      <Box sx={productStyles.stock}>
                        <Typography>{product.stock} in stock</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={3} md={2}>
                      <Box sx={productStyles.isDisplayed}>
                        <Typography>
                          {product.isDisplayed ? "Displayed" : "Not Displayed"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={3} md={2}>
                      <Box sx={productStyles.isFeatured}>
                        <Typography>
                          {product.isFeatured ? "Featured" : "Not Featured"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={3} md={2}>
                      <Box sx={productStyles.productOptions}>
                        <Link
                          component={NavLink}
                          to={`/admin/products/edit/${product._id}`}
                        >
                          <Button>View/Edit</Button>
                        </Link>
                        {/* <Button
                         onClick={() => {
                           dispatch(deleteProduct(product._id, token));
                         }}
                       >
                         Delete
                       </Button> */}
                      </Box>
                    </Grid>
                  </Grid>
                  // <Box sx={productStyles.productName} key={product._id}>
                  //   <Link component={NavLink} to={`/product/${product._id}`}>
                  //     <Button sx={productStyles.productLink}>
                  //       {product.name}
                  //     </Button>
                  //   </Link>
                  //   <Box sx={productStyles.stock}>
                  //     <Typography>{product.stock} in stock</Typography>
                  //   </Box>
                  //   <Box sx={productStyles.isDisplayed}>
                  //     <Typography>
                  //       {product.isDisplayed ? "Displayed" : "Not Displayed"}
                  //     </Typography>
                  //   </Box>
                  //   <Box sx={productStyles.isFeatured}>
                  //     <Typography>
                  //       {product.isFeatured ? "Featured" : "Not Featured"}
                  //     </Typography>
                  //   </Box>
                  //   <Box sx={productStyles.productOptions}>
                  //     <Link
                  //       component={NavLink}
                  //       to={`/admin/products/edit/${product._id}`}
                  //     >
                  //       <Button>View/Edit</Button>
                  //     </Link>
                  //     {/* <Button
                  //       onClick={() => {
                  //         dispatch(deleteProduct(product._id, token));
                  //       }}
                  //     >
                  //       Delete
                  //     </Button> */}
                  //   </Box>
                  // </Box>
                ))
            ) : (
              <Box sx={productStyles.noItems}>
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
