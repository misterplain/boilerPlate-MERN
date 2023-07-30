import Box from "@mui/material/Box";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { CartDrawerProvider } from "../../context/CartDrawerContext";

import styles from "./styles";

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
