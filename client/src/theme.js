import { createTheme } from '@mui/material/styles'
import createBreakpoints from '@mui/system/createTheme/createBreakpoints'

const breakpoints = createBreakpoints({})

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
  // typography: {
  //   h2: {
  //     fontFamily: 'Montserrat',
  //     fontWeight: 600,
  //     fontSize: '32px',
  //     lineHeight: '39px',
  //   //   textTransform: 'uppercase',
  //     color: 'blue',
  //     [breakpoints.up('md')]: {
  //       fontSize: '64px',
  //       lineHeight: '78px',
  //     },
  //   },
  //   h3: {
  //     fontFamily: 'Montserrat',
  //     fontWeight: 700,
  //     fontSize: '24px',
  //     lineHeight: '29px',
  //     textTransform: 'capitalize',
  //     color: '#000000',
  //   },
  //   body1: {
  //     fontFamily: 'Montserrat, sans-serif',
  //     fontWeight: 400,
  //     fontSize: '14px',
  //     lineHeight: '17px',
  //     color: '#686868',
  //     [breakpoints.up('md')]: {
  //       fontSize: '24px',
  //       lineHeight: '29px',
  //       fontWeight: 500,
  //     },
  //   },
  //   someStyle: {
  //     fontFamily: 'Montserrat,sans-serif',
  //     textTransform: 'capitalize',
  //   },
  // },
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
