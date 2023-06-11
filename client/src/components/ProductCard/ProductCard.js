import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const styles = {
  wrapper: {
    border: "1px solid black",
  },
};

const ProductCard = ({ product }) => {
  return (
    <Box sx={styles.cardWrapper}>
      <Box
        sx={styles.cardImage}
        component="img"
        src="https://placehold.co/200"
      />
      <Box sx={styles.namePriceWrapper}>
        <Typography sx={styles.name} variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography sx={styles.price} variant="h5" component="div">
          ${product.price}
        </Typography>
      </Box>
      <Box sx={styles.iconsWrapper}>
        <Button sx={styles.button} size="small">
          Like
        </Button>
        <Button sx={styles.button} size="small">
          Favorite
        </Button>
        <Button sx={styles.button} size="small">
          Add to Cart
        </Button>
      </Box>
    </Box>

  );
};

export default ProductCard;
