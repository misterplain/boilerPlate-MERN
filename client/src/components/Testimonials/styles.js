const styles = {
  wrapper: (theme) => ({
    width: "100%",
    paddingTop: "2rem",
    boxSizing: "border-box",
    display: "flex",
    flexDirecttion: "column",
    justifyContent: "center",
    flexWrap: "wrap",
    // alignItems: "center",
    textAlign: "center",
  }),
  textWrapper: (theme) => ({
    minWidth: "10%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
  reviewsWrapper: (theme) => ({
    margin: "3rem 0rem",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
  }),
  review: (theme) => ({
    border: "1px solid lightgrey",
    borderRadius: "1rem",
    boxShadow: "6px 9px 19px -1px rgba(0,0,0,0.72)",
    padding: "1rem",
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    width: "200px",
    [theme.breakpoints.up("sm")]: {
      width: "250px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "280px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "270px",
    },
  }),
  imageTitleWrapper: (theme) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
  }),
  image: (theme) => ({
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "1rem",
  }),
};

export default styles;
