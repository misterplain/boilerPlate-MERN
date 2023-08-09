const Product = require("../models/productModel");
const Collection = require("../models/collectionModel");
const cloudinary = require("../utils/cloudinary");

//new product
//protected route - admin only
const newProduct = async (req, res) => {
  const { collectionId, name, price, images, description, stock, isDisplayed, isFeatured} = req.body;
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
      width: 400,
      height: 300,
      crop: "fill",
      gravity: "center",
      eager: [
        { width: 1000, height: 600, crop: "fill", gravity: "face:auto" },
      ],
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
      isDisplayed,
      isFeatured,
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
    res.status(500).json({ message: "Could not fetch products" });
  }
};

//delete product
//protected route - admin only
const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const { isAdmin } = req;

  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
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

const getFilteredProducts = async (req, res) => {
  const { filterObject } = req.body;
  console.log(filterObject, "filterObject");
  // console.log(req)
  // console.log(req.body + "req.body");
  // console.log(req.body.filterObject)
  // console.log(filterObject.priceRange)

  if (!filterObject) {
    return res.status(400).json({ message: "No filter object provided" });
  }

  let query = {};

  // Handle isFeatured
  if (typeof filterObject.isFeatured !== "undefined") {
    query.isFeatured = filterObject.isFeatured;
  }

  // Handle isDisplayed
  if (typeof filterObject.isDisplayed !== "undefined") {
    query.isDisplayed = filterObject.isDisplayed;
  }

  // Handle searchQuery
  if (filterObject.searchQuery) {
    query.$or = [
      { name: { $regex: filterObject.searchQuery, $options: "i" } },
      { description: { $regex: filterObject.searchQuery, $options: "i" } },
    ];
  }

  // Handle collections, first turn it into a array, check the length, then use $in function
  const selectedCollectionIds = Object.keys(filterObject.collections).filter(
    (key) => filterObject.collections[key]
  );
  // console.log(selectedCollectionIds);
  if (selectedCollectionIds.length > 0) {
    query.collectionId = { $in: selectedCollectionIds };
  }

  // Handle priceRange
  if (filterObject.priceRange && filterObject.priceRange.length === 2) {
    query.price = {
      $gte: filterObject.priceRange[0],
      $lte: filterObject.priceRange[1],
    };
  }

  // Handle inStock
  if (typeof filterObject.inStock !== "undefined") {
    if (filterObject.inStock) {
      query.stock = { $gt: 0 };
    } else {
      query.stock = 0;
    }
  }

  // Handle hasReviews
  if (filterObject.hasReviews) {
    query.reviews = { $exists: true, $not: { $size: 0 } };
  }

  // Sorting
  let sortObj = {};
  if (filterObject.sortBy) {
    if (filterObject.sortBy === "PriceHighLow") {
      sortObj.price = -1;
    } else if (filterObject.sortBy === "PriceLowHigh") {
      sortObj.price = 1;
    } else if (filterObject.sortBy === "RatingHighLow") {
      sortObj.averageRating = -1;
    }
  }

  try {
    const filteredProducts = await Product.find(query).sort(sortObj);

    const maxPriceItem = await Product.findOne().sort({ price: -1 });

    const reply = {
      message: "Filtered products",
      filteredProducts,
      maxPrice: maxPriceItem.price,
    };
    res.status(200).json(reply);
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
  getFilteredProducts,
};
