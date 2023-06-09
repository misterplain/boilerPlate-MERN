const Collection = require("../models/collectionModel");

//get all collections
//public
const getAllCollections = async (req, res) => {
  try {
    // const allCollections = await Collection.find({}).populate({
    //   path: "products",
    //   populate: {
    //     path: "reviews",
    //   },
    // });
    const allCollections = await Collection.find({})
    const reply = {
      message: "All collections",
      allCollections,
    };
    res.status(200).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

//get collection by collection ID
//public
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
    res.status(200).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

//new collection
//auth account only
const newCollection = async (req, res) => {
  const { name } = req.body;
  const { isAdmin } = req;

  if (!isAdmin){
    return res.status(403).json({ message: "Not an admin" });
  }

  try {
    const foundCollection = await Collection.findOne({ name });

    if (foundCollection)
      return res.status(400).json({ message: "Collection already exists" });

    const newCollection = await Collection.create({
      name,
    });
    const reply = {
      message: "Collection created",
      newCollection,
    };
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

//delete collection
//auth account only
const deleteCollection = async (req, res) => {
  const { collectionId } = req.params;
  const { isAdmin } = req;


  if (!isAdmin){
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
    console.log(collectionToDelete);
    //if collection contains products
    if (collectionToDelete.products && collectionToDelete.products.length > 0) {
      return res.status(400).json({
        message: "Collection contains products. Please delete products first.",
      });
    } else {
      //delete collection
      await collectionToDelete.remove();
      const reply = {
        message: "Collection deleted",
        collectionToDelete,
      };
      res.status(200).json(reply);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const updateCollection = async (req, res) => {
  const { collectionId } = req.params;
  const { name } = req.body;
  const { isAdmin } = req;

  if (!isAdmin){
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

    collectionToUpdate.name = name;
    await collectionToUpdate.save();

    const reply = {
      message: "Collection Name updated",
      collectionToUpdate,
    };

    res.status(200).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

module.exports = {
  newCollection,
  getAllCollections,
  getCollection,
  deleteCollection,
  updateCollection,
};
