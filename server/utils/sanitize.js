function sanitizeSearchQuery(query) {
  if (!query || typeof query !== "string") {
    return "";
  }

  return query
    .trim()
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .substring(0, 100);
}

function sanitizeFilters(filterObject) {
  if (!filterObject || typeof filterObject !== "object") {
    return {};
  }

  const sanitized = {};

  if (typeof filterObject.isFeatured === "boolean") {
    sanitized.isFeatured = filterObject.isFeatured;
  }

  if (typeof filterObject.isDisplayed === "boolean") {
    sanitized.isDisplayed = filterObject.isDisplayed;
  }

  if (typeof filterObject.inStock === "boolean") {
    sanitized.inStock = filterObject.inStock;
  }

  if (typeof filterObject.onSale === "boolean") {
    sanitized.onSale = filterObject.onSale;
  }

  if (typeof filterObject.hasReviews === "boolean") {
    sanitized.hasReviews = filterObject.hasReviews;
  }

  if (filterObject.searchQuery) {
    sanitized.searchQuery = sanitizeSearchQuery(filterObject.searchQuery);
  }

  if (
    Array.isArray(filterObject.priceRange) &&
    filterObject.priceRange.length === 2
  ) {
    sanitized.priceRange = filterObject.priceRange
      .slice(0, 2)
      .map((value) => Math.max(0, Number(value) || 0));
  }

  const validSort = ["PriceHighLow", "PriceLowHigh", "RatingHighLow"];
  if (validSort.includes(filterObject.sortBy)) {
    sanitized.sortBy = filterObject.sortBy;
  }

  if (
    filterObject.collections &&
    typeof filterObject.collections === "object"
  ) {
    sanitized.collections = {};
    Object.keys(filterObject.collections).forEach((key) => {
      if (/^[a-f\d]{24}$/i.test(key)) {
        sanitized.collections[key] = Boolean(filterObject.collections[key]);
      }
    });
  }

  return sanitized;
}

function sanitizeOrderFilters(filterObject) {
  if (!filterObject || typeof filterObject !== "object") {
    return {};
  }

  const sanitized = {};
  const validStatuses = [
    "All",
    "Cancelled",
    "In Production",
    "Delivered",
    "Shipped To Courier",
  ];

  if (
    typeof filterObject.orderStatus === "string" &&
    validStatuses.includes(filterObject.orderStatus)
  ) {
    sanitized.orderStatus = filterObject.orderStatus;
  }

  if (filterObject.emailAddress) {
    sanitized.emailAddress = sanitizeSearchQuery(filterObject.emailAddress);
  }

  if (filterObject.postCode) {
    sanitized.postCode = sanitizeSearchQuery(filterObject.postCode);
  }

  if (filterObject.shortId) {
    sanitized.shortId = String(filterObject.shortId).trim().substring(0, 32);
  }

  if (filterObject.courierTrackingNumber) {
    sanitized.courierTrackingNumber = String(filterObject.courierTrackingNumber)
      .trim()
      .substring(0, 64);
  }

  return sanitized;
}

module.exports = {
  sanitizeSearchQuery,
  sanitizeFilters,
  sanitizeOrderFilters,
};
