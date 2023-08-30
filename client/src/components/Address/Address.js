import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const styles = {
  wrapper: {
    border: "1px solid black",
    borderRadius: "10px",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    width: "auto",
  },
};

const Address = ({address, email}) => {
  return (
    <Box sx={styles.wrapper}>
      <Typography variant="body1">{address.street}</Typography>
      <Typography variant="body1">{address.city}, {address.postalCode}</Typography>
      {/* <Typography variant="body1">{address.postalCode}</Typography> */}
      <Typography variant="body1">{address.country}</Typography>
      <Typography variant="body1" sx={{color: "green"}}>
        {address.isDefault ? "Default" : ""}
      </Typography>
      {email && <Typography variant="body1" sx={{margin: "15px 0px 0px 0px", color:"purple"}}>{email}</Typography>}
    </Box>
  );
};

export default Address;
