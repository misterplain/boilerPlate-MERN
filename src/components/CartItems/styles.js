const styles = {
  imageWrapper: (theme) => ({
    width: "100px",
    height: "auto",
    marginRight: "0.5rem",
  }),
  image: {
    borderRadius: "10px",
    width: "100%",
   
  },

  //title and quantity wrapper
  titleAndQuantityWrapper: (theme) => ({
    height: "100%",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }),
  quantitySelect: (theme) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }),
  quantityIcon: (theme) => ({
    fontSize: "1.0rem",
    color: "purple",
    "&:hover": { cursor: "pointer", color: "purple" },
  }),
  priceAndDeleteWrapper: (theme) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",

  }),
};

export default styles;
