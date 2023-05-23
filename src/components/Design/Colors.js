import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
  },
  beige: (theme) => ({
    background: theme.palette.beige.main,
    height: "100px",
    width: "100px",
  }),
  dijon: (theme) => ({
    background: theme.palette.dijon.main,
    height: "100px",
    width: "100px",
  }),
  darkGreen: (theme) => ({
    background: theme.palette.darkGreen.main,
    height: "100px",
    width: "100px",
  }),
  lightGreen: (theme) => ({
    background: theme.palette.lightGreen.main,
    height: "100px",
    width: "100px",
  }),
  burgundy: (theme) => ({
    background: theme.palette.burgundy.main,
    height: "100px",
    width: "100px",
  }),
  pink: (theme) => ({
    background: theme.palette.pink.main,
    height: "100px",
    width: "100px",
  }),
};

const Colors = () => {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.colorWrapper}>
        <Box sx={styles.beige} />
        <Typography>beige</Typography>
      </Box>
      <Box sx={styles.colorWrapper}>
        <Box sx={styles.dijon} />
        <Typography>dijon</Typography>
      </Box>
      <Box sx={styles.colorWrapper}>
        <Box sx={styles.darkGreen} />
        <Typography>darkGreen</Typography>
      </Box>
      <Box sx={styles.colorWrapper}>
        <Box sx={styles.lightGreen} />
        <Typography>lightGreen</Typography>
      </Box>
      <Box sx={styles.colorWrapper}>
        <Box sx={styles.burgundy} />
        <Typography>burgundy</Typography>
      </Box>
      <Box sx={styles.colorWrapper}>
        <Box sx={styles.pink} />
        <Typography>pink</Typography>
      </Box>
    </Box>
  );
};

export default Colors;
