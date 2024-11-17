import express from "express";
import mongoose from "mongoose";
import { authRoutes } from "./src/routes/auth.route";
import { assignmentRoutes } from "./src/routes/assignment.route";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(
    process.env.MONGODB_URI
  )
  .then(() => console.log("Connected to MongoDB Successfully !!!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/v1", authRoutes);
app.use("/api/v1", assignmentRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}......`);
});

export default app;
