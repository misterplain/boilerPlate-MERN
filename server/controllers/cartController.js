const User = require("../models/userModel");

const getCartItems = async (req, res) => {
  const { userId } = req;

  try {
    const user = await User.findById(userId);
    const reply = {
      message: "All cart items",
      cart: user.cart,
    };
    res.status(200).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const addCartItem = async (req, res) => {
  const { userId } = req;
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const user = await User.findById(userId);
    const itemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId.toString()
    );

    if (itemIndex > -1) {
      user.cart[itemIndex].quantity += quantity;
      await user.save();
      res.status(200).json({
        message: `Item already in cart, quantity increased by ${quantity}`,
        cart: user.cart,
      });
    } else {
      const item = {
        product: productId,
        quantity: quantity,
      };
      user.cart.push(item);
      await user.save();
      res.status(200).json({ message: "Item added to cart", cart: user.cart });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteCartItem = async (req, res) => {
  const { userId } = req;
  const { quantity } = req.body;
  const { productId } = req.params;
  console.log("quantity", quantity)
  console.log("productId", productId)

  try {
    const user = await User.findById(userId);
    const itemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId.toString()
    );
    if (itemIndex > -1) {
        user.cart[itemIndex].quantity -= quantity;
        if (user.cart[itemIndex].quantity <= 0) {
          user.cart.splice(itemIndex, 1);
        }


      await user.save();
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
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getCartItems,
  addCartItem,
  deleteCartItem,
};
