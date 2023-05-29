import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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

    // <Box>
    //   <Card sx={{ maxWidth: 345 }}>
    //     <Box component="img" src="https://placehold.co/200" />
    //     <CardContent>
    //       <Typography gutterBottom variant="h5" component="div">
    //         {product.name}
    //       </Typography>
    //       <Typography variant="body2" color="text.secondary">
    //         Lizards are a widespread group of squamate reptiles, with over 6,000
    //         species, ranging across all continents except Antarctica
    //       </Typography>
    //     </CardContent>
    //     <CardActions>
    //       <Button size="small">Share</Button>
    //       <Button size="small">Learn More</Button>
    //     </CardActions>
    //   </Card>
    // </Box>
  );
};

export default ProductCard;
