const Product = require("../models/productModel");
const Collection = require("../models/collectionModel");

//new product
const newProduct = async (req, res) => {
  const { collectionId, name, price, photos, description, stock } = req.body;

  try {
    const foundProduct = await Product.findOne({ name });

    if (foundProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const newProduct = await Product.create({
      collectionId,
      name,
      price,
      photos,
      description,
      stock,
    });

    // add product to collection
    const collectionToPopulate = await Collection.findById(
      newProduct.collectionId
    );
    collectionToPopulate.products.push(newProduct);
    await collectionToPopulate.save();

    Collection.findById(newProduct.collectionId)
      .populate("products")
      .exec(function (err, populatedCollection) {
        if (err)
          return res.status(500).json({ message: "Something went wrong" });
        // console.log("The products are: ", populatedCollection.products);
        // res.json(populatedCollection);
      });
    const reply = {
      message: "Product created",
      newProduct,
    };
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

//delete product
const deleteProduct = async (req, res) => {
  const { productId } = req.body;

  if (!productId)
    return res.status(400).json({ message: "No product id provided" });

  const productToDelete = await Product.findById(productId);

  if (!productToDelete)
    return res.status(400).json({ message: "No product found with that id" });

  const deletedProduct = await Product.findByIdAndDelete(productId);

  const reply = {
    message: "Product deleted",
    deletedProduct,
  };
  res.json(reply);
};

module.exports = { newProduct, deleteProduct };
