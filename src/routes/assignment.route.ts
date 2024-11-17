import express from "express";
import { Assignment } from "../models/assignment.model";
import { User } from "../models/user.model";
import { auth, adminAuth, AuthRequest,userAuth } from "../middleware/auth.middleware";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get("/admins", auth,userAuth, async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }, { password: 0 });
    res.json(admins);
  } catch (error) {
    res.status(500).json({message:"Error in getting all admins ", error: error.message });
  }
});

router.post(
  "/upload",
  [auth, body("task").isString().trim().notEmpty(), body("admin").isString().trim().notEmpty()],
  async (req: AuthRequest, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({message:"Error in validation", errors: errors.array() });
      }

      const { task, admin } = req.body;
      const assignment = new Assignment({
        userId: req.user._id,
        task,
        admin,
      });
      await assignment.save();
      res.status(201).json(assignment);
    } catch (error) {
      res.status(400).json({ message: "Failed to upload assignment" , error: error.message});
    }
  }
);


router.get("/assignments", [auth, adminAuth], async (req: AuthRequest, res) => {
  try {
    const assignments = await Assignment.find({ admin: req.user.username })
      .sort({ createdAt: -1 });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

router.post(
  "/assignments/:id/accept",
  [auth, adminAuth],
  async (req: AuthRequest, res) => {
    try {
      const assignment = await Assignment.findOne({
        _id: req.params.id,
        admin: req.user.username,
      });

      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      assignment.status = "accepted";
      await assignment.save();
      res.json({ message: "Assignment accepted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to accept assignment" });
    }
  }
);

router.post(
  "/assignments/:id/reject",
  [auth, adminAuth],
  async (req: AuthRequest, res) => {
    try {
      const assignment = await Assignment.findOne({
        _id: req.params.id,
        admin: req.user.username,
      });

      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      assignment.status = "rejected";
      await assignment.save();
      res.json({ message: "Assignment rejected"});
    } catch (error) {
      res.status(500).json({ error: "Failed to reject assignment" });
    }
  }
);

export const assignmentRoutes = router;