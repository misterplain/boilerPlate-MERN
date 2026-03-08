const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const shortid = require("shortid");
const logger = require("../utils/logger");

//get all orders
const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find({});
    const reply = {
      message: "All orders",
      allOrders,
    };

    logger.info("All orders received", {
      count: allOrders.length,
      adminId: req.userId,
      ip: req.ip,
    });

    res.status(200).json(reply);
  } catch (error) {
    logger.error("getAllOrders failed", {
      error: error.message,
      stack: error.stack,
      ip: req.ip,
    });
    res.status(500).json({ message: "getAllOrders failed" });
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

    logger.info("User orders received", {
      userId,
      orderCount: user.orders.length,
      ip: req.ip,
    });

    res.status(200).json(reply);
  } catch (error) {
    logger.error("getUserOrder failed", {
      error: error.message,
      stack: error.stack,
      userId: req.userId,
      ip: req.ip,
    });
    res.status(500).json({ message: "getUserOrder failed" });
  }
};

//admin - get orders based on time period
const getOrdersTimePeriod = async (req, res) => {
  const { isAdmin } = req;
  const { days } = req.query;

  if (!isAdmin) {
    return res.status(403).json({ message: "Not an admin" });
  }

  try {
    const currentDate = new Date();
    const startPeriod = new Date(currentDate - days * 24 * 60 * 60 * 1000);

    let baseQuery = { datePlaced: { $gte: startPeriod } };

    if (days > 730) {
      baseQuery.datePlaced.$lt = new Date(
        currentDate - 730 * 24 * 60 * 60 * 1000,
      );
    }

    const orders = await Order.find(baseQuery);
    const reply = {
      message: "Orders between dates",
      timePeriodOrders: orders,
    };

    logger.info("Orders by time period received", {
      days,
      count: orders.length,
      adminId: req.userId,
      ip: req.ip,
    });

    res.status(200).json(reply);
  } catch (error) {
    logger.error("getOrdersTimePeriod failed", {
      error: error.message,
      stack: error.stack,
      days: req.query.days,
      adminId: req.userId,
      ip: req.ip,
    });
    res.status(500).json({ message: "getOrdersTimePeriod failed" });
  }
};

const searchOrders = async (req, res) => {
  const { isAdmin } = req;
  const filterObject = req.body;
  if (!filterObject) {
    return res.status(400).json({ message: "No filter object provided" });
  }

  let query = {};

  if (filterObject.emailAddress && filterObject.emailAddress.trim() !== "") {
    query.emailAddress = { $regex: filterObject.emailAddress, $options: "i" };
  }

  if (filterObject.orderStatus) {
    switch (filterObject.orderStatus) {
      case "All":
        break;
      case "Cancelled":
        query.isCancelled = true;
        break;
      case "In Production":
        query.$and = [{ isShippedToCourier: false }, { isCancelled: false }];
        break;
      case "Delivered":
        query.$and = [{ isShippedToCourier: true }, { isDelivered: true }];
        break;
      case "Shipped To Courier":
        query.$and = [{ isShippedToCourier: true }, { isDelivered: false }];
        break;
    }
  }

  if (filterObject.shortId && filterObject.shortId.trim() !== "") {
    query.shortId = filterObject.shortId;
  }

  if (filterObject.postCode && filterObject.postCode.trim() !== "") {
    query["shippingAddress.postalCode"] = {
      $regex: filterObject.postalCode,
      $options: "i",
    };
  }

  if (
    filterObject.courierTrackingNumber &&
    filterObject.courierTrackingNumber.trim() !== ""
  ) {
    query.courierTrackingNumber = filterObject.courierTrackingNumber;
  }

  try {
    const filteredOrders = await Order.find(query);

    const reply = {
      message: "Filtered orders",
      filteredOrders,
    };

    logger.info("Orders filtered", {
      count: filteredOrders.length,
      adminId: req.userId,
      ip: req.ip,
    });

    res.status(200).json(reply);
  } catch (error) {
    logger.error("searchOrders failed", {
      error: error.message,
      stack: error.stack,
      filterObject: req.body,
      adminId: req.userId,
      ip: req.ip,
    });
    res.status(500).json({ message: "searchOrders failed" });
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

    //deduct stock from each item
    for (let item of cartItems) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.product} not found` });
      }

      product.stock -= item.quantity;

      if (product.stock < 0) {
        return res
          .status(400)
          .json({ message: `Product ${item.name} has insufficient stock` });
      }

      await product.save();
    }

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
      totalPrice,
    });

    await orderPlaced.save();

    userOrdered.orders.push(orderPlaced);
    userOrdered.cart = [];
    await userOrdered.save();
    const reply = {
      message: "Order placed",
      orderPlaced,
      userOrder: "userOrdered",
      userOrdered,
    };

    logger.info("Order placed", {
      orderId: orderPlaced._id,
      userId: userId,
      totalPrice: totalPrice,
      itemCount: cartItems.length,
      emailAddress: emailAddress,
    });

    res.status(201).json(reply);
  } catch (error) {
    logger.error("placeOrder failed", {
      error: error.message,
      stack: error.stack,
      userId: req.userId,
      totalPrice: req.body.totalPrice,
      itemCount: req.body.cartItems?.length,
      ip: req.ip,
    });
    res.status(500).json({ message: "placeOrder failed" });
  }
};

const placeGuestOrder = async (req, res) => {
  const { cartItems, isGuest, totalPrice, emailAddress, isPaid } = req.body;
  const { street, city, postalCode, country } = req.body.shippingAddress;

  if (!cartItems || !isGuest || !emailAddress) {
    return res.status(400).json({ message: "Missing required data" });
  }
  try {
    for (let item of cartItems) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.product} not found` });
      }

      product.stock -= item.quantity;

      if (product.stock < 0) {
        return res
          .status(400)
          .json({ message: `Product ${item.name} has insufficient stock` });
      }

      await product.save();
    }

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

    logger.info("Guest order placed", {
      orderId: guestOrderPlaced._id,
      totalPrice: totalPrice,
      itemCount: cartItems.length,
      emailAddress: emailAddress,
    });

    res.status(201).json(reply);
  } catch (error) {
    logger.error("placeGuestOrder failed", {
      error: error.message,
      stack: error.stack,
      totalPrice: req.body.totalPrice,
      itemCount: req.body.cartItems?.length,
      emailAddress: req.body.emailAddress,
      ip: req.ip,
    });
    res.status(500).json({ message: "placeGuestOrder failed" });
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
      // Add stock back for each ordered item
      for (let item of order.orderedItems) {
        const product = await Product.findById(item.product);

        if (!product) {
          return res
            .status(404)
            .json({ message: `Product with ID ${item.product} not found` });
        }

        product.stock += item.quantity;

        await product.save();
      }

      const orderCancelled = await Order.findByIdAndUpdate(
        orderId,
        { isCancelled: true },
        { new: true },
      );
      await orderCancelled.save();
      const reply = {
        message: "Order cancelled",
        orderCancelled,
      };

      logger.info("Order cancelled", {
        orderId: orderCancelled._id,
        userId: orderCancelled.userId,
        cancelledBy: req.isAdmin ? "admin" : "user",
        totalPrice: orderCancelled.totalPrice,
      });

      res.status(200).json(reply);
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  } catch (error) {
    logger.error("cancelOrder failed", {
      error: error.message,
      stack: error.stack,
      orderId: req.params.orderId,
      userId: req.userId,
      ip: req.ip,
    });
    res.status(500).json({ message: "cancelOrder failed" });
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

      logger.info("Order updated", {
        orderId: editedOrder._id,
        editType: editRequest.type,
        adminId: req.userId,
      });

      res.status(200).json(reply);
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  } catch (error) {
    logger.error("editOrder failed", {
      error: error.message,
      stack: error.stack,
      orderId: req.params.orderId,
      editType: req.body.editRequest?.type,
      adminId: req.userId,
      ip: req.ip,
    });
    res.status(500).json({ message: "editOrder failed" });
  }
};

module.exports = {
  getAllOrders,
  getUserOrder,
  getOrdersTimePeriod,
  placeOrder,
  placeGuestOrder,
  cancelOrder,
  editOrder,
  searchOrders,
};
