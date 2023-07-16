import { createTheme } from '@mui/material/styles'
import createBreakpoints from '@mui/system/createTheme/createBreakpoints'

const breakpoints = createBreakpoints({})

// const fontVariable = "Nunito, sans-serif"
// const fontVariable = "Poppins, sans-serif"
// const fontVariable = "PT Sans, sans-serif"
// const fontVariable = "Raleway, sans-serif"
// const fontVariable = "Roboto, sans-serif"
// const fontVariable = "Work Sans, sans-serif"
const fontVariable = "Montserrat"
// const fontVariable = "Space Grotesk, sans-serif"
//  const fontVariable = "Source Code Pro, monospace"
// const fontVariable = "Rubik, sans-serif"
// const fontVariable = "Quicksand, sans-serif"
// const fontVariable = "Maven Pro, sans-serif"
//  const fontVariable = "Manrope, sans-serif"
// const fontVariable = "Lato, sans-serif"
//  const fontVariable = "Inconsolata, monospace"




const theme = createTheme({
  palette: {
    primary: {
      main: '#686868',
    },
    beige: {
      main: '#C2A887',
    },
    dijon: {
      main: '#DFAF5E',
    },
    darkGreen:{
      main: '#61714D',
    },
    lightGreen:{
      main: '#8FAE93'
    },
    burgundy: {
      main: '#6D152B',
    },
    pink: {
      main: '#F3b1c8'
    }
  },
   typography: {
    h1 : {
      fontFamily: fontVariable,
    },
     h2: {
       fontFamily: fontVariable,

       [breakpoints.up('md')]: {

       },
     },
     h3: {
       fontFamily: fontVariable,

     },
     h4 : {
      fontFamily: fontVariable,
    },
    h5 : {
      fontFamily: fontVariable,
    },
    h6 : {
      fontFamily: fontVariable,
    },
     body1: {
       fontFamily: fontVariable,

       [breakpoints.up('md')]: {

       },
     },
     body2 : {
      fontFamily: fontVariable,
    },
    subtitle1 : {
      fontFamily: fontVariable,
    },
    subtitle2 : {
      fontFamily: fontVariable,
    },
    button : {
      fontFamily: fontVariable,
    },
    caption : {
      fontFamily: fontVariable,
    },
    overline : {
      fontFamily: fontVariable,
    },
     
     someStyle: {
       fontFamily: fontVariable,
       textTransform: 'capitalize',
     },
   },
  // components: {
  //   // Name of the component
  //   MuiOutlinedInput: {
  //     styleOverrides: {
  //       notchedOutline: {
  //         border: '0.5px solid #777FEB',
  //       },
  //       root: {
  //         borderRadius: '8px',
  //         color: '#000',
  //         fontSize: '16px',
  //         lineHeight: '20px',
  //         fontWeight: 500,
  //         '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
  //           border: '2px solid #777FEB',
  //         },
  //         '&:hover .MuiOutlinedInput-notchedOutline': {
  //           border: '2px solid #777FEB',
  //         },
  //       },
  //     },
  //   },
  // },
})

export default theme
