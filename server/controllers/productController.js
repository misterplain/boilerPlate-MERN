const Product = require("../models/productModel");
const Collection = require("../models/collectionModel");
const cloudinary = require("../utils/cloudinary");

//new product
//protected route - admin only
const newProduct = async (req, res) => {
  const { collectionId, name, price, images, description, stock } = req.body;
  const { isAdmin } = req;

  if (!isAdmin) {
    return res.status(403).json({ message: "Not an admin" });
  }

  try {
    const foundProduct = await Product.findOne({ name });

    if (foundProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    //cloudinary
    const imageUploadResult = await cloudinary.uploader.upload(images, {
      folder: "products",
      width: 300,
      crop: "scale",
    });

    const newProduct = await Product.create({
      collectionId,
      name,
      price,
      images: {
        public_id: imageUploadResult.public_id,
        url: imageUploadResult.secure_url,
      },
      description,
      stock,
    });

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
      });
    const reply = {
      message: "Product created",
      newProduct,
    };
    res.status(201).json(reply);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//delete image from mongoDB database and cloudinary
//protected route - admin only
const deleteImage = async (req, res) => {
  const { productId } = req.params;
  const image = req.body;
  const { isAdmin } = req;

  if (!isAdmin) {
    return res.status(403).json({ message: "Not an admin" });
  }

  if (!productId)
    return res.status(400).json({ message: "No product id provided" });

  try {
    const productToUpdate = await Product.findById(productId);

    if (!productToUpdate)
      return res.status(400).json({ message: "No product found with that id" });

    const imageToRemove = productToUpdate.images.find(
      (img) => img._id == image._id
    );

    if (!imageToRemove)
      return res.status(400).json({ message: "No image found with that id" });

    await cloudinary.uploader.destroy(image.public_id);

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $pull: { images: { _id: image._id } } },
      { new: true }
    );

    const reply = {
      message: "Image deleted",
      updatedProduct,
    };
    res.json(reply);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
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
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//delete product
//protected route - admin only
const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const { isAdmin } = req;

  if (!isAdmin) {
    return res.status(403).json({ message: "Not an admin" });
  }

  if (!productId)
    return res.status(400).json({ message: "No product id provided" });

  const productToDelete = await Product.findById(productId);

  if (!productToDelete)
    return res.status(400).json({ message: "No product found with that id" });

  const deletedProduct = await Product.findByIdAndDelete(productId);

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
  const {
    name,
    price,
    images,
    description,
    stock,
    isFeatured,
    isDisplayed,
    collectionId,
  } = req.body;
  const { isAdmin } = req;

  if (!isAdmin) {
    return res.status(403).json({ message: "Not an admin" });
  }

  if (!productId)
    return res.status(400).json({ message: "No product id provided" });

  try {
    const productToUpdate = await Product.findById(productId);

    if (!productToUpdate)
      return res.status(400).json({ message: "No product found with that id" });

    const oldCollectionId = productToUpdate.collectionId;

    if (oldCollectionId !== collectionId) {
      await Collection.updateOne(
        { _id: oldCollectionId },
        { $pull: { products: productId } }
      );
    }

    // define updateObject outside
    let updateObject = {
      name,
      price,
      description,
      stock,
      isFeatured,
      isDisplayed,
      collectionId,
    };

    if (images) {
      const imageUploadResult = await cloudinary.uploader.upload(images, {
        folder: "products",
        width: 400,
        height: 300,
        crop: "fill",
        gravity: "center",
        eager: [
          { width: 1000, height: 600, crop: "fill", gravity: "face:auto" },
        ],
      });

      const newImageData = {
        public_id: imageUploadResult.public_id,
        url: imageUploadResult.secure_url,
      };

      updateObject = {
        ...updateObject,
        $push: { images: newImageData },
      };
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateObject,
      { new: true }
    );

    if (oldCollectionId !== collectionId) {
      await Collection.updateOne(
        { _id: collectionId },
        { $push: { products: productId } }
      );
    }

    const reply = {
      message: "Product updated",
      updatedProduct,
      oldCollectionId,
    };
    res.json(reply);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  newProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  deleteImage,
};
