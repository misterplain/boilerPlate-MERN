import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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

import styles from "./styles";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
});

const AdminCollections = () => {
  const dispatch = useDispatch();
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const collectionsList = useSelector((state) => state.collections);
  const { collections } = collectionsList;
  const productsList = useSelector((state) => state.productList);
  const { products } = productsList;
  //get token from state
  const userAuthState = useSelector((state) => state.userAuth);
  const [collectionProductsId, setCollectionProductsId] = useState(null);
  const token = userAuthState?.accessToken;

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.newCollectionWrapper}>
        {!isEditTitle ? (
          <>
            <Typography marginBottom>New Collection</Typography>
            <Formik
              initialValues={{ name: "" }}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                dispatch(createNewCollection(values.name, token));
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlue,
                values,
                isValid,
                errors,
                touched,
              }) => (
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <TextField
                          name="name"
                          label="Name (optional)"
                          variant="outlined"
                          color="secondary"
                          value={values.name}
                          onChange={handleChange}
                          helperText={errors.name}
                        />
                      }
                    />
                  </FormGroup>
                  <Button type="submit">Create</Button>{" "}
                </form>
              )}
            </Formik>
          </>
        ) : (
          <>
            <Typography marginBottom>Edit {collectionName} Title</Typography>
            <Formik
              initialValues={collectionName}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                // dispatch(createNewCollection(values.name, token));
                // console.log("edit collection title", values.name);
                // console.log("collectionProductsId", collectionProductsId);
                // console.log("collection name", collectionName);
                console.log(token);
                setIsEditTitle(false);
                setCollectionName("");
                dispatch(
                  updateCollectionName(values.name, collectionProductsId, token)
                );
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlue,
                values,
                isValid,
                errors,
                touched,
              }) => (
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <TextField
                          name="name"
                          label={collectionName}
                          variant="filled"
                          color="success"
                          placeholder="none"
                          value={values.name}
                          onChange={handleChange}
                          helperText={errors.name}
                        />
                      }
                    />
                  </FormGroup>
                  <Button type="submit">Send Edit</Button>{" "}
                </form>
              )}
            </Formik>
          </>
        )}
      </Box>
      <hr />
      <Box sx={styles.collectionsWrapper}>
        <Typography>Collections</Typography>
        <Box sx={styles.collectionsList}>
          {collectionsList?.collections?.map((collection) => (
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
                    setIsEditTitle(true);
                    setCollectionName(collection.name);
                    setCollectionProductsId(collection._id);
                    console.log(collectionName);
                    console.log(collectionProductsId);
                  }}
                >
                  Edit Name
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
            <Link component={NavLink} to={'/admin/products/new'}>
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
    </Box>
  );
};

export default AdminCollections;
