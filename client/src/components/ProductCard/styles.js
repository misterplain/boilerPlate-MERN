const styles = {
  cardWrapper: (theme) => ({
    border: "3px solid purple",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    // height: "300px",
    borderRadius: "10px",
    padding: "3px",
    margin: "0px",
    transition: "transform .2s", 
    "&:hover": {
      transform: "scale(1.05)", 
    },
    // [theme.breakpoints.up("sm")]: {
    //   height: "300px",
  // },
  }),
  imageTitleWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    height: "90%",
    marginBottom: "10px"
  },
  namePriceWrapper: {
    width: "95%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
  },
  cardImage: {
    width: "100%",
    height: "auto",
    margin: "0 auto",
  },
  iconsWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  favoritesButton: {
    fontSize: "1.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    // padding: "0",
    // margin: "0",
    // display: "flex",
    // justifyContent: "flex-end",
  },
  ratings: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  numberReviews: {
    fontSize: "0.9rem",
    marginLeft: "5px",
  }
};

export default styles;
