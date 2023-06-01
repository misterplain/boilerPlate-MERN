const Product = require("../models/productModel");
const Collection = require("../models/collectionModel");

//new product
//protected route - admin only
const newProduct = async (req, res) => {
  const { collectionId, name, price, photos, description, stock } = req.body;
  const { isAdmin } = req;

  if (!isAdmin){
    return res.status(403).json({ message: "Not an admin" });
  }

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
    collectionToPopulate.products?.push(newProduct);
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

//get all products
//public route
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    const reply = {
      message: "All products",
      allProducts,
    };
    res.status(200).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

//delete product
//protected route - admin only
const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const { isAdmin } = req;

  if (!isAdmin){
    return res.status(403).json({ message: "Not an admin" });
  }

  if (!productId)
    return res.status(400).json({ message: "No product id provided" });

  const productToDelete = await Product.findById(productId);

  if (!productToDelete)
    return res.status(400).json({ message: "No product found with that id" });

  const deletedProduct = await Product.findByIdAndDelete(productId);

  //remove product from collection
  const collectionToUpdate = await Collection.findById(
    deletedProduct.collectionId
  );
  collectionToUpdate.products.pull(deletedProduct);
  await collectionToUpdate.save();

  const reply = {
    message: "Product deleted",
    deletedProduct,
    collectionToUpdate,
  };
  res.json(reply);
};

//update product
//protected route - admin only
const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, price, photos, description, stock } = req.body;
  const { isAdmin } = req;

  if (!isAdmin){
    return res.status(403).json({ message: "Not an admin" });
  }

  if (!productId)
    return res.status(400).json({ message: "No product id provided" });

  const productToUpdate = await Product.findById(productId);

  if (!productToUpdate)
    return res.status(400).json({ message: "No product found with that id" });

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      name,
      price,
      photos,
      description,
      stock,
    },
    { new: true }
  );

  const reply = {
    message: "Product updated",
    updatedProduct,
  };
  res.json(reply);
};

module.exports = { newProduct, getAllProducts, deleteProduct, updateProduct };
