const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

//get all orders
const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find({});
    const reply = {
      message: "All orders",
      allOrders,
    };
    res.status(200).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

//get user order

const getUserOrder = async (req, res) => {
  const { userId } = req;
  try {
    const user = await User.findById(userId).populate("orders");
    const reply = {
      message: "User orders",
      userOrders: user.orders,
    };
    console.log(user.orders);
    res.status(200).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

//place order
//protected

const placeOrder = async (req, res) => {
  const { userId } = req;
  const { cartItems, isGuest, totalPrice, emailAddress, isPaid } = req.body;
  const { street, city, postalCode, country } = req.body.shippingAddress;

  console.log(isPaid);
  try {
    const userOrdered = await User.findById(userId);
    const orderPlaced = await Order.create({
      userId: userId,
      orderedItems: cartItems.map((item) => {
        console.log(item);
        return {
          product: item.product,
          name: item.name,
          quantity: item.quantity,
          price: item.pricePerUnit,
          name: item.name,
        };
      }),
      isGuest: isGuest,
      isPaid: isPaid,
      emailAddress,
      shippingAddress: {
        street,
        city,
        postalCode,
        country,
      },
      // paymentMethod,
      // itemsPrice,
      // taxPrice,
      // shippingPrice,
      totalPrice,
    });

    await orderPlaced.save();

    // const orderWithProductDetails = await Order.findById(orderPlaced._id).populate('orderedItems.product');
    // console.log(orderWithProductDetails.orderedItems[0].product)

    // await orderWithProductDetails.save();

    //add order to user
    userOrdered.orders.push(orderPlaced);
    userOrdered.cart = [];
    await userOrdered.save();
    const reply = {
      message: "Order placed",
      orderPlaced,
      userOrder: "userOrdered",
      userOrdered,
    };
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

const placeGuestOrder = async (req, res) => {
  const { cartItems, isGuest, totalPrice, emailAddress, isPaid } = req.body;
  const { street, city, postalCode, country } = req.body.shippingAddress;

  if (!cartItems || !isGuest || !emailAddress) {
    return res.status(400).json({ message: "Missing required data" });
  }
  try {
    console.log({
      message: "ispaid",
      isPaid,
    });
    const guestOrderPlaced = await Order.create({
      orderedItems: cartItems.map((item) => {
        return {
          product: item.product,
          quantity: item.quantity,
          price: item.pricePerUnit,
          name: item.name,
        };
      }),
      isGuest: isGuest,
      isPaid: isPaid,
      emailAddress,
      shippingAddress: {
        street,
        city,
        postalCode,
        country,
      },
      totalPrice,
    });

    const reply = {
      message: "Order placed",
      guestOrderPlaced,
    };

    res.status(201).json(reply);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
//delete order
//protected route - admin only
const cancelOrder = async (req, res) => {
  const { orderId } = req.params;
  const { userId, isAdmin } = req;
  console.log(orderId);
  console.log(userId);

  try {
    const order = await Order.findById(orderId);
    console.log({
      message: "order",
      order,
    })
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (isAdmin || order.userId.toString() === userId.toString()) {
      const orderCancelled = await Order.findByIdAndUpdate(
        orderId,
        { isCancelled: true },
        { new: true } // This option returns the updated document
      );
      await orderCancelled.save();
      // if (!orderCancelled.isGuest) {
      //   const user = await User.findById(orderCancelled.userId);
      //   user.orders.pull(orderCancelled);
      //   await user.save();
      // }
      const reply = {
        message: "Order cancelled",
        orderCancelled,
      };
      console.log(reply)
      res.status(200).json(reply);
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { isAdmin } = req;
  const { isPaid, isShippedToCourier, isCancelled, isDelivered } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (isAdmin || order.userId.toString() === userId.toString()) {
      const editedOrder = await Order.findByIdAndUpdate(
        orderId,
        {
          isPaid,
          isShippedToCourier,
          isCancelled,
          isDelivered,
        },
        { new: true }
      );
      const reply = {
        message: "Order deleted",
        editedOrder,
      };

      //find user and delete order from user
      // const user = await User.findById(deletedOrder.userId);
      // user.orders.pull(deletedOrder);
      // await user.save();
      res.status(200).json(reply);
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  } catch (error) {}
};

module.exports = {
  getAllOrders,
  getUserOrder,
  placeOrder,
  placeGuestOrder,
  cancelOrder,
  updateOrder,
};
