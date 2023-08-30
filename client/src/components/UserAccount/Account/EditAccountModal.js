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
import {updateProfile } from "../../../actions/userActions";
import AlertMessage from "../../AlertMessage/AlertMessage";
import { useSnackbar } from "notistack";
import { snackbarDispatch } from "../../../utils/snackbarDispatch";
import Avatar from "../../Avatar/Avatar";

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

const EditAccountModal = ({ open, handleClose, userDetails }) => {
  console.log(userDetails);
  const dispatch = useDispatch();
  const userAuthState = useSelector((state) => state.userAuth);
  const { enqueueSnackbar } = useSnackbar();
  const token = userAuthState?.accessToken;
  const collectionsState = useSelector((state) => state.collections);
  const { collectionModalError } = collectionsState;
  const [pexelError, setPexelError] = useState("");

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
  });

  //   useEffect(() => {
  //     if (collection && collection.image && collection.image.url) {
  //       setSelectedFile(collection.image.url);
  //     } else {
  //       setSelectedFile(null);
  //     }
  //   }, [collection]);

  //photo upload
  const [selectedFile, setSelectedFile] = useState(
    userDetails?.userAvatar?.url ? userDetails?.userAvatar?.url : null
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
                username: userDetails?.username,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                const profileData = {
                  username: values.username,
                  image: selectedFile,
                };
                await snackbarDispatch(
                  dispatch(updateProfile(token, profileData)),
                  "Profile edited successfully",
                  "Error editing profile",
                  enqueueSnackbar,
                  [handleClose]
                );

                if (inputFileRef.current) {
                  inputFileRef.current.value = "";
                }
              }}
            >
              {({ handleSubmit, handleChange, values, errors }) => (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
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
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        onClick={() => {
                          inputFileRef.current.click();
                        }}
                      >
                        Upload Photo
                      </Button>{" "}
                      {!selectedFile && (
                        <Box
                          sx={{
                            width: "300px",
                            height: "300px",
                          }}
                        >
                          <Avatar item={userDetails} />
                        </Box>
                      )}
                      {selectedFile && (
                        <img
                          src={selectedFile}
                          alt="Selected"
                          style={{
                            width: "300px",
                            height: "300px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </Box>
                    {/* <Button onClick={() => fetchPexelImage(token, values.name)}>
                      FETCH FROM PEXEL BASED ON COLLECTION NAME
                    </Button> */}
                  </FormControl>
                  <FormControl sx={{ marginBottom: "10px" }}>
                    <FormLabel id="username">Username</FormLabel>
                    <FormGroup>
                      <TextField
                        name="username"
                        variant="outlined"
                        color="success"
                        value={values.username}
                        onChange={handleChange}
                        helperText={errors.username}
                      />
                    </FormGroup>
                  </FormControl>

                  <Button
                    type="submit"
        
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

export default EditAccountModal;