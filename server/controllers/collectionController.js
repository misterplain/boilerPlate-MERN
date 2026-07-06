const Collection = require("../models/collectionModel");
const { createClient } = require("pexels");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");
const logger = require("../utils/logger");
const {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
} = require("../utils/errors");

//get all collections
//public
const getAllCollections = asyncHandler(async (req, res) => {
  const allCollections = await Collection.find({});
  const reply = {
    message: "All collections",
    allCollections,
  };

  logger.info("All collections received", {
    ip: req.ip,
    count: allCollections.length,
  });

  res.status(200).json(reply);
});

const getCollection = asyncHandler(async (req, res) => {
  const { collectionId } = req.params;

  const foundCollection = await Collection.findById(collectionId).populate({
    path: "products",
    populate: {
      path: "reviews",
    },
  });

  if (!foundCollection) {
    throw new NotFoundError("Collection", collectionId);
  }

  const reply = {
    message: "Collection found",
    foundCollection,
  };

  logger.info("Collection received", {
    collectionId,
    name: foundCollection.name,
    ip: req.ip,
  });

  res.status(200).json(reply);
});

const getPexel = asyncHandler(async (req, res) => {
  const { name } = req.query;

  if (!name) {
    throw new BadRequestError("No name provided");
  }

  const client = createClient(process.env.PEXELS_API_KEY);
  const photos = await client.photos.search({
    query: name,
    per_page: 1,
    orientation: "landscape",
    size: "medium",
  });

  if (photos.photos.length === 0) {
    return res.status(404).json({ message: "No results found" });
  }

  const photoUrl = photos.photos[0]?.src?.landscape;
  const photoId = photos.photos[0]?.id;

  logger.info("Pexel photo received", {
    query: name,
    photoId,
    ip: req.ip,
  });

  return res.status(200).json({ photoUrl, photoId });
});

//new collection
//auth account only
const newCollection = asyncHandler(async (req, res) => {
  const { collectionData } = req.body;
  const { isAdmin } = req;

  if (!isAdmin) {
    throw new ForbiddenError("Not an admin");
  }

  const foundCollection = await Collection.findOne({
    name: collectionData.name,
  });

  if (foundCollection) {
    throw new ConflictError("Collection already exists");
  }

  const imageUploadResult = await cloudinary.uploader.upload(
    collectionData.image,
    {
      folder: "collections",
      width: 300,
      crop: "scale",
    },
  );

  const newCollection = await Collection.create({
    name: collectionData.name,
    image: {
      public_id: imageUploadResult.public_id,
      url: imageUploadResult.secure_url,
    },
  });

  logger.info("Collection created", {
    collectionId: newCollection._id,
    name: newCollection.name,
    adminId: req.userId,
  });

  res.status(201).json({
    message: "Collection created",
    newCollection,
  });
});

//delete collection
//auth account only
const deleteCollection = asyncHandler(async (req, res) => {
  const { collectionId } = req.params;
  const { isAdmin } = req;

  if (!isAdmin) {
    throw new ForbiddenError("Not an admin");
  }

  if (!collectionId) {
    throw new BadRequestError("No collection id provided");
  }

  const collectionToDelete = await Collection.findById(collectionId);
  if (!collectionToDelete) {
    throw new NotFoundError("Collection", collectionId);
  }

  if (collectionToDelete.products && collectionToDelete.products.length > 0) {
    throw new ConflictError(
      "Collection contains products. Please delete products first.",
    );
  }

  await collectionToDelete.remove();

  logger.info("Collection deleted", {
    collectionId: collectionToDelete._id,
    name: collectionToDelete.name,
    adminId: req.userId,
  });

  res.status(200).json({
    message: "Collection deleted",
    collectionToDelete,
  });
});

const updateCollection = asyncHandler(async (req, res) => {
  const { collectionId } = req.params;
  const { collectionData } = req.body;
  const { isAdmin } = req;

  if (!isAdmin) {
    throw new ForbiddenError("Not an admin");
  }

  if (!collectionId) {
    throw new BadRequestError("No collection id provided");
  }

  const collectionToUpdate = await Collection.findById(collectionId);
  if (!collectionToUpdate) {
    throw new NotFoundError("Collection", collectionId);
  }

  collectionToUpdate.name = collectionData.name;

  const imageUploadResult = await cloudinary.uploader.upload(
    collectionData.image,
    {
      folder: "collections",
      width: 300,
      crop: "scale",
    },
  );

  collectionToUpdate.image = {
    public_id: imageUploadResult.public_id,
    url: imageUploadResult.secure_url,
  };

  await collectionToUpdate.save();

  logger.info("Collection updated", {
    collectionId: collectionToUpdate._id,
    name: collectionToUpdate.name,
    adminId: req.userId,
  });

  res.status(200).json({
    message: "Collection Name updated",
    collectionToUpdate,
  });
});

module.exports = {
  newCollection,
  getAllCollections,
  getCollection,
  deleteCollection,
  updateCollection,
  getPexel,
};
