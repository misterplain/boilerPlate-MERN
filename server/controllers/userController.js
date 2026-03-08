const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const cloudinary = require("../utils/cloudinary");
const logger = require("../utils/logger");
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
} = require("../utils/errors");

const addAddress = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { street, city, postalCode, country, isDefault } = req.body;

  try {
    if (!userId) {
      throw new BadRequestError("No user id provided");
    }

    const userToPopulate = await User.findById(userId);
    if (!userToPopulate) {
      throw new NotFoundError("User", userId);
    }

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
    throw error;
  }
});

//edit username password and avatar
const editProfile = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { profileData } = req.body;

  try {
    const userToUpdate = await User.findById(userId);

    if (!userToUpdate) {
      throw new NotFoundError("User", userId);
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
    throw error;
  }
});

//remove address
const deleteAddress = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { addressId } = req.params;
  try {
    if (!userId) {
      throw new BadRequestError("No user id provided");
    }

    const userToPopulate = await User.findById(userId);
    if (!userToPopulate) {
      throw new NotFoundError("User", userId);
    }
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
    throw error;
  }
});

const updateFavorites = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { productId, method } = req.body;

  try {
    if (!userId) {
      throw new BadRequestError("No user id provided");
    }

    const updatedUser = await User.findById(userId);
    if (!updatedUser) {
      throw new NotFoundError("User", userId);
    }

    if (method === "ADD") {
      if (updatedUser.favorites.includes(productId)) {
        throw new ConflictError("Product already in favorites");
      } else {
        updatedUser.favorites.push(productId);
      }
    } else if (method === "REMOVE") {
      if (!updatedUser.favorites.includes(productId)) {
        throw new BadRequestError("Product not in favorites");
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
    throw error;
  }
});

module.exports = { addAddress, deleteAddress, updateFavorites, editProfile };
