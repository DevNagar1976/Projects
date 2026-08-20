import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/token.js";

export const protect = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization || "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : null;

  if (!token) {
    res.status(401);
    throw new Error("Please log in to continue");
  }

  const payload = verifyToken(token);
  const user = await User.findById(payload.sub);
  if (!user) {
    res.status(401);
    throw new Error("User for this token no longer exists");
  }

  req.user = user;
  next();
});

export function adminOnly(req, res, next) {
  if (req.user?.role !== "admin") {
    res.status(403);
    return next(new Error("Admin access is required"));
  }
  return next();
}
