const Product = require("../models/productModel");
const Collection = require("../models/collectionModel");
const cloudinary = require("../utils/cloudinary");
const logger = require("../utils/logger");
const {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
} = require("../utils/errors");

//new product
//protected route - admin only
const newProduct = async (req, res, next) => {
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
    return next(
      new BadRequestError(
        "Please fill in all fields and upload at least 1 photo",
      ),
    );
  }

  if (!isAdmin) {
    return next(new ForbiddenError("Not an admin"));
  }

  try {
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
      onSale,
      salePrice,
    });

    const collectionToPopulate = await Collection.findById(
      newProduct.collectionId,
    );
    collectionToPopulate.products?.push(newProduct);
    await collectionToPopulate.save();

    Collection.findById(newProduct.collectionId)
      .populate("products")
      .exec(function (err, populatedCollection) {
        if (err) {
          return next(err);
        }
      });
    const reply = {
      message: "Product created",
      newProduct,
    };

    logger.info("Product created", {
      productId: newProduct._id,
      name: newProduct.name,
      price: newProduct.price,
      collectionId: newProduct.collectionId,
      adminId: req.userId,
    });

    res.status(201).json(reply);
  } catch (error) {
    next(error);
  }
};

//delete image from mongoDB database and cloudinary
//protected route - admin only
const deleteImage = async (req, res, next) => {
  const { productId } = req.params;
  const image = req.body;
  const { isAdmin } = req;

  if (!isAdmin) {
    return next(new ForbiddenError("Not an admin"));
  }

  if (!productId) {
    return next(new BadRequestError("No product id provided"));
  }

  try {
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
  } catch (error) {
    next(error);
  }
};

//get all products
//public route
const getAllProducts = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

//delete product
//protected route - admin only
const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  const { isAdmin } = req;

  try {
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
  } catch (error) {
    next(error);
  }
};

//update product
//protected route - admin only
const updateProduct = async (req, res, next) => {
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
    return next(new ForbiddenError("Not an admin"));
  }

  if (!productId) {
    return next(new BadRequestError("No product id provided"));
  }

  try {
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
      { new: true },
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
  } catch (error) {
    next(error);
  }
};

const getFilteredProducts = async (req, res, next) => {
  const { filterObject } = req.body;

  if (!filterObject) {
    return next(new BadRequestError("No filter object provided"));
  }

  let query = {};

  //isFeatured
  if (typeof filterObject.isFeatured !== "undefined") {
    query.isFeatured = filterObject.isFeatured;
  }

  //isDisplayed
  if (typeof filterObject.isDisplayed !== "undefined") {
    query.isDisplayed = filterObject.isDisplayed;
  }

  // searchQuery
  if (filterObject.searchQuery) {
    query.$or = [
      { name: { $regex: filterObject.searchQuery, $options: "i" } },
      { description: { $regex: filterObject.searchQuery, $options: "i" } },
    ];
  }

  if (filterObject.collections) {
    const selectedCollectionIds = Object.keys(filterObject?.collections).filter(
      (key) => filterObject.collections[key],
    );
    if (selectedCollectionIds.length > 0) {
      query.collectionId = { $in: selectedCollectionIds };
    }
  }

  //priceRange
  if (filterObject.priceRange && filterObject.priceRange.length === 2) {
    query.price = {
      $gte: filterObject.priceRange[0],
      $lte: filterObject.priceRange[1],
    };
  }

  //inStock
  if (typeof filterObject.inStock !== "undefined") {
    if (filterObject.inStock) {
      query.stock = { $gt: 0 };
    }
  }

  //onsale
  if (typeof filterObject.onSale !== "undefined") {
    if (filterObject.onSale) {
      query.onSale = true;
    }
  }

  //hasReviews
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

    logger.info("Filtered products received", {
      count: filteredProducts.length,
      maxPrice: maxPriceItem.price,
      ip: req.ip,
    });

    res.status(200).json(reply);
  } catch (error) {
    next(error);
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
