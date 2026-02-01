import React from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          marginTop: "40px"
        }}
      >
        <CircularProgress color="inherit" />
      </Grid>
    </Grid>
  );
};

export default Loading;