import React, {useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../Wrapper/Wrapper";
import PageTitle from "../../PageTitle/PageTitle";
import Button from "@mui/material/Button";
import Avatar from "../../Avatar/Avatar";
import EditAccountModal from "./EditAccountModal";

const AccountDetails = () => {
  const userDetailsState = useSelector((state) => state.userDetails);
  const userDetails = userDetailsState?.userDetails || {};

  //modal
  const [open, setOpen] = useState(false);

  const handleOpenModal = (collection) => {
    console.log(open);
    // setCollectionToEdit(collection);
    setOpen(true);
  };

  const handleCloseModal = () => {
    // setCollectionToEdit(null);
    setOpen(false);
  };
  return (
    <Wrapper justifyContent="center" flexDirection="column" alignItems="center">
      <PageTitle title="Profile Details" size="h4" color="purple" lineBorder />
      <Button onClick={()=>handleOpenModal()}>Edit Profile</Button>
      {userDetails && (
        <Box
          sx={{
            height: "300px",
            width: "300px",
            padding: "0px",
            margin: "30px",
          }}
        >
          {" "}
          <Avatar item={userDetails} />
        </Box>
      )}
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography>Username: {userDetails.username}</Typography>
        <Typography>Email: {userDetails.email}</Typography>
      </Box>
      <EditAccountModal
        open={open}
        handleClose={handleCloseModal}
        // collection={collectionToEdit}
        userDetails={userDetails}
      />
    </Wrapper>
  );
};

export default AccountDetails;
