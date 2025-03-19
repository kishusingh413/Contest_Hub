import express from "express";
import { addBookmark, getBookmarks, removeBookmark } from "../controllers/bookmarkController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addBookmark);
router.get("/", authMiddleware, getBookmarks);
router.delete("/:contestId", authMiddleware, removeBookmark);

export default router;
