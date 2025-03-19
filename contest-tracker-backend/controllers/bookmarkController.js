import Bookmark from "../models/Bookmark.js";

// Add a bookmark
export const addBookmark = async (req, res) => {
    const { contestId, contestName, platform, contestUrl, startTime } = req.body;

    try {
        const existingBookmark = await Bookmark.findOne({ userId: req.user.id, contestId });

        if (existingBookmark) {
            return res.status(400).json({ message: "Already bookmarked" });
        }

        const newBookmark = new Bookmark({
            userId: req.user.id,
            contestId,
            contestName,
            platform,
            contestUrl,
            startTime
        });

        await newBookmark.save();
        res.json({ message: "Contest bookmarked successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get user's bookmarks
export const getBookmarks = async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({ userId: req.user.id });
        res.json(bookmarks);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Remove a bookmark
export const removeBookmark = async (req, res) => {
    try {
        await Bookmark.findOneAndDelete({ userId: req.user.id, contestId: req.params.contestId });
        res.json({ message: "Bookmark removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
