import theme from "../../theme";

const styles = {
  cardWrapper: (theme) => ({
    textDecoration: "none",
    border: "3px solid purple",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    width: "160px",
    height: "255px",
    background: "white",
    [theme.breakpoints.up("sm")]: {
      width: "200px",
      height: "265px",
    },
    [theme.breakpoints.up("md")]: {
      width: "200px",
      height: "265px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "200px",
      height: "265px",
    },
    [theme.breakpoints.up("xl")]: {
      width: "200px",
      height: "265px",
    },
    borderRadius: "10px",
    padding: "5px",
    margin: "5px",
    transition: "transform .2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
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
  cardImage: (theme) => ({
    width: "100%",
    borderRadius: "10px",
    // height: "50%",
    margin: "0px 0px",
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
