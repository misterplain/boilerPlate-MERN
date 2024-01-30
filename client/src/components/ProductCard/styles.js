import theme from "../../theme";

const styles = {
  cardWrapper: (theme) => ({
    border: "1px solid lightgray",
    borderRadius: "1.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    // width: "400px",
    // height: "300px",
    padding: "0.5rem",
    margin: "0.5rem",
    objectFit: "contain",
  }),
  imageWrapper: (theme) => ({
    width: "300px",
    height: "225px",
    flex: 1,
    overflow: "hidden",
  }),
  cardImage: (theme) => ({
    width: "100%",
    borderRadius: "1.5rem",
    height: "100%",
    objectFit: "cover",
  }),
  nameReviewsPriceWrapper: (theme) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }),
  optionsWrapper: (theme) => ({
    alignSelf: "flex-end",
  }),
  namePriceWrapper: (theme) => ({
    width: "95%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  }),
  priceWrapper: (theme) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  }),
  salePrice: (theme) => ({
    color: "purple",
  }),
  stock: (theme) => ({
    fontSize: "0.3rem",
  }),

  iconsWrapper: (theme) => ({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  favoritesButton: (theme) => ({
    fontSize: "1.5rem",
    display: "flex",
    justifyContent: "center",
    color: "purple",
    alignItems: "center",
    cursor: "pointer",
  }),
  ratings: (theme) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }),
  numberReviews: (theme) => ({
    fontSize: "0.9rem",
    marginLeft: "5px",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  }),
};

export default styles;

// const styles = {
//   cardWrapper: (theme) => ({
//     // textDecoration: "none",
//     // border: "3px solid purple",
//     // display: "flex",
//     // flexDirection: "column",
//     // justifyContent: "space-around",
//     // width: "160px",
//     // height: "255px",
//     // width: "400px",
//     // height: "400px",
//     // background: "white",
//     // [theme.breakpoints.up("sm")]: {
//     //   width: "200px",
//     //   height: "265px",
//     // },
//     // [theme.breakpoints.up("md")]: {
//     //   width: "200px",
//     //   height: "280px",
//     // },
//     // [theme.breakpoints.up("lg")]: {
//     //   width: "200px",
//     //   height: "280px",
//     // },
//     // [theme.breakpoints.up("xl")]: {
//     //   width: "200px",
//     //   height: "280px",
//     // },
//     // borderRadius: "10px",
//     // padding: "5px",
//     // margin: "5px",
//     // transition: "transform .2s",
//     // "&:hover": {
//     //   transform: "scale(1.05)",
//     // },
//   }),
//   imageWrapper: (theme) => ({}),
//   nameReviewsPriceWrapper: (theme) => ({}),
//   optionsWrapper: (theme) => ({}),
//   namePriceWrapper: (theme) => ({
//     width: "95%",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     textAlign: "center",
//   }),
//   priceWrapper: (theme) => ({
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//   }),
//   salePrice: (theme) => ({
//     color: "purple",
//   }),
//   stock: (theme) => ({

//     fontSize: "0.3rem",
//   }),
//   cardImage: (theme) => ({
//     width: "100%",
//     borderRadius: "10px",
//     // height: "50%",
//     margin: "0px 0px",
//   }),
//   iconsWrapper: (theme) => ({
//     width: "100%",
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   }),
//   favoritesButton: (theme) => ({
//     fontSize: "1.5rem",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     cursor: "pointer",
//   }),
//   ratings: (theme) => ({
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   }),
//   numberReviews: (theme) => ({
//     fontSize: "0.9rem",
//     marginLeft: "5px",
//     display: "none",
//     [theme.breakpoints.up("sm")]: {
//       display: "block",
//     },
//   }),

// };

// export default styles;
