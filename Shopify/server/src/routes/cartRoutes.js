import { Router } from "express";
import { body, param } from "express-validator";
import { addItem, clearCart, getCart, removeItem, updateItem } from "../controllers/cartController.js";
import { protect } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validate.js";

const router = Router();
router.use(protect);

router.get("/", getCart);
router.post(
  "/",
  [body("productId").isMongoId(), body("quantity").optional().isInt({ min: 1, max: 99 }).toInt()],
  validateRequest,
  addItem,
);
router.put(
  "/:productId",
  [param("productId").isMongoId(), body("quantity").isInt({ min: 1, max: 99 }).toInt()],
  validateRequest,
  updateItem,
);
router.delete("/:productId", param("productId").isMongoId(), validateRequest, removeItem);
router.delete("/", clearCart);

export default router;
