import express from "express";
import { addSolution, getSolutions, updateSolution, deleteSolution } from "../controllers/solutionController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Ensure user authentication

const router = express.Router();

// Routes
router.post("/add", authMiddleware, addSolution);
router.get("/:contestId", getSolutions);
router.put("/:id", authMiddleware, updateSolution);
router.delete("/:id", authMiddleware, deleteSolution);

export default router;
