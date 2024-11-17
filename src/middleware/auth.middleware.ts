import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

// Define a new interface AuthRequest that extends the Request interface
export interface AuthRequest extends Request {
  user?: any;
}


// Inside the auth function, we try to get the token from the cookies in the request
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

// Inside adminAuth the function, we try to check if the user role is admin
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

// Inside userAuth the function, we try to check if the user role is user
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