const Collection = require("../models/collectionModel");
const { createClient } = require("pexels");
const cloudinary = require("../utils/cloudinary");
const logger = require("../utils/logger");

//get all collections
//public
const getAllCollections = async (req, res) => {
  try {
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
  } catch (error) {
    logger.error("getAllCollections failed", {
      error: error.message,
      stack: error.stack,
      email: req.body.email,
      ip: req.ip,
    });
    res.status(500).json({ message: "getAllCollections failed" });
  }
};

const getCollection = async (req, res) => {
  const { collectionId } = req.params;

  try {
    const foundCollection = await Collection.findById(collectionId).populate({
      path: "products",
      populate: {
        path: "reviews",
      },
    });

    if (!foundCollection)
      return res.status(400).json({ message: "Collection not found" });
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
  } catch (error) {
    logger.error("getCollection failed", {
      error: error.message,
      stack: error.stack,
      email: req.body.email,
      ip: req.ip,
    });
    res.status(500).json({ message: "getCollection failed" });
  }
};
const getPexel = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: "No name provided" });
  }
  try {
    const client = createClient(process.env.PEXELS_API_KEY);
    const query = name;

    const pexelPhoto = client.photos
      .search({ query, per_page: 1, orientation: "landscape", size: "medium" })
      .then((photos) => {
        if (photos.photos.length === 0) {
          return res.status(400).json({ message: "No results found" });
        }
        const photoUrl = photos?.photos[0]?.src?.landscape;
        const photoId = photos?.photos[0]?.id;
        logger.info("Pexel photo received", {
          query,
          photoId,
          ip: req.ip,
        });
        res.status(200).json({ photoUrl, photoId });
      })
      .catch((error) => {
        logger.error("pexelPhoto failed", {
          error: error.message,
          stack: error.stack,
          email: req.body.email,
          ip: req.ip,
        });
        res.status(400).json({ message: "pexelPhoto failed" });
      });
  } catch (error) {
    logger.error("getPexel failed", {
      error: error.message,
      stack: error.stack,
      email: req.body.email,
      ip: req.ip,
    });
    res.status(500).json({ message: "getPexel failed" });
  }
};

//new collection
//auth account only
const newCollection = async (req, res) => {
  const { collectionData } = req.body;
  const { isAdmin } = req;

  if (!isAdmin) {
    return res.status(403).json({ message: "Not an admin" });
  }

  try {
    const name = collectionData.name;
    const foundCollection = await Collection.findOne({ name });

    if (foundCollection)
      return res.status(400).json({ message: "Collection already exists" });

    //cloudinary
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
    const reply = {
      message: "Collection created",
      newCollection,
    };

    logger.info("Collection created", {
      collectionId: newCollection._id,
      name: newCollection.name,
      adminId: req.userId,
    });

    res.status(201).json(reply);
  } catch (error) {
    logger.error("newCollection failed", {
      error: error.message,
      stack: error.stack,
      email: req.body.email,
      ip: req.ip,
    });
    res.status(500).json({ message: "newCollection failed" });
  }
};

//delete collection
//auth account only
const deleteCollection = async (req, res) => {
  const { collectionId } = req.params;
  const { isAdmin } = req;

  if (!isAdmin) {
    return res.status(403).json({ message: "Not an admin" });
  }

  if (!collectionId)
    return res.status(400).json({ message: "No collection id provided" });

  try {
    const collectionToDelete = await Collection.findById(collectionId);
    if (!collectionToDelete)
      return res
        .status(400)
        .json({ message: "No collection found with that id" });
    if (collectionToDelete.products && collectionToDelete.products.length > 0) {
      return res.status(400).json({
        message: "Collection contains products. Please delete products first.",
      });
    } else {
      await collectionToDelete.remove();

      logger.info("Collection deleted", {
        collectionId: collectionToDelete._id,
        name: collectionToDelete.name,
        adminId: req.userId,
      });

      const reply = {
        message: "Collection deleted",
        collectionToDelete,
      };
      res.status(200).json(reply);
    }
  } catch (error) {
    logger.error("deleteCollection failed", {
      error: error.message,
      stack: error.stack,
      email: req.body.email,
      ip: req.ip,
    });
    res.status(500).json({ message: "deleteCollection failed" });
  }
};

const updateCollection = async (req, res) => {
  const { collectionId } = req.params;
  const { collectionData } = req.body;
  const { isAdmin } = req;

  if (!isAdmin) {
    return res.status(403).json({ message: "Not an admin" });
  }

  if (!collectionId)
    return res.status(400).json({ message: "No collection id provided" });

  try {
    const collectionToUpdate = await Collection.findById(collectionId);
    if (!collectionToUpdate)
      return res
        .status(400)
        .json({ message: "No collection found with that id" });

    collectionToUpdate.name = collectionData.name;

    //cloudinary
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

    const reply = {
      message: "Collection Name updated",
      collectionToUpdate,
    };

    res.status(200).json(reply);
  } catch (error) {
    logger.error("updateCollection failed", {
      error: error.message,
      stack: error.stack,
      email: req.body.email,
      ip: req.ip,
    });
    res.status(500).json({ message: "updateCollection failed" });
  }
};

module.exports = {
  newCollection,
  getAllCollections,
  getCollection,
  deleteCollection,
  updateCollection,
  getPexel,
};
