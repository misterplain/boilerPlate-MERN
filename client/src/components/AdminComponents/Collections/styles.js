const styles = {
  sectionWrapper: {
    margin: "40px 0px",
  },
  nameAndNewWrapper: {
    margin: "0px 0px 10px 10px",
    color: "green",
    fontSize: "20px",
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