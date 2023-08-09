const styles = {
  cardWrapper: (theme) => ({
    border: "3px solid purple",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "300px",
    height: "300px",
    background: "white",
    [theme.breakpoints.up("sm")]: {
      width: "200px",
      height: "240px",
    },
    [theme.breakpoints.up("md")]: {
      width: "200px",
      height: "240px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "230px",
      height: "260px",
    },
    [theme.breakpoints.up("xl")]: {
      width: "230px",
      height: "260px",
    },
    borderRadius: "10px",
    padding: "5px",
    margin: "5px",
    transition: "transform .2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  }),
  imageTitleWrapper: (theme) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    height: "90%",
    marginBottom: "10px",
  }),
  namePriceWrapper: (theme) => ({
    width: "95%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
  }),
  cardImage: (theme) => ({
    width: "100%",
    height: "auto",
    margin: "0 auto",
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
  }),
};

export default styles;
