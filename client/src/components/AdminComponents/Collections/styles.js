const styles = {
  pageWrapper: {
    marginBottom: "30px",
  },
  sectionWrapper: {
    margin: "40px 0px",
  },
  nameAndNewWrapper: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
    // background: "white",
    color: "green",
    fontSize: "20px",
  },
  optionsWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  stock: (stock) => ({
    color: stock > 0 ? "green" : "red",
  }),
  isDisplayed: (isDisplayed) => ({
    color: isDisplayed ? "green" : "red",
  }),
  isFeatured: (isFeatured) => ({
    color: isFeatured ? "green" : "red",
  }),
  gridItem: {
    border: "1px solid grey",
    padding: "5px",
    background: "white"
  },
}

export default styles