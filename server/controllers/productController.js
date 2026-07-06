const Product = require("../models/productModel");
const Collection = require("../models/collectionModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");
const logger = require("../utils/logger");
const { sanitizeFilters } = require("../utils/sanitize");
const {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
} = require("../utils/errors");

//new product
//protected route - admin only
const newProduct = asyncHandler(async (req, res) => {
  const {
    collectionId,
    name,
    price,
    images,
    description,
    stock,
    onSale,
    salePrice,
    isDisplayed,
    isFeatured,
  } = req.body;
  const { isAdmin } = req;

  if (!collectionId || !name || !price || !images || !description || !stock) {
    throw new BadRequestError(
      "Please fill in all fields and upload at least 1 photo",
    );
  }

  if (!isAdmin) {
    throw new ForbiddenError("Not an admin");
  }

  const foundProduct = await Product.findOne({ name });

  if (foundProduct) {
    throw new ConflictError("Product already exists");
  }

  //cloudinary
  const imageUploadResult = await cloudinary.uploader.upload(images, {
    folder: "products",
    width: 400,
    height: 300,
    crop: "fill",
    gravity: "center",
    eager: [{ width: 1000, height: 600, crop: "fill", gravity: "face:auto" }],
  });

  const createdProduct = await Product.create({
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
    onSale,
    salePrice,
  });

  const collectionToPopulate = await Collection.findById(
    createdProduct.collectionId,
  );
  collectionToPopulate.products?.push(createdProduct);
  await collectionToPopulate.save();

  const reply = {
    message: "Product created",
    newProduct: createdProduct,
  };

  logger.info("Product created", {
    productId: createdProduct._id,
    name: createdProduct.name,
    price: createdProduct.price,
    collectionId: createdProduct.collectionId,
    adminId: req.userId,
  });

  res.status(201).json(reply);
});

//delete image from mongoDB database and cloudinary
//protected route - admin only
const deleteImage = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const image = req.body;
  const { isAdmin } = req;

  if (!isAdmin) {
    throw new ForbiddenError("Not an admin");
  }

  if (!productId) {
    throw new BadRequestError("No product id provided");
  }

  const productToUpdate = await Product.findById(productId);

  if (!productToUpdate) {
    throw new NotFoundError("Product", productId);
  }

  const imageToRemove = productToUpdate.images.find(
    (img) => img._id == image._id,
  );

  if (!imageToRemove) {
    throw new NotFoundError("Image", image._id);
  }

  await cloudinary.uploader.destroy(image.public_id);

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { $pull: { images: { _id: image._id } } },
    { new: true },
  );

  const reply = {
    message: "Image deleted",
    updatedProduct,
  };

  logger.info("Image deleted", {
    productId: updatedProduct._id,
    imagePublicId: image.public_id,
    adminId: req.userId,
  });

  res.json(reply);
});

//get all products
//public route
const getAllProducts = asyncHandler(async (req, res) => {
  const allProducts = await Product.find({});
  const reply = {
    message: "All products",
    allProducts,
  };

  logger.info("All products received", {
    count: allProducts.length,
    ip: req.ip,
  });

  res.status(200).json(reply);
});

//delete product
//protected route - admin only
const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { isAdmin } = req;

  if (!isAdmin) {
    throw new ForbiddenError("Not an admin");
  }

  if (!productId) {
    throw new BadRequestError("No product id provided");
  }

  const productToDelete = await Product.findById(productId);

  if (!productToDelete) {
    throw new NotFoundError("Product", productId);
  }

  const deletedProduct = await Product.findByIdAndDelete(productId);

  const collectionToUpdate = await Collection.findById(
    deletedProduct.collectionId,
  );
  collectionToUpdate.products.pull(deletedProduct);
  await collectionToUpdate.save();

  const reply = {
    message: "Product deleted",
    deletedProduct,
    collectionToUpdate,
  };

  logger.info("Product deleted", {
    productId: deletedProduct._id,
    productName: deletedProduct.name,
    collectionId: deletedProduct.collectionId,
    adminId: req.userId,
  });

  res.json(reply);
});

//update product
//protected route - admin only
const updateProduct = asyncHandler(async (req, res) => {
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
    onSale,
    salePrice,
  } = req.body;
  const { isAdmin } = req;

  if (!isAdmin) {
    throw new ForbiddenError("Not an admin");
  }

  if (!productId) {
    throw new BadRequestError("No product id provided");
  }

  const productToUpdate = await Product.findById(productId);

  if (!productToUpdate) {
    throw new NotFoundError("Product", productId);
  }

  const oldCollectionId = productToUpdate.collectionId;

  if (oldCollectionId !== collectionId) {
    await Collection.updateOne(
      { _id: oldCollectionId },
      { $pull: { products: productId } },
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
    onSale,
    salePrice,
  };

  if (images) {
    const imageUploadResult = await cloudinary.uploader.upload(images, {
      folder: "products",
      width: 400,
      height: 300,
      crop: "fill",
      gravity: "center",
      eager: [{ width: 1000, height: 600, crop: "fill", gravity: "face:auto" }],
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
    {
      new: true,
    },
  );

  if (oldCollectionId !== collectionId) {
    await Collection.updateOne(
      { _id: collectionId },
      { $push: { products: productId } },
    );
  }

  const reply = {
    message: "Product updated",
    updatedProduct,
    oldCollectionId,
  };

  logger.info("Product updated", {
    productId: updatedProduct._id,
    productName: updatedProduct.name,
    oldCollectionId,
    newCollectionId: updatedProduct.collectionId,
    adminId: req.userId,
  });

  res.json(reply);
});

/**
 * Return products filtered by search, collection, stock, sale, review presence,
 * and sort options passed via filterObject.
 */
const getFilteredProducts = asyncHandler(async (req, res) => {
  const { filterObject } = req.body;

  if (!filterObject) {
    throw new BadRequestError("No filter object provided");
  }

  const sanitizedFilterObject = sanitizeFilters(filterObject);

  let query = {};

  //isFeatured
  if (typeof sanitizedFilterObject.isFeatured !== "undefined") {
    query.isFeatured = sanitizedFilterObject.isFeatured;
  }

  //isDisplayed
  if (typeof sanitizedFilterObject.isDisplayed !== "undefined") {
    query.isDisplayed = sanitizedFilterObject.isDisplayed;
  }

  // searchQuery
  if (sanitizedFilterObject.searchQuery) {
    query.$or = [
      { name: { $regex: sanitizedFilterObject.searchQuery, $options: "i" } },
      {
        description: {
          $regex: sanitizedFilterObject.searchQuery,
          $options: "i",
        },
      },
    ];
  }

  if (sanitizedFilterObject.collections) {
    const selectedCollectionIds = Object.keys(
      sanitizedFilterObject?.collections,
    ).filter((key) => sanitizedFilterObject.collections[key]);
    if (selectedCollectionIds.length > 0) {
      query.collectionId = { $in: selectedCollectionIds };
    }
  }

  //priceRange
  if (
    sanitizedFilterObject.priceRange &&
    sanitizedFilterObject.priceRange.length === 2
  ) {
    query.price = {
      $gte: sanitizedFilterObject.priceRange[0],
      $lte: sanitizedFilterObject.priceRange[1],
    };
  }

  //inStock
  if (typeof sanitizedFilterObject.inStock !== "undefined") {
    if (sanitizedFilterObject.inStock) {
      query.stock = { $gt: 0 };
    }
  }

  //onsale
  if (typeof sanitizedFilterObject.onSale !== "undefined") {
    if (sanitizedFilterObject.onSale) {
      query.onSale = true;
    }
  }

  //hasReviews
  if (sanitizedFilterObject.hasReviews) {
    query.reviews = { $exists: true, $not: { $size: 0 } };
  }

  // Sorting
  let sortObj = {};
  if (sanitizedFilterObject.sortBy) {
    if (sanitizedFilterObject.sortBy === "PriceHighLow") {
      sortObj.price = -1;
    } else if (sanitizedFilterObject.sortBy === "PriceLowHigh") {
      sortObj.price = 1;
    } else if (sanitizedFilterObject.sortBy === "RatingHighLow") {
      sortObj.averageRating = -1;
    }
  }

  const filteredProducts = await Product.find(query).sort(sortObj);

  const maxPriceItem = await Product.findOne().sort({ price: -1 });
  const maxPrice = maxPriceItem ? maxPriceItem.price : 0;

  const reply = {
    message: "Filtered products",
    filteredProducts,
    maxPrice,
  };

  logger.info("Filtered products received", {
    count: filteredProducts.length,
    maxPrice,
    ip: req.ip,
  });

  res.status(200).json(reply);
});

module.exports = {
  newProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  deleteImage,
  getFilteredProducts,
};
