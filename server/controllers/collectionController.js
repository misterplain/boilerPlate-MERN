const Collection = require("../models/collectionModel");

//get collection by collection ID
const getCollection = async (req, res) => {
  const { collectionId } = req.body;

  try {
    const foundCollection = await Collection.findById(collectionId).populate(
      "products"
    );

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
const newCollection = async (req, res) => {
  const { name } = req.body;

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

module.exports = { newCollection, getCollection };
