import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const PageTitle = ({ size, title, color, lineBorder }) => {
  return (
    <Box
      sx={{
        display: "flex", 
        alignItems: "center", 
        width: "100%",
        color: color,
        "&::before, &::after": {
          content: lineBorder ? '""' : "none", 
          flex: 1, 
          borderBottom: "1px solid gray", 
          margin: "15px 30px", 
        },
      }}
    >
      <Typography variant={size}>{title}</Typography>
    </Box>
  );
};

export default PageTitle;
