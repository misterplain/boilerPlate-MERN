import React, { useState, useRef } from "react";
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
  const { photoUrl, photoId } = collectionsState;

  const reviewsState = useSelector((state) => state.reviews);
  const { reviews } = reviewsState || {};

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
  });

  //photo upload
  const [selectedFile, setSelectedFile] = useState(null);
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
          <Box>
            <Formik
              initialValues={{
                name: collection ? collection.name : "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                const collectionData = {
                  name: values.name,
                };
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

                  <Button type="submit">Submit</Button>
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
