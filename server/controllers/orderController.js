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

//place order
//protected

const placeOrder = async (req, res) => {
  const { userId } = req;
  const { cartItems, isGuest, totalPrice, emailAddress } = req.body;
  const { street, city, postalCode, country } = req.body.shippingAddress;

  try {
    const userOrdered = await User.findById(userId);
    const orderPlaced = await Order.create({
      userId: userId,
      orderedItems: cartItems.map((item) => {
        return {
          product: item.product, // use 'product' if your schema has a 'product' field, else 'productId'
          quantity: item.quantity,
          price: item.pricePerUnit,
        };
      }),
      isGuest: isGuest,
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

    //add order to user
    userOrdered.orders.push(orderPlaced);
    await userOrdered.save();
    const reply = {
      message: "Order placed",
      orderPlaced,
      userOrder: "userOrdered",
      userOrdered
    };
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

const placeGuestOrder = async (req, res) => {
  //   const { orderedItems, isGuest, emailAddress } = req.body;
  const orderedItems = req.body.orderedItems;
  const isGuest = req.body.isGuest;
  const emailAddress = req.body.emailAddress;
  console.log({ orderedItems, isGuest, emailAddress });
  // const { address, city, postalCode, country } = req.body.shippingAddress;
  // const { paymentMethod } = req.body;
  if (!orderedItems || !isGuest || !emailAddress) {
    return res.status(400).json({ message: "Missing required data" });
  }
  try {
    console.log(emailAddress.toString() + "within trycatch");
    const guestOrderPlaced = await Order.create({
      orderedItems,
      isGuest,
      emailAddress,
    });

    console.log("Order created:", guestOrderPlaced);

    const reply = {
      message: "Order placed",
      guestOrderPlaced,
    };

    console.log("Reply:", reply);

    res.status(201).json(reply);
    console.log("Response sent");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
//delete order
//protected route - admin only
const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  const { userId, isAdmin } = req;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (isAdmin || order.userId.toString() === userId.toString()) {
      const deletedOrder = await Order.findByIdAndDelete(orderId);
      const reply = {
        message: "Order deleted",
        deletedOrder,
      };
      if (!deletedOrder.isGuest) {
        const user = await User.findById(deletedOrder.userId);
        user.orders.pull(deletedOrder);
        await user.save();
      }

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
  placeOrder,
  placeGuestOrder,
  deleteOrder,
  updateOrder,
};
