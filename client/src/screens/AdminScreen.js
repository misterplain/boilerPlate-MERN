import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AdminCollections from "../components/AdminComponents/Collections/AdminCollections";
import AdminProducts from "../components/AdminComponents/Products/AdminProducts";
import AdminUsers from "../components/AdminComponents/Users/AdminUsers";
import AdminOrders from "../components/AdminComponents/Orders/AdminOrders";
import AdminReviews from "../components/AdminComponents/Reviews/AdminReviews";

const styles = {
  buttonsWrapper: {
    border: "1px solid black",
  },
};

const adminButtons = [
  {
    name: "All Collections",
    link: "/admin/collections",
    component: "Collections",
  },
  {
    name: "All Products",
    link: "/admin/products",
    component: "Products",
  },
  {
    name: "All Users",
    link: "/admin/users",
    component: "Users",
  },
  {
    name: "All Orders",
    link: "/admin/orders",
    component: "Orders",
  },
  {
    name: "All Reviews",
    link: "/admin/reviews",
    component: "Reviews",
  },
];

const componentMap = {
  Collections: AdminCollections,
  Products: AdminProducts,
  Users: AdminUsers,
  Orders: AdminOrders,
  Reviews: AdminReviews,
};

const AdminScreen = () => {
  const [currentComponent, setCurrentComponent] = useState("Collections");

  const Component = componentMap[currentComponent];

  return (
    <Grid container>
      <Grid item xs={12} md={4} sx={{display: "flex", justifyContent: "space-around"}}>
        <Box sx={styles.buttonsWrapper}>
          {adminButtons.map((button) => (
            <Box key={button.name}>
              <Button onClick={() => setCurrentComponent(button.component)}>
                {button.name}
              </Button>
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} md={7}>
        <Component />
      </Grid>
    </Grid>
  );
};

export default AdminScreen;
