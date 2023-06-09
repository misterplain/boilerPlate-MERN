import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { newProduct } from "../../../../actions/productActions";

const styles = {
  wrapper: {
    border: "1px solid black",
  },
  imageToUpload: {
    width: "300px",
    height: "auto",
  },
};



const validationSchema = Yup.object({
  collectionId: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  stock: Yup.number().required("Required"),
  description: Yup.string().required("Required"),
});

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const productList = useSelector((state) => state.productList);
  const collectionsState = useSelector((state) => state.collections);
  const { collections } = collectionsState;
  const allCollections = collections.map((collection) => collection);

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
    <Box sx={styles.wrapper}>
      <Formik
        initialValues={{
          collectionId: "",
          isDisplayed: false,
          isFeatured: false,
          name: "",
          price: "",
          stock: "",
          description: "",
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
          };

          dispatch(newProduct(token, productData));
          setSelectedFile(null);
          if (inputFileRef.current) {
            inputFileRef.current.value = '';
          }
          navigate("/admin/collections");
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
            <FormControl sx={{ width: "100%" }}>
              <FormLabel id="collectionName">Collection</FormLabel>
              <RadioGroup
                row
                aria-labelledby="collectionName"
                name="collectionId"
                value={values.collectionId}
                onChange={handleChange}
              >
                {allCollections.map((collection) => (
                  <FormControlLabel
                    value={collection._id}
                    control={<Radio />}
                    label={collection.name}
                    key={collection._id}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <hr></hr>
            <FormControl sx={{ width: "100%" }}>
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
            <hr></hr>
            <FormControl sx={{ width: "100%" }}>
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
            <hr></hr>
            <FormControl>
              <FormLabel id="productName">Product Name</FormLabel>
              <FormGroup>
                <TextField
                  name="name"
                  variant="filled"
                  color="success"
                  value={values.name}
                  onChange={handleChange}
                  helperText={errors.name}
                />
              </FormGroup>
            </FormControl>
            <hr></hr>
            <FormControl>
              <FormLabel id="productPrice">Product Price</FormLabel>
              <FormGroup>
                <TextField
                  name="price"
                  variant="filled"
                  color="success"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  helperText={errors.price}
                />
              </FormGroup>
            </FormControl>
            <hr></hr>
            <FormControl>
              <FormLabel id="productStock">Amount in Stock</FormLabel>
              <FormGroup>
                <TextField
                  name="stock"
                  variant="filled"
                  color="success"
                  type="number"
                  value={values.stock}
                  onChange={handleChange}
                  helperText={errors.stock}
                />
              </FormGroup>
            </FormControl>
            <hr></hr>
            <FormControl>
              <FormLabel id="productDescription">Product Description</FormLabel>
              <FormGroup>
                <TextField
                  name="description"
                  variant="filled"
                  color="success"
                  value={values.description}
                  onChange={handleChange}
                  helperText={errors.description}
                />
              </FormGroup>
            </FormControl>
            <hr></hr>
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
                />
                <label className="form-label" htmlFor="form4Example2">
                  Image
                </label>
              </Box>

              <Box
                sx={styles.imageToUpload}
                component="img"
                src={selectedFile}
                alt=""
              />
            </FormControl>
            <hr></hr>
            <Button type="submit">Create Product</Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default NewProduct;
