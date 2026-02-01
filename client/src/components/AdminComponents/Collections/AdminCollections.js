import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { deleteCollection } from "../../../actions/collectionsActions";
import CollectionsModal from "./CollectionsModal";
import CollectionCard from "../../CollectionCard/CollectionCard";
import Wrapper from "../../Wrapper/Wrapper";
import PageTitle from "../../PageTitle/PageTitle";

const styles = {
  sectionWrapper: {
    margin: "40px 0px",
  },
  nameAndNewWrapper: {
    margin: "0px 0px 10px 10px",
    color: "green",
    fontSize: "20px",
  },
  stock: (stock) => ({
    color: stock > 0 ? "green" : "red",
  }),
  isDisplayed: (isDisplayed) => ({
    color: isDisplayed ? "green" : "red",
  }),
  isFeatured: (isFeatured) => ({
    color: isFeatured ? "green" : "red",
  }),
  gridItem: {
    border: "1px solid grey",
    padding: "5px",
    background: "white",
  },
};

const AdminCollections = () => {
  const dispatch = useDispatch();
  const [collectionName, setCollectionName] = useState("");
  const collectionsState = useSelector((state) => state.collections);
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

  const filteredProducts =
    products &&
    products.filter((product) => product.collectionId === collectionProductsId);

  return (
    <>
      <Wrapper id="pageWrapper" flexDirection="column">
        <Wrapper id="sectionWrapper" customStyles={styles.sectionWrapper}>
          <Wrapper
            id="nameAndNewWrapper"
            justifyContent="space-between"
            customStyles={styles.nameAndNewWrapper}
          >
            {" "}
            <Typography variant="h5">Collections</Typography>{" "}
            <Button
              variant="outlined"
              color="success"
              sx={{ marginRight: "20px" }}
              onClick={() => handleOpenModal()}
            >
              new collection
            </Button>
          </Wrapper>{" "}
          <Wrapper id="collectionCardWrapper" gridContainer>
            {collectionsState?.collections?.map((collection) => (
              <Grid
                item
                xs={6}
                sm={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  alignItems: "center",
                }}
                onClick={() => {
                  setCollectionProductsId(collection._id);
                  setCollectionName(collection.name);
                }}
                key={collection._id}
              >
                <CollectionCard collection={collection} productQuantity />
                <Wrapper id="optionsWrapper" justifyContent="center">
                  {" "}
                  <Button onClick={() => handleOpenModal(collection)}>
                    Edit
                  </Button>
                  {collection.products.length <= 0 && (
                    <Button
                      onClick={() => {
                        dispatch(deleteCollection(collection._id, token));
                      }}
                      color="error"
                      variant="outlined"
                    >
                      Delete
                    </Button>
                  )}
                </Wrapper>{" "}
              </Grid>
            ))}
          </Wrapper>
        </Wrapper>
        {collectionProductsId !== null && (
          <Wrapper id="sectionWrapper" customStyles={styles.sectionWrapper}>
            <Wrapper
              id="nameAndNewWrapper"
              justifyContent="space-between"
              customStyles={styles.nameAndNewWrapper}
            >
              <Typography variant="h5">
                Products within {collectionName} collection
              </Typography>{" "}
              <Box sx={styles.addProductButton}>
                <Link component={NavLink} to={"/admin/addeditproduct"}>
                  <Button
                    variant="outlined"
                    color="success"
                    sx={{ marginRight: "20px" }}
                  >
                    New Product
                  </Button>
                </Link>
              </Box>
            </Wrapper>
            {filteredProducts && filteredProducts.length > 0 ? (
              <>
                {" "}
                <Wrapper id="titlesGrid" gridContainer>
                  {" "}
                  <Grid item xs={3} sx={styles.gridItem}>
                    <Typography>Name</Typography>
                  </Grid>
                  <Grid item xs={1} sx={styles.gridItem}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={1} sx={styles.gridItem}>
                    <Typography>Stock</Typography>
                  </Grid>
                  <Grid item xs={2} sx={styles.gridItem}>
                    <Typography>isDisplayed</Typography>
                  </Grid>
                  <Grid item xs={2} sx={styles.gridItem}>
                    <Typography>isFeatured</Typography>
                  </Grid>
                  <Grid item xs={3} sx={styles.gridItem}>
                    <Typography>Actions</Typography>
                  </Grid>
                </Wrapper>
                {filteredProducts.map((product) => (
                  <Wrapper id="productsGrid" gridContainer key={product._id}>
                    {" "}
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
                        to={`/admin/addeditproduct/${product._id}`}
                        style={styles.productOptions}
                      >
                        <Typography>Edit/Delete</Typography>
                      </Link>
                    </Grid>
                  </Wrapper>
                ))}
              </>
            ) : (
<PageTitle title="No products in this collection" size="h6" lineBorder />
            )}
          </Wrapper>
        )}
      </Wrapper>

      <CollectionsModal
        open={open}
        handleClose={handleCloseModal}
        collection={collectionToEdit}
      />
    </>
  );
};

export default AdminCollections;
