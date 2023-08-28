import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextAreaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AlertMessage from "../../AlertMessage/AlertMessage";
import {
  editProduct,
  deleteImage,
  deleteProduct,
  newProduct,
} from "../../../actions/productActions";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { snackbarDispatch } from "../../../utils/snackbarDispatch";
import Wrapper from "../../Wrapper/Wrapper";

const styles = {
  imageToUpload: {
    width: "300px",
    height: "auto",
  },
  sectionWrapper: {
    borderBottom: "1px solid grey",
    marginBottom: "30px",
    paddingBottom: "30px",
  },
  existingImagesWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  existingImages: {
    width: "100px",
    height: "auto",
  },
  deleteButton: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  stock: Yup.number().required("Required"),
  description: Yup.string().required("Required"),
});

const AddEditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const { productId } = useParams();
  const [isEdit, setIsEdit] = useState(productId ? true : false);

  const productList = useSelector((state) => state.productList);
  const { products, error } = productList;
  const collectionsState = useSelector((state) => state.collections);
  const { collections } = collectionsState || [];
  const product = products?.find((product) => product?._id === productId);
  const initialCollection = collections?.find(
    (collection) => collection?._id === product?.collectionId
  );
  const allCollections = collections?.map((collection) => collection);

  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;

  const [selectedFile, setSelectedFile] = useState(null);

  const inputFileRef = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
  };

  return (
    <Wrapper
      id="pageWrapper"
      flexDirection="column"
      customStyles={{
        margin: "30px",
      }}
    >
      {error && <AlertMessage type="error">{error}</AlertMessage>}
      {isEdit && (
        <Wrapper id="buttonWrapper" justifyContent="center">
          {" "}
          <Button
            onClick={async () => {
              snackbarDispatch(
                dispatch(deleteProduct(product._id, token)),
                "Product deleted successfully",
                "Error deleting item",
                enqueueSnackbar,
                [() => navigate("/admin/products")]
              );
            }}
            variant="outlined"
            color="error"
          >
            Delete Product
          </Button>
        </Wrapper>
      )}
      <Formik
        initialValues={{
          collectionId: isEdit ? initialCollection?._id : "",
          isDisplayed: isEdit ? product?.isDisplayed.toString() : "false",
          isFeatured: isEdit ? product?.isFeatured.toString() : "false",
          name: isEdit ? product?.name : "",
          price: isEdit ? product?.price : "",
          stock: isEdit ? product?.stock : "",
          description: isEdit ? product?.description : "",
          onSale: isEdit ? product?.onSale.toString() : "false",
          salePrice: isEdit ? product?.salePrice : "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          const productData = {
            collectionId: values.collectionId,
            isDisplayed: values.isDisplayed === "true" ? true : false,
            isFeatured: values.isFeatured === "true" ? true : false,
            name: values.name,
            price: values.price,
            stock: values.stock,
            description: values.description,
            images: selectedFile,
            onSale: values.onSale === "true" ? true : false,
            salePrice: values.salePrice,
          };
          {
            isEdit
              ? snackbarDispatch(
                  dispatch(editProduct(productId, token, productData)),
                  "Product edited successfully",
                  "Error editing product",
                  enqueueSnackbar,
                  [() => navigate("/admin/collections")]
                )
              : snackbarDispatch(
                  dispatch(newProduct(token, productData)),
                  "Product created successfully",
                  "Error creating product",
                  enqueueSnackbar,
                  [() => navigate("/admin/collections")]
                );
          }

          setSelectedFile(null);
          if (inputFileRef.current) {
            inputFileRef.current.value = "";
          }
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
            <FormControl
              sx={{
                width: "100%",
                borderBottom: "1px solid grey",
                margin: "30px 0px",
                textAlign: "center",
              }}
            >
              <FormLabel id="collectionName">Collection</FormLabel>
              <RadioGroup
                row
                aria-labelledby="collectionName"
                name="collectionId"
                value={values.collectionId}
                onChange={handleChange}
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                {allCollections &&
                  allCollections?.map((collection) => (
                    <FormControlLabel
                      value={collection._id}
                      control={<Radio />}
                      label={collection.name}
                      key={collection._id}
                    />
                  ))}
              </RadioGroup>
            </FormControl>
            <Wrapper
              id="isOptionsWrapper"
              justifyContent="space-around"
              customStyles={styles.sectionWrapper}
            >
              {" "}
              <FormControl>
                <FormLabel id="available">Available on Site</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="isDisplayed"
                  name="isDisplayed"
                  value={values.isDisplayed}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="available">Is a Featured Product</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="isFeatured"
                  name="isFeatured"
                  value={values.isFeatured}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </Wrapper>
            <Wrapper
              id="detailsWrapper"
              justifyContent="space-around"
              alignItems="center"
              customStyles={styles.sectionWrapper}
            >
              {" "}
              <FormControl>
                <FormLabel id="productName">Product Name</FormLabel>
                <FormGroup>
                  <TextField
                    name="name"
                    variant="outlined"
                    color="success"
                    placeholder={product?.name}
                    value={values.name}
                    onChange={handleChange}
                    helperText={errors.name}
                  />
                </FormGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="productPrice">Product Price</FormLabel>
                <FormGroup>
                  <TextField
                    name="price"
                    variant="outlined"
                    color="success"
                    type="number"
                    value={values.price}
                    onChange={handleChange}
                    helperText={errors.price}
                  />
                </FormGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="productStock">Amount in Stock</FormLabel>
                <FormGroup>
                  <TextField
                    name="stock"
                    variant="outlined"
                    color="success"
                    type="number"
                    value={values.stock}
                    onChange={handleChange}
                    helperText={errors.stock}
                  />
                </FormGroup>
              </FormControl>
            </Wrapper>
            <Wrapper
              id="onSaleWrapper"
              justifyContent="space-around"
              customStyles={styles.sectionWrapper}
            >
              {" "}
              <FormControl>
                <FormLabel id="available">On Sale</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="onSale"
                  name="onSale"
                  value={String(values.onSale)}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="salePrice">Sale Price</FormLabel>
                <FormGroup>
                  <TextField
                    name="salePrice"
                    variant="outlined"
                    color="success"
                    type="number"
                    value={values.salePrice}
                    onChange={handleChange}
                    helperText={errors.salePrice}
                    disabled={values.onSale === "false"}
                  />
                </FormGroup>
              </FormControl>
            </Wrapper>
            <Wrapper
              id="descriptionWrapper"
              justifyContent="center"
              customStyles={styles.sectionWrapper}
            >
              <FormLabel id="productDescription">Product Description</FormLabel>
              <FormGroup sx={{ width: "80%" }}>
                <TextAreaAutosize
                  name="description"
                  variant="filled"
                  color="success"
                  value={values.description}
                  onChange={handleChange}
                  style={{ width: "100%", height: "200px" }}
                />
              </FormGroup>
            </Wrapper>
            <Wrapper
              id="imagesWrapper"
              customStyles={{
                borderBottom: "1px solid grey",
              }}
            >
              <Wrapper id="newImageWrapper" customStyles={{ width: "50%" }}>
                {" "}
                <FormControl>
                  <FormLabel id="images">New Image</FormLabel>
                  <Box>
                    {" "}
                    <input
                      ref={inputFileRef}
                      onChange={handleImage}
                      type="file"
                      id="formupload"
                      name="image"
                      className="form-control"
                      style={{ display: "none" }}
                    />
                    <Box>
                      <Button
                        onClick={() => {
                          inputFileRef.current.click();
                        }}
                        variant="outlined"
                        color="success"
                      >
                        Upload Photo
                      </Button>
                    </Box>
                  </Box>

                  <Box
                    sx={styles.imageToUpload}
                    component="img"
                    src={selectedFile}
                    alt=""
                  />
                </FormControl>
              </Wrapper>
              <Wrapper
                id="existingImagesWrapper"
                customStyles={{ width: "50%" }}
              >
                {" "}
                {isEdit ? (
                  <Box>
                    <Typography>Existing Images</Typography>
                    {product &&
                      product?.images?.map((image) => (
                        <Box sx={styles.existingImagesWrapper}>
                          <Box
                            sx={styles.existingImages}
                            component="img"
                            src={image.url}
                            alt=""
                          />
                          <Button
                            style={{ width: "100px", display: "block" }}
                            onClick={() => {
                              console.log(image);
                              dispatch(deleteImage(productId, token, image));
                            }}
                          >
                            <AiOutlineDelete />
                          </Button>
                        </Box>
                      ))}
                  </Box>
                ) : null}
              </Wrapper>
            </Wrapper>
            <hr></hr>
            <Button type="submit" variant="outlined" color="secondary">
              {isEdit ? "Send Edit" : "Create Product"}
            </Button>{" "}
          </form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default AddEditProduct;
