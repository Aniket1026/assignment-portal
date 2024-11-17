import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export interface AuthRequest extends Request {
  user?: any;
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["token"]?.replace("Bearer ", "");
    if (!token) {
      throw new Error("Error in authentication");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      _id: string;
    };
    const user = await User.findById(decoded._id);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Please authenticate", error: error.message });
  }
};

export const adminAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.role !== "admin") {
      throw new Error();
    }
    next();
  } catch (error) {
    res.status(403).json({ error: "Admin access required" });
  }
};

export const userAuth = async(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.role !== "user") {
      throw new Error();
    }
    next();
  } catch (error) {
    res.status(403).json({ error: "User access required" });
  }
}