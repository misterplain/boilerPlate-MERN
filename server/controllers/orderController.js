const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const shortid = require("shortid");
const logger = require("../utils/logger");
const {
  BadRequestError,
  ForbiddenError,
  InsufficientStockError,
  NotFoundError,
  UnauthorizedError,
} = require("../utils/errors");

//get all orders
const getAllOrders = async (req, res, next) => {
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
    next(error);
  }
};

//get user order
const getUserOrder = async (req, res, next) => {
  const { userId } = req;
  try {
    const user = await User.findById(userId).populate("orders");
    if (!user) {
      throw new NotFoundError("User", userId);
    }
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
    next(error);
  }
};

//admin - get orders based on time period
const getOrdersTimePeriod = async (req, res, next) => {
  const { isAdmin } = req;
  const { days } = req.query;

  if (!isAdmin) {
    return next(new ForbiddenError("Not an admin"));
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
    next(error);
  }
};

const searchOrders = async (req, res, next) => {
  const { isAdmin } = req;
  const filterObject = req.body;
  if (!filterObject) {
    return next(new BadRequestError("No filter object provided"));
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
    next(error);
  }
};

//place order
//protected
const placeOrder = async (req, res, next) => {
  const { userId } = req;
  const { cartItems, isGuest, totalPrice, emailAddress, isPaid } = req.body;
  const { street, city, postalCode, country } = req.body.shippingAddress;

  try {
    const userOrdered = await User.findById(userId);
    if (!userOrdered) {
      throw new NotFoundError("User", userId);
    }

    //deduct stock from each item
    for (let item of cartItems) {
      const product = await Product.findById(item.product);

      if (!product) {
        throw new NotFoundError("Product", item.product);
      }

      product.stock -= item.quantity;

      if (product.stock < 0) {
        throw new InsufficientStockError(
          item.name,
          product.stock + item.quantity,
          item.quantity,
        );
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
    next(error);
  }
};

const placeGuestOrder = async (req, res, next) => {
  const { cartItems, isGuest, totalPrice, emailAddress, isPaid } = req.body;
  const { street, city, postalCode, country } = req.body.shippingAddress;

  if (!cartItems || !isGuest || !emailAddress) {
    return next(new BadRequestError("Missing required data"));
  }
  try {
    for (let item of cartItems) {
      const product = await Product.findById(item.product);

      if (!product) {
        throw new NotFoundError("Product", item.product);
      }

      product.stock -= item.quantity;

      if (product.stock < 0) {
        throw new InsufficientStockError(
          item.name,
          product.stock + item.quantity,
          item.quantity,
        );
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
    next(error);
  }
};
//delete order
//protected route - admin only
const cancelOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const { userId, isAdmin } = req;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFoundError("Order", orderId);
    }

    if (isAdmin || order.userId.toString() === userId.toString()) {
      // Add stock back for each ordered item
      for (let item of order.orderedItems) {
        const product = await Product.findById(item.product);

        if (!product) {
          throw new NotFoundError("Product", item.product);
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
      throw new UnauthorizedError("Not authorized");
    }
  } catch (error) {
    next(error);
  }
};

const editOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const { isAdmin } = req;
  const { editRequest } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFoundError("Order", orderId);
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
        throw new BadRequestError("Invalid edit type");
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
      throw new UnauthorizedError("Not authorized");
    }
  } catch (error) {
    next(error);
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
