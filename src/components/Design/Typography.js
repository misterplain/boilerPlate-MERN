import React from "react";
import Typography from "@mui/material/Typography";

const styles = {
  fontChange1: {
    fontFamily: "Montserrat",
  },
};

const TypographyComponent = () => {
  return (
    <>
      <Typography variant='h1'>Heading 1</Typography>
      <Typography variant='h2'>Heading 2</Typography>
      <Typography variant='h3'>Heading 3</Typography>
      <Typography variant='h4'>Heading 4</Typography>
      <Typography variant='h5'>Heading 5</Typography>
      <Typography variant='h6'>Heading 6</Typography>
      <Typography variant='subtitle1'>Subtitle 1</Typography>
      <Typography variant='subtitle2'>Subtitle 2</Typography>
      <Typography variant='body1'>Body 1</Typography>
      <Typography variant='body2'>Body 2</Typography>
      <Typography variant='button'>Button</Typography>
      <br></br>
      <Typography variant='caption'>Caption</Typography>
      <br></br>
      <Typography variant='overline'>Overline</Typography>
      <hr></hr>
      <Typography sx={styles.fontChange1} variant='h1'>
        Heading 1
      </Typography>
      <Typography sx={styles.fontChange1} variant='h2'>
        Heading 2
      </Typography>
      <Typography sx={styles.fontChange1} variant='h3'>
        Heading 3
      </Typography>
      <Typography sx={styles.fontChange1} variant='h4'>
        Heading 4
      </Typography>
      <Typography sx={styles.fontChange1} variant='h5'>
        Heading 5
      </Typography>
      <Typography sx={styles.fontChange1} variant='h6'>
        Heading 6
      </Typography>
      <Typography sx={styles.fontChange1} variant='subtitle1'>
        Subtitle 1
      </Typography>
      <Typography sx={styles.fontChange1} variant='subtitle2'>
        Subtitle 2
      </Typography>
      <Typography sx={styles.fontChange1} variant='body1'>
        Body 1
      </Typography>
      <Typography sx={styles.fontChange1} variant='body2'>
        Body 2
      </Typography>
      <Typography sx={styles.fontChange1} variant='button'>
        Button
      </Typography>
      <br></br>
      <Typography sx={styles.fontChange1} variant='caption'>
        Caption
      </Typography>
      <br></br>
      <Typography sx={styles.fontChange1} variant='overline'>
        Overline
      </Typography>
    </>
  );
};

export default TypographyComponent;
