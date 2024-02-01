const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const cloudinary = require("../utils/cloudinary");

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

    res.status(201).json(reply);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
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
        }
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

    res.status(200).json(reply);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
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
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

const updateFavorites = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { productId, method } = req.body;

  try {
    if (!userId) {
      console.log("no user id");
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

    res.status(201).json(reply);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = { addAddress, deleteAddress, updateFavorites, editProfile };
