import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    legacyId: { type: Number, unique: true, sparse: true },
    name: { type: String, required: true, trim: true, maxlength: 120, index: true },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    category: { type: String, required: true, trim: true, index: true },
    price: { type: Number, required: true, min: 0 },
    oldPrice: { type: Number, min: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviews: { type: Number, min: 0, default: 0 },
    badge: { type: String, trim: true, maxlength: 40 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    sheet: { type: String, enum: ["a", "b"], default: "a" },
    position: { type: String, default: "0% 0%" },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

productSchema.index({ name: "text", description: "text", category: "text" });

export const Product = mongoose.model("Product", productSchema);
