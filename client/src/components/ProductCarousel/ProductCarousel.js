import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import { Box, Grid, Button } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import styles from "./styles";

const ProductCarousel = ({ product }) => {
  const theme = useTheme();
  const [selectedImageStep, setSelectedImageStep] = useState(0);

  const handleCarouselNext = () => {
    setSelectedImageStep((prevActiveImageStep) => prevActiveImageStep + 1);
  };

  const handleCarouselBack = () => {
    setSelectedImageStep((prevActiveImageStep) => prevActiveImageStep - 1);
  };

  return (
    <Box sx={styles.carouselWrapper}>
      <Box sx={{ marginBottom: "50px" }}>
        {" "}
        {product &&
          product?.images &&
          product?.images?.map((step, index) => (
            <Box key={index}>
              {selectedImageStep === index ? (
                <Box
                  component="img"
                  sx={styles.image}
                  src={step.url}
                  alt={step.alt}
                />
              ) : null}
            </Box>
          ))}
        {product?.images?.length > 1 ? (
          <Box>
            {" "}
            <MobileStepper
              steps={product.images.length}
              position="static"
              activeStep={selectedImageStep}
              sx={{ width: "80%", margin: "0 auto" }}
              nextButton={
                <Button
                  size="small"
                  onClick={handleCarouselNext}
                  disabled={selectedImageStep === product.images.length - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleCarouselBack}
                  disabled={selectedImageStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default ProductCarousel;
