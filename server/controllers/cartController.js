const User = require("../models/userModel");
const logger = require("../utils/logger");
const { NotFoundError } = require("../utils/errors");

const getCartItems = async (req, res, next) => {
  const { userId } = req;

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("User", userId);
    }
    const reply = {
      message: "All cart items",
      cart: user.cart,
    };

    logger.info("Cart items received", {
      userId: user._id,
      itemCount: user.cart.length,
    });

    res.status(200).json(reply);
  } catch (error) {
    next(error);
  }
};

const addCartItem = async (req, res, next) => {
  const { userId } = req;
  const { productId } = req.params;
  const { quantity, price, name } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("User", userId);
    }
    const itemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId.toString(),
    );

    if (itemIndex > -1) {
      user.cart[itemIndex] = {
        product: productId,
        quantity: user.cart[itemIndex].quantity + Number(quantity),
        pricePerUnit: price,
        name: name,
      };

      await user.save();

      logger.info("Cart item quantity increased", {
        userId: user._id,
        productId: productId,
        newQuantity: user.cart[itemIndex].quantity,
      });

      res.status(200).json({
        message: `Item already in cart, quantity increased by ${quantity}`,
        cart: user.cart,
      });
    } else {
      const item = {
        product: productId,
        quantity: quantity,
        pricePerUnit: price,
        name: name,
      };
      user.cart.push(item);
      await user.save();

      logger.info("Item added to cart", {
        userId: user._id,
        productId: productId,
        quantity: quantity,
      });

      res.status(200).json({ message: "Item added to cart", cart: user.cart });
    }
  } catch (error) {
    next(error);
  }
};

const deleteCartItem = async (req, res, next) => {
  const { userId } = req;
  const { quantity, price, name } = req.body;
  const { productId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("User", userId);
    }
    const itemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId.toString(),
    );
    if (itemIndex > -1) {
      user.cart[itemIndex] = {
        product: productId,
        quantity: user.cart[itemIndex].quantity - Number(quantity),
        pricePerUnit: price,
        name: name,
      };
      if (user.cart[itemIndex].quantity <= 0) {
        user.cart.splice(itemIndex, 1);
      }

      await user.save();

      logger.info("Item removed from cart", {
        userId: user._id,
        productId: productId,
        remainingQuantity: user.cart[itemIndex]?.quantity || 0,
        fullyRemoved: user.cart[itemIndex]?.quantity <= 0,
      });

      res.status(200).json({
        message: "Item removed from cart",
        cart: user.cart,
      });
    } else {
      res.status(200).json({
        message: "Item does not exist in cart",
        cart: user.cart,
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateCart = async (req, res, next) => {
  const { userId } = req;
  const { cartItems } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError("User", userId);
    }

    user.cart = cartItems;

    const updatedUser = await user.save();

    logger.info("Cart updated", {
      userId: user._id,
      itemCount: cartItems.length,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCartItems,
  addCartItem,
  deleteCartItem,
  updateCart,
};
