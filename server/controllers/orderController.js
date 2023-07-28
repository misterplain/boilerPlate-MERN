const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const shortid = require("shortid");

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
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
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
    res.status(200).json(reply);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//place order
//protected
const placeOrder = async (req, res) => {
  const { userId } = req;
  const { cartItems, isGuest, totalPrice, emailAddress, isPaid } = req.body;
  const { street, city, postalCode, country } = req.body.shippingAddress;

  try {
    const userOrdered = await User.findById(userId);
    const orderPlaced = await Order.create({
      userId: userId,
      orderedItems: cartItems.map((item) => {
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
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const placeGuestOrder = async (req, res) => {
  const { cartItems, isGuest, totalPrice, emailAddress, isPaid } = req.body;
  const { street, city, postalCode, country } = req.body.shippingAddress;

  if (!cartItems || !isGuest || !emailAddress) {
    return res.status(400).json({ message: "Missing required data" });
  }
  try {
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

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (isAdmin || order.userId.toString() === userId.toString()) {
      const orderCancelled = await Order.findByIdAndUpdate(
        orderId,
        { isCancelled: true },
        { new: true }
      );
      await orderCancelled.save();
      const reply = {
        message: "Order cancelled",
        orderCancelled,
      };
      res.status(200).json(reply);
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const editOrder = async (req, res) => {
  const { orderId } = req.params;
  const { isAdmin } = req;
  const { editRequest } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    let update = {};
    switch (editRequest.type) {
      case "shippedToCourier":
        const shortId = shortid.generate();
        update = {
          isShippedToCourier: true,
          dateShipped: new Date(),
          courierTrackingNumber: shortId,
        };
        break;
      case "isDelivered":
        update = {
          isDelivered: true,
          dateDelivered: new Date(),
        };
        break;
      default:
        return res.status(400).json({ message: "Invalid edit type" });
    }

    if (isAdmin) {
      const editedOrder = await Order.findByIdAndUpdate(orderId, update, {
        new: true,
      });

      const reply = {
        message: "Order updated",
        editedOrder,
      };

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
  editOrder,
};
