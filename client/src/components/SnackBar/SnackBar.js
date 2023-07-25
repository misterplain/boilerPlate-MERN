import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { removeSnackbar, setSnackbarKey } from "../../actions/snackbarActions";
import { useSnackbar } from "notistack";

const SnackBar = () => {
  const dispatch = useDispatch();
  const snackbarState = useSelector((state) => state.snackbar);
  const { enqueueSnackbar } = useSnackbar();
  const displayedSnackbars = useRef([]);

  useEffect(() => {
    snackbarState.forEach((snackbar) => {
      if (!displayedSnackbars.current.includes(snackbar.id)) {
        const key = enqueueSnackbar(snackbar.message, {
          variant: snackbar.severity,
          autoHideDuration: 2000,
          onClose: (event, reason, key) => {
            if (reason === "clickaway") {
              return;
            }
            dispatch(removeSnackbar(key));
          },
        });
        dispatch(setSnackbarKey(snackbar.id, key));
        displayedSnackbars.current.push(snackbar.id);
      }
    });
    displayedSnackbars.current = displayedSnackbars.current.filter((id) =>
      snackbarState.find((snackbar) => snackbar.id === id)
    );
  }, [snackbarState, enqueueSnackbar, dispatch]);

  return null;
};

export default SnackBar;
