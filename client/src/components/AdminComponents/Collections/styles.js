const styles = {
  pageWrapper: {
    marginBottom: "30px",
  },
  sectionWrapper: {
    margin: "20px 0px",
  },
  nameAndNewWrapper: {
    display: "flex",
    justifyContent: "space-between",
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
  },
}

export default styles