import { Router } from "express";
import { body } from "express-validator";
import { getMe, login, register } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validate.js";

const router = Router();

router.post(
  "/register",
  [
    body("name").trim().isLength({ min: 2, max: 80 }).withMessage("Name must be 2 to 80 characters"),
    body("email").isEmail().normalizeEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 8, max: 72 })
      .matches(/^(?=.*[A-Za-z])(?=.*\d)/)
      .withMessage("Password must contain letters and a number"),
  ],
  validateRequest,
  register,
);

router.post(
  "/login",
  [body("email").isEmail().normalizeEmail(), body("password").notEmpty()],
  validateRequest,
  login,
);

router.get("/me", protect, getMe);

export default router;
