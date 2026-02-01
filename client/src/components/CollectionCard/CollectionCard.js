import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Wrapper from "../Wrapper/Wrapper";

import styles from "./styles";

const CollectionCard = ({ collection, productQuantity }) => {

  return (
    <Wrapper width="190px" flexDirection="column" customStyles={styles.cardWrapper}>
      <Box sx={styles.cardImageWrapper}>
        <Box
          component="img"
          sx={styles.image}
          src={collection.image.url}
          alt="alt"
        />
        <Box sx={styles.overlayBox}>
          <Typography sx={styles.name}>{collection.name}</Typography>
          {productQuantity && (
            <Typography sx={styles.length}>
              {collection.products.length} products
            </Typography>
          )}
        </Box>
      </Box>
    </Wrapper>
  );
};

export default CollectionCard;
