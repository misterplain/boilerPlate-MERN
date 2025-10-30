const styles = {
  cardWrapper: {
    height: "auto",
    cursor: "pointer",
    justifyContent: "center",
    boxShadow: 3,
    borderRadius: "200px",
    margin: "5px",
  },
  cardImageWrapper: {
    position: "relative",
    padding: "0px",
    borderRadius: "10px",
    width: "100%",
    height: "100%",
    transition: "transform .2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
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
