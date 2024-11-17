import express from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { Request, Response } from "express";

const router = express.Router();

router.post(
  "/register",
  [
    body("username").isString().trim().notEmpty(),
    body("password").isLength({ min: 6 }),
    body("role").isIn(["user", "admin"]),
  ],
  async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          message: "Error in Validation of register route",
          errors: errors.array(),
        });
        return;
      }

      const { username, password, role } = req.body;
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        res.status(400).json({ error: "Username already exists" });
        return;
      }

      const user = new User({ username, password, role });
      await user.save();

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("token",`Bearer  ${token}`, { httpOnly: true, secure: true });
      res.status(201).json({ user });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Registration failed", error: error.message });
    }
  }
);

router.post(
  "/login",
  [
    body("username").isString().trim().notEmpty(),
    body("password").isString().notEmpty(),
  ],
  async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res
          .status(400)
          .json({
            message: "Error in Validation of login route",
            errors: errors.array(),
          });
      }

      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user || !(await user.comparePassword(password))) {
        res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("token", `Bearer  ${token}`, { httpOnly: true, secure: true });
      res.json({ user });
    } catch (error) {
      res.status(400).json({ message: "Login failed", error: error.message });
    }
  }
);

router.post("/logout", async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
  } catch (error) {
    res.status(500).json({ message: "Failed to logout", error: error.message });
  }
});

export const authRoutes = router;
