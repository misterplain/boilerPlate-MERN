const commonStyles = {
  pageWrapper: {
    marginBottom: "30px",
  },
  sectionWrapper: {
    margin: "20px 10px",
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "space-around",
    flexDirection: "row",
  },
  nameAndNewWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  card: { border: "1px solid black", cursor: "pointer" },
  cardImageWrapper: {
    position: "relative",
    margin: "10px",
    border: "1px solid black",
    width: "300px",
  },
  image: {
    width: "100%",
  },
  overlayBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    padding: "10px",
    textAlign: "center",
  },
  optionsWrapper: {
    display: "flex",
    justifyContent: "center",
  },
};

const collectionStyles = {
  ...commonStyles,
  collectionName: {
    display: "flex",
    justifyContent: "space-between",
  },
  name: {},
  length: {},
};

const productStyles = {
  ...commonStyles,
  list: {
    width: "100%",
  },
  name: {
  },
  length: {
  },
  price: {

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
padding: "5px"
  }
};

export { collectionStyles, productStyles };
