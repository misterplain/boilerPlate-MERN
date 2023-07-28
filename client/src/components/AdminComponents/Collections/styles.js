const commonStyles = {
  wrapper: {
    marginBottom: "30px",
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "space-around",
    flexDirection: "row",
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
  name: {
    /* specific collection name styles */
  },
  length: {
    /* specific collection length styles */
  },
};

const productStyles = {
  ...commonStyles,
  list: {
    width: "100%",
  },
  productName: {
    display: "flex",
    justifyContent: "space-between",
  },
  name: {
    /* specific product name styles */
  },
  length: {
    /* specific product length styles */
  },
};

export { collectionStyles, productStyles };
