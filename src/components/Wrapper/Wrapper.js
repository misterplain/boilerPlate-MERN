import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const Wrapper = ({
  children,
  display,
  flexDirection,
  justifyContent,
  alignItems,
  width,
  gridContainer,
  spacing,
  direction,
  wrap,
  xs,
  sm,
  md,
  lg,
  xl,
  customStyles,
}) => {
  const styles = {
    display: display || "flex",
    flexDirection: flexDirection || "row",
    justifyContent: justifyContent || "flex-start",
    alignItems: alignItems || "stretch",
    flexWrap: wrap || "wrap",
    width: width || "100%",
    spacing: spacing || 0,
    direction: direction || "row",
    wrap: wrap || "wrap",
    ...customStyles,
  };

  if (gridContainer) {
    return (
      <Grid
        container
        spacing={spacing}
        direction={direction}
        wrap={wrap}
        style={styles}
      >
        {children}
      </Grid>
    );
  }

  return <Box style={styles}>{children}</Box>;
};

export default Wrapper;
