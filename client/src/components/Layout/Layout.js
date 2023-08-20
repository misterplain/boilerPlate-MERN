import Box from "@mui/material/Box";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { CartDrawerProvider } from "../../context/CartDrawerContext";

const styles = {
  wrapper: (theme) => ({
    // border: "1px solid #000",
    // height: "100vh",
    // width: "100vw",
  }),
};

const Layout = ({ children }) => {
  return (
    <Box sx={styles.wrapper}>
      <CartDrawerProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </CartDrawerProvider>
    </Box>
  );
};

export default Layout;
