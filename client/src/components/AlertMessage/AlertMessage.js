import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const AlertMessage = ({ type, children }) => {
  if (
    type !== "success" &&
    type !== "error" &&
    type !== "warning" &&
    type !== "info"
  ) {
    type = "error";
  }
  return (
    <Stack sx={{ width: "100%", margin: "20px 0" }} spacing={2}>
      <Alert severity={type}>
        <AlertTitle sx={{ textTransform: "capitalize" }}>{type}</AlertTitle>
        {children}
      </Alert>
    </Stack>
  );
};

export default AlertMessage;
