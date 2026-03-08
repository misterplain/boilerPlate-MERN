const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const cloudinary = require("../utils/cloudinary");
const logger = require("../utils/logger");

const addAddress = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { street, city, postalCode, country, isDefault } = req.body;

  try {
    if (!userId) {
      return res.status(400).json({ message: "No user id provided" });
    }

    const userToPopulate = await User.findById(userId);

    if (isDefault) {
      userToPopulate.addresses = userToPopulate.addresses.map((address) => ({
        ...address.toObject(),
        isDefault: false,
      }));
    }

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

    logger.info("Address added", {
      userId: updatedUser._id,
      addressId: newAddressWithId._id,
      city: newAddressWithId.city,
      country: newAddressWithId.country,
    });

    res.status(201).json(reply);
  } catch (error) {
    logger.error("addAddress failed", {
      error: error.message,
      stack: error.stack,
      userId: req.userId,
      ip: req.ip,
    });
    res.status(500).json({ message: "addAddress failed" });
  }
});

//edit username password and avatar
const editProfile = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { profileData } = req.body;

  try {
    const userToUpdate = await User.findById(userId);

    if (!userToUpdate) {
      return res.status(400).json({ message: "No user found with that id" });
    }

    if (profileData.image) {
      const imageUploadResult = await cloudinary.uploader.upload(
        profileData.image,
        {
          folder: "avatars",
          width: 300,
          height: 300,
          gravity: "face",
          crop: "fill",
        },
      );

      userToUpdate.userAvatar = {
        public_id: imageUploadResult.public_id,
        url: imageUploadResult.secure_url,
      };
    }

    userToUpdate.username = profileData.username;

    await userToUpdate.save();

    const reply = {
      message: "Profile updated",
      userToUpdate,
    };

    logger.info("Profile updated", {
      userId: userToUpdate._id,
      username: userToUpdate.username,
      avatarUpdated: !!profileData.image,
    });

    res.status(200).json(reply);
  } catch (error) {
    logger.error("editProfile failed", {
      error: error.message,
      stack: error.stack,
      userId: req.userId,
      ip: req.ip,
    });
    res.status(500).json({ message: "editProfile failed" });
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
      (address) => address._id.toString() === addressId.toString(),
    );
    userToPopulate.addresses.pull(addressId);
    await userToPopulate.save();

    const reply = {
      message: "Address removed",
      userToPopulate,
      addressToDelete,
    };

    logger.info("Address removed", {
      userId: userToPopulate._id,
      addressId: addressId,
    });

    res.status(201).json(reply);
  } catch (error) {
    logger.error("deleteAddress failed", {
      error: error.message,
      stack: error.stack,
      userId: req.userId,
      addressId: req.params.addressId,
      ip: req.ip,
    });
    res.status(500).json({ message: "deleteAddress failed" });
  }
});

const updateFavorites = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { productId, method } = req.body;

  try {
    if (!userId) {
      return res.status(400).json({ message: "No user id provided" });
    }

    const updatedUser = await User.findById(userId);

    if (method === "ADD") {
      if (updatedUser.favorites.includes(productId)) {
        return res
          .status(400)
          .json({ message: "Product already in favorites" });
      } else {
        updatedUser.favorites.push(productId);
      }
    } else if (method === "REMOVE") {
      if (!updatedUser.favorites.includes(productId)) {
        return res.status(400).json({ message: "Product not in favorites" });
      } else {
        updatedUser.favorites.pull(productId);
      }
    }

    await updatedUser.save();

    const reply = {
      message: "Favorites updated",
      updatedUser,
    };

    logger.info("Favorites updated", {
      userId: updatedUser._id,
      productId: productId,
      method: method,
      favoritesCount: updatedUser.favorites.length,
    });

    res.status(201).json(reply);
  } catch (error) {
    logger.error("updateFavorites failed", {
      error: error.message,
      stack: error.stack,
      userId: req.userId,
      productId: req.body.productId,
      method: req.body.method,
      ip: req.ip,
    });
    res.status(500).json({ message: "updateFavorites failed" });
  }
});

module.exports = { addAddress, deleteAddress, updateFavorites, editProfile };
