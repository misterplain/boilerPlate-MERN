import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormLabel from "@mui/material/FormLabel";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "../../../api/axios";
import {
  createNewCollection,
  updateCollection,
} from "../../../actions/collectionsActions";
import AlertMessage from "../../AlertMessage/AlertMessage";
import { useSnackbar } from "notistack";
import { snackbarDispatch } from "../../../utils/snackbarDispatch";
import { useTheme } from "@mui/material/styles";



const CollectionsModal = ({ open, handleClose, collection, productId }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userAuthState = useSelector((state) => state.userAuth);
  const { enqueueSnackbar } = useSnackbar();
  const token = userAuthState?.accessToken;
  const collectionsState = useSelector((state) => state.collections);
  const { collectionModalError } = collectionsState;
  const [pexelError, setPexelError] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
  });


  const style = (theme) => ({
    position: "absolute",
    top: "30%",
    left: "30%",
    transform: "translate(-30%, -30%)",
    width: "90%",
    height: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    [theme.breakpoints.up("sm")]: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "60%",
      height: "80%",
    },
  })
  

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

      const data = await axios.get(
        "/collection/pexel",
        { params: { name: name } },
        options
      );
      if (data.data.photoUrl) {
        setSelectedFile(data.data.photoUrl);
        setPexelError("");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setPexelError(error.response.data.message || "An error occurred");
      } else {
        setPexelError("An error occurred");
      }
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
                const collectionData = {
                  name: values.name,
                  image: selectedFile,
                };
                if (collection) {
                  snackbarDispatch(
                    dispatch(
                      updateCollection(collection._id, collectionData, token)
                    ),
                    "Edited successfully",
                    "Error creating collection",
                    enqueueSnackbar,
                    [handleClose]
                  );
                } else {
                  snackbarDispatch(
                    dispatch(createNewCollection(collectionData, token)),
                    "Created successfully",
                    "Error creating collection",
                    enqueueSnackbar,
                    [handleClose]
                  );
                }
                if (inputFileRef.current) {
                  inputFileRef.current.value = "";
                }
              }}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                errors,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <FormControl sx={{ marginBottom: "30px" }}>
                    <FormLabel id="name">Collection Name</FormLabel>
                    <FormGroup>
                      <TextField
                        name="name"
                        variant="outlined"
                        color="success"
                        value={values.name}
                        onChange={handleChange}
                        helperText={errors.name}
                      />
                    </FormGroup>
                  </FormControl>
                  <FormControl
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <input
                      ref={inputFileRef}
                      onChange={handleImage}
                      type="file"
                      id="formupload"
                      name="image"
                      style={{ display: "none" }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        onClick={() => {
                          inputFileRef.current.click();
                        }}
                      >
                        Upload Photo
                      </Button>
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
                  {pexelError && (
                    <AlertMessage type="error">{pexelError}</AlertMessage>
                  )}

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
