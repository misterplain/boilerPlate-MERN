const Collection = require("../models/collectionModel");
const { createClient } = require("pexels");
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
const getAllCollections = async (req, res, next) => {
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
    next(error);
  }
};

const getCollection = async (req, res, next) => {
  const { collectionId } = req.params;

  try {
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
  } catch (error) {
    next(error);
  }
};
const getPexel = async (req, res, next) => {
  const { name } = req.query;

  if (!name) {
    return next(new BadRequestError("No name provided"));
  }
  try {
    const client = createClient(process.env.PEXELS_API_KEY);
    const query = name;

    const pexelPhoto = client.photos
      .search({ query, per_page: 1, orientation: "landscape", size: "medium" })
      .then((photos) => {
        if (photos.photos.length === 0) {
          return res.status(404).json({ message: "No results found" });
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
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

//new collection
//auth account only
const newCollection = async (req, res, next) => {
  const { collectionData } = req.body;
  const { isAdmin } = req;

  if (!isAdmin) {
    return next(new ForbiddenError("Not an admin"));
  }

  try {
    const name = collectionData.name;
    const foundCollection = await Collection.findOne({ name });

    if (foundCollection) {
      throw new ConflictError("Collection already exists");
    }

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
    next(error);
  }
};

//delete collection
//auth account only
const deleteCollection = async (req, res, next) => {
  const { collectionId } = req.params;
  const { isAdmin } = req;

  if (!isAdmin) {
    return next(new ForbiddenError("Not an admin"));
  }

  if (!collectionId) {
    return next(new BadRequestError("No collection id provided"));
  }

  try {
    const collectionToDelete = await Collection.findById(collectionId);
    if (!collectionToDelete) {
      throw new NotFoundError("Collection", collectionId);
    }
    if (collectionToDelete.products && collectionToDelete.products.length > 0) {
      throw new ConflictError(
        "Collection contains products. Please delete products first.",
      );
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
    next(error);
  }
};

const updateCollection = async (req, res, next) => {
  const { collectionId } = req.params;
  const { collectionData } = req.body;
  const { isAdmin } = req;

  if (!isAdmin) {
    return next(new ForbiddenError("Not an admin"));
  }

  if (!collectionId) {
    return next(new BadRequestError("No collection id provided"));
  }

  try {
    const collectionToUpdate = await Collection.findById(collectionId);
    if (!collectionToUpdate) {
      throw new NotFoundError("Collection", collectionId);
    }

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
    next(error);
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
