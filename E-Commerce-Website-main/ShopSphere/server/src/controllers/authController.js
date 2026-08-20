import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { signToken } from "../utils/token.js";

function authResponse(user) {
  return {
    token: signToken(user.id),
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.exists({ email: email.toLowerCase() });
  if (exists) {
    res.status(409);
    throw new Error("An account with this email already exists");
  }
  const user = await User.create({ name, email, password });
  res.status(201).json({ success: true, ...authResponse(user) });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error("Incorrect email or password");
  }
  res.json({ success: true, ...authResponse(user) });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    user: { id: req.user.id, name: req.user.name, email: req.user.email, role: req.user.role },
  });
});
