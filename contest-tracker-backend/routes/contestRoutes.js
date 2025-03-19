import express from "express";
import { getContests } from "../controllers/contestController.js";
import { getCodeChefContests } from "../services/codechefScraper.js";
import { getLeetCodeContests } from "../services/leetcodeScraper.js";

const router = express.Router();
router.get("/codechef", async (req, res) => {
    const contests = await getCodeChefContests();
    res.json(contests);
});
router.get("/leetcode", async (req, res) => {
    const contests = await getLeetCodeContests();
    res.json(contests);
  });
router.get("/", getContests);

export default router;
