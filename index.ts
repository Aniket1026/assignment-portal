import express from "express";
import mongoose from "mongoose";
import { authRoutes } from "./src/routes/auth.route";
import { assignmentRoutes } from "./src/routes/assignment.route";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI
  )
  .then(() => console.log("Connected to MongoDB Successfully !!!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/v1", authRoutes);
app.use("/api/v1", assignmentRoutes);

const PORT = process.env.PORT;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}......`);
});

export default app;
