import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { fetchPexel } from "../../../actions/collectionsActions";
import axios from "../../../api/axios";
import {
  createNewCollection,
  updateCollection,
  deleteCollection,
} from "../../../actions/collectionsActions";
import AlertMessage from "../../AlertMessage/AlertMessage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const styles = {
  imageToUpload: {
    width: "40%",
    height: "auto",
  },
};

const CollectionsModal = ({ open, handleClose, collection, productId }) => {
  const dispatch = useDispatch();
  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const token = userAuthState?.accessToken;
  const userDetailsState = useSelector((state) => state.userDetails);
  const userDetails = userDetailsState?.userDetails || {};
  const { userId } = userDetails;
  const collectionsState = useSelector((state) => state.collections);
  const { photoUrl, photoId, collectionModalError } = collectionsState;

  const reviewsState = useSelector((state) => state.reviews);
  const { reviews } = reviewsState || {};

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
  });

  useEffect(() => {
    if (collection && collection.image && collection.image.url) {
      setSelectedFile(collection.image.url);
    } else {
      setSelectedFile(null);
    }
  }, [collection]);

  //photo upload
  const [selectedFile, setSelectedFile] = useState(
    collection ? collection?.image?.url : null
  );
  const inputFileRef = useRef();
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
  };

  //fetch pexel
  const fetchPexelImage = async (token, name) => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(name);

      const data = await axios.get(
        "/collection/pexel",
        { params: { name: name } },
        options
      );
      setSelectedFile(data.data.photoUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        {collectionModalError && (
        <AlertMessage type="error">{collectionModalError}</AlertMessage>
      )}
          <Box>
            <Formik
              initialValues={{
                name: collection ? collection.name : "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                console.log("onsubmit triggered");
                const collectionData = {
                  name: values.name,
                  image: selectedFile,
                };
                if (collection) {
                  console.log("update collection triggered");
                  await dispatch(
                    updateCollection(collection._id, collectionData, token)
                  );
                  handleClose();
                } else {
                  console.log("add collection triggered");
                  await dispatch(createNewCollection(collectionData, token));
                  handleClose();
                }
                // setSelectedFile(null);
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
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <FormControl>
                    <FormLabel id="name">Collection Name</FormLabel>
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
                  <FormControl sx={{ width: "80%" }}>
                    <FormLabel id="images">New Image</FormLabel>
                    <Box>
                      {" "}
                      <input
                        ref={inputFileRef}
                        onChange={handleImage}
                        type="file"
                        id="formupload"
                        name="image"
                        placeholder="test"
                        className="form-control"
                      />
                    </Box>
                    <Button onClick={() => fetchPexelImage(token, values.name)}>
                      FETCH FROM PEXEL BASED ON COLLECTION NAME
                    </Button>
                    {selectedFile && (
                      <img
                        src={selectedFile}
                        alt="Selected"
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "contain",
                        }}
                      />
                    )}
                  </FormControl>

                  <Button
                    type="submit"
                    disabled={!selectedFile || !values.name}
                  >
                    Submit
                  </Button>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CollectionsModal;
