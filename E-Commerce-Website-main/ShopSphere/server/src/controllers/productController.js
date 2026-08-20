import { Product } from "../models/Product.js";
import { asyncHandler } from "../utils/asyncHandler.js";

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const listProducts = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 24, 1), 100);
  const filter = { active: true };

  if (req.query.category && req.query.category !== "All") filter.category = req.query.category;
  if (req.query.search) {
    const pattern = new RegExp(escapeRegex(req.query.search.trim()), "i");
    filter.$or = [{ name: pattern }, { category: pattern }, { description: pattern }];
  }
  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};
    if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
  }

  const sortOptions = {
    featured: { featured: -1, createdAt: -1 },
    low: { price: 1 },
    high: { price: -1 },
    rating: { rating: -1 },
    newest: { createdAt: -1 },
  };
  const sort = sortOptions[req.query.sort] || sortOptions.featured;

  const [items, total] = await Promise.all([
    Product.find(filter).sort(sort).skip((page - 1) * limit).limit(limit),
    Product.countDocuments(filter),
  ]);

  res.json({
    success: true,
    products: items,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product || !product.active) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json({ success: true, product });
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json({ success: true, product });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json({ success: true, message: "Product archived" });
});
