const styles = {
  cardWrapper: {
    width: "90%",
    // height: "200px",
    // border: "3px solid purple",
  },
  card: {
    // border: "1px solid black",
    cursor: "pointer",
  },
  cardImageWrapper: {
    position: "relative",
    padding: "3px",
    margin: "0px",
    borderRadius: "10px",
    // border: "1px solid black",
    border: "3px solid purple",
    width: "100%",
    transition: "transform .2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  image: {
    width: "100%",
  },
  overlayBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    zIndex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    padding: "8px",
    textAlign: "center",
  },
};

export default styles;
