import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from "../controllers/productController.js";
import { adminOnly, protect } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validate.js";

const router = Router();
const productRules = [
  body("name").trim().isLength({ min: 2, max: 120 }),
  body("description").trim().isLength({ min: 10, max: 1000 }),
  body("category").trim().notEmpty(),
  body("price").isFloat({ min: 0 }).toFloat(),
  body("stock").isInt({ min: 0 }).toInt(),
];
const productIdRule = param("id").isMongoId().withMessage("Enter a valid product id");

router.get("/", listProducts);
router.get("/:id", productIdRule, validateRequest, getProduct);
router.post("/", protect, adminOnly, productRules, validateRequest, createProduct);
router.put(
  "/:id",
  protect,
  adminOnly,
  productIdRule,
  productRules,
  validateRequest,
  updateProduct,
);
router.delete("/:id", protect, adminOnly, productIdRule, validateRequest, deleteProduct);

export default router;
