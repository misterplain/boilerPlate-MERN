const styles = {
  wrapper: {
    margin: "20px 0px",
  },
  summaryWrapper: {},
  user: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  username: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginLeft: "0.7rem",
  },
  statusWrapper: (theme) => ({
    display: "flex",
    // fontSize: "2.8rem",
    justifyContent: "center",
    width: "100%"
  }),
  reviewStatus:   {
    fontSize: "1.0rem",
    color: "grey",
    border: "1px solid purple",
    padding: "10px",
    borderRadius: "30px",
  }
};

export default styles;
