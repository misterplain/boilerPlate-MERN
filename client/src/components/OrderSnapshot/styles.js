const styles = {
  orderWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "0.5rem",
    padding: "0.5rem",
    borderBottom: "1px solid grey",
  },
  status: (orderStatus) => ({
    color: orderStatus === "Cancelled" ? "grey" :
    orderStatus === "In Production" ? "orange" :
    orderStatus === "Delivered" ? "purple" :
    orderStatus === "Shipped To Courier" ? "green" : "black",
    marginLeft: "5px",
    fontWeight: "bold",
    fontSize: "1rem",
  })

};

export default styles;
