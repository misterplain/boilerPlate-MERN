const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const generateUserTokens = require("../middleware/generateToken.js");

//new review after userToken is validated, req.userId is available
const addAddress = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { street, city, postalCode, country, isDefault } = req.body;
  console.log({
    street,
    city,
    postalCode,
    country,
    isDefault,
  });
  try {
    if (!userId) {
      return res.status(400).json({ message: "No user id provided" });
    }

    const userToPopulate = await User.findById(userId);
    const newAddress = {
      street,
      city,
      postalCode,
      country,
      isDefault,
    };
    userToPopulate.addresses.push(newAddress);
    await userToPopulate.save();

    const updatedUser = await User.findById(userId);
    const newAddressWithId =
      updatedUser.addresses[updatedUser.addresses.length - 1];

    const reply = {
      message: "Address added",
      updatedUser,
      newAddress: newAddressWithId,
    };

    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
});

//remove address
const deleteAddress = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { addressId } = req.params;
  try {
    if (!userId) {
      return res.status(400).json({ message: "No user id provided" });
    }

    const userToPopulate = await User.findById(userId);
    const addressToDelete = userToPopulate.addresses.find(
      (address) => address._id.toString() === addressId.toString()
    );
    userToPopulate.addresses.pull(addressId);
    await userToPopulate.save();

    const reply = {
      message: "Address removed",
      userToPopulate,
      addressToDelete,
    };

    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
});

module.exports = { addAddress, deleteAddress };
