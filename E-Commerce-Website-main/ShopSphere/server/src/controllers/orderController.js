import { Cart } from "../models/Cart.js";
import { Order } from "../models/Order.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { calculateCartTotals } from "../utils/cartTotals.js";

export const createOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
  const availableItems = cart?.items.filter((item) => item.product?.active) || [];
  if (!availableItems.length) {
    res.status(400);
    throw new Error("Your cart is empty");
  }

  for (const item of availableItems) {
    if (item.quantity > item.product.stock) {
      res.status(409);
      throw new Error(`${item.product.name} does not have enough stock`);
    }
  }

  const items = availableItems.map((item) => ({
    product: item.product.id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
  }));
  const totals = calculateCartTotals(items);
  const order = await Order.create({
    user: req.user.id,
    items,
    ...totals,
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod || "cod",
  });

  await Promise.all(
    availableItems.map((item) =>
      item.product.updateOne({ $inc: { stock: -item.quantity } }),
    ),
  );
  cart.items = [];
  await cart.save();

  res.status(201).json({ success: true, order });
});

export const myOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json({ success: true, orders });
});

export const allOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
  res.json({ success: true, orders });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true },
  );
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  res.json({ success: true, order });
});
