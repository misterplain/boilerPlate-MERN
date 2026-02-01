const styles = {
  wrapper: {
    border: "1px solid black",
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
