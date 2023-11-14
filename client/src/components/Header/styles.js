const styles = {
  wrapper: (theme) => ({
    width: "100%",
    height: "60px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#b3b3cc",
    padding: "0px 0px",
    margin: "0px",
    [theme.breakpoints.up("sm")]: {
      padding: "0px 30px",
      margin: "0px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "0px 30px",
      margin: "0px",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "0px 40px",
      margin: "0px",
    },
  }),
  logoWrapper: (theme) => ({
    display: "flex",
    flexGrow: 1,
    minWidth: "15%",
    flexDirection: "row",
    justifyContent: "center",
    margin: "0px 5px",
    textDecoration: "none",
    [theme.breakpoints.up("sm")]: {
      minWidth: "25%",
    },
    

  }),
  homeIcon: (theme) => ({
    fontSize: "2rem",
  }),
  logo: (theme) => ({
    fontSize: "1.4rem",
    color: "white",
    textAlign: "center",
  }),
  searchBarWrapper: (theme) => ({
    flexGrow: 2,
    minWidth: "50%",
    display: "flex",
    justifyContent: "center",
    flexWrap: "nowrap",
  }),
  searchBar: (theme) => ({
    background: "white",
    borderRadius: "5px",
  }),
  collections: (theme) => ({
    minWidth: 150,
    background: "white",
    borderRadius: "5px",
    margin: "0px 5px",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }),

  linksWrapper: (theme) => ({
    display: "flex",
    flexGrow: 1,
    minWidth: "25%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  }),

  headerButton: (theme) => ({
    marginLeft: "10px",
    fontSize: "1rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.7rem",
    },
  }),
  linksItem: (theme) => ({
    width: "40px",
    height: "40px",
    padding: "3px",
    border: "1px solid white",
    borderRadius: "50%",
    margin: "0px 5px",
    [theme.breakpoints.up("sm")]: {
      margin: "0px 15px",
    },
  }),
  dropdownHeading: (theme) => ({
    fontSize: "1.5rem",
    width: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 0px",
    flexWrap: "wrap",
  }),
  dropdownOptions: (theme) => ({
    width: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }),
};

export default styles;
