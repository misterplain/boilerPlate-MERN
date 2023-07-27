import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import Google from "../../img/google.png";
import Facebook from "../../img/facebook.png";
import Github from "../../img/github.png";
import { loginOAuthAndSyncCart } from "../../actions/authActions";

const styles = {
  loginButton: {
    padding: "10px 25px",
    borderRadius: "5px",
    color: "white",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon: {
    marginRight: "10px",
  },
};

const OAuthOptions = () => {
  const dispatch = useDispatch();

  const shoppingCartState = useSelector((state) => state.shoppingCart);
  const { cartItems } = shoppingCartState;

  const handleSubmit = (provider) => {
    dispatch(loginOAuthAndSyncCart(provider, cartItems));
  };

  return (
    <>
      <Box
        sx={styles.loginButton}
        style={{ backgroundColor: "#df4930" }}
        onClick={() => handleSubmit("google")}
      >
        <Box component="img" src={Google} alt="" sx={styles.socialIcon} />
        <Typography variant="body1">Google</Typography>
      </Box>{" "}
      {/* leaving Facebook login for later as it requires a business account/privacy policy URL in order to access the users email address */}
      {/* <Box
        sx={styles.loginButton}
        style={{ backgroundColor: "#507cc0" }}
        onClick={() => handleSubmit("facebook")}
      >
        <Box component="img" src={Facebook} alt="" sx={styles.socialIcon} />
        <Typography variant="body1"> Facebook</Typography>
      </Box> */}
      <Box
        sx={styles.loginButton}
        style={{ backgroundColor: "#000" }}
        onClick={() => handleSubmit("github")}
      >
        <Box component="img" src={Github} alt="" sx={styles.socialIcon} />
        <Typography variant="body1">Github</Typography>
      </Box>
    </>
  );
};

export default OAuthOptions;
