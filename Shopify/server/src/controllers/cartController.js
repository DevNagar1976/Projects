import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { calculateCartTotals } from "../utils/cartTotals.js";

async function getPopulatedCart(userId) {
  let cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  if (!cart.populated("items.product")) await cart.populate("items.product");
  return cart;
}

function serializeCart(cart) {
  const items = cart.items
    .filter((item) => item.product?.active)
    .map((item) => ({ product: item.product, quantity: item.quantity }));
  const totals = calculateCartTotals(
    items.map((item) => ({ price: item.product.price, quantity: item.quantity })),
  );
  return { id: cart.id, items, ...totals };
}

export const getCart = asyncHandler(async (req, res) => {
  const cart = await getPopulatedCart(req.user.id);
  res.json({ success: true, cart: serializeCart(cart) });
});

export const addItem = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = await Product.findOne({ _id: productId, active: true });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const cart = await Cart.findOne({ user: req.user.id });
  const current = cart || new Cart({ user: req.user.id, items: [] });
  const item = current.items.find((entry) => entry.product.toString() === productId);
  const nextQuantity = (item?.quantity || 0) + Number(quantity);
  if (nextQuantity > product.stock) {
    res.status(409);
    throw new Error(`Only ${product.stock} item(s) are available`);
  }
  if (item) item.quantity = nextQuantity;
  else current.items.push({ product: productId, quantity });
  await current.save();
  await current.populate("items.product");
  res.status(201).json({ success: true, cart: serializeCart(current) });
});

export const updateItem = asyncHandler(async (req, res) => {
  const quantity = Number(req.body.quantity);
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }
  const item = cart.items.find((entry) => entry.product.toString() === req.params.productId);
  if (!item) {
    res.status(404);
    throw new Error("Cart item not found");
  }
  const product = await Product.findById(req.params.productId);
  if (!product || quantity > product.stock) {
    res.status(409);
    throw new Error(`Only ${product?.stock || 0} item(s) are available`);
  }
  item.quantity = quantity;
  await cart.save();
  await cart.populate("items.product");
  res.json({ success: true, cart: serializeCart(cart) });
});

export const removeItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user.id },
    { $pull: { items: { product: req.params.productId } } },
    { new: true },
  ).populate("items.product");
  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }
  res.json({ success: true, cart: serializeCart(cart) });
});

export const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user.id },
    { $set: { items: [] } },
    { new: true, upsert: true },
  ).populate("items.product");
  res.json({ success: true, cart: serializeCart(cart) });
});
