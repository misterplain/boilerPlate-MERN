import Box from "@mui/material/Box";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { CartDrawerProvider } from "../../context/CartDrawerContext";

const styles = {
  wrapper: (theme) => ({
    display: "flex",
    flexDirection: "column",
  }),
};

const Layout = ({ children }) => {
  return (
    <CartDrawerProvider>
      <Box sx={styles.wrapper}>
        <Header />
        <Box sx={{ minHeight: "100vh" }}>{children}</Box>
        <Footer />
      </Box>{" "}
    </CartDrawerProvider>
  );
};

export default Layout;
