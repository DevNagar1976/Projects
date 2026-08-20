import { Router } from "express";
import { body, param } from "express-validator";
import { allOrders, createOrder, myOrders, updateOrderStatus } from "../controllers/orderController.js";
import { adminOnly, protect } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validate.js";

const router = Router();
router.use(protect);

router.get("/mine", myOrders);
router.post(
  "/",
  [
    body("shippingAddress.fullName").trim().isLength({ min: 2, max: 80 }),
    body("shippingAddress.phone").trim().matches(/^[0-9+\- ]{8,16}$/),
    body("shippingAddress.address").trim().isLength({ min: 5, max: 200 }),
    body("shippingAddress.city").trim().notEmpty(),
    body("shippingAddress.state").trim().notEmpty(),
    body("shippingAddress.postalCode").trim().matches(/^[0-9]{6}$/),
    body("paymentMethod").optional().isIn(["cod", "card"]),
  ],
  validateRequest,
  createOrder,
);
router.get("/", adminOnly, allOrders);
router.patch(
  "/:id/status",
  [param("id").isMongoId(), body("status").isIn(["placed", "confirmed", "shipped", "delivered", "cancelled"])],
  validateRequest,
  adminOnly,
  updateOrderStatus,
);

export default router;
