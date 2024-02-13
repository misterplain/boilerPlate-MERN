import theme from "../../theme";

const styles = {
  cardWrapper: (theme) => ({
    border: "1px solid lightgray",
    borderRadius: "1.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
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



