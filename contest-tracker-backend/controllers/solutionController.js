import Solution from "../models/Solution.js";

// Add a solution link
export const addSolution = async (req, res) => {
  try {
    const { contestId, platform, youtubeLink } = req.body;

    if (!contestId || !platform || !youtubeLink) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const solution = new Solution({
      contestId,
      platform,
      youtubeLink,
      addedBy: req.user._id,
    });

    await solution.save();
    res.status(201).json(solution);
  } catch (error) {
    res.status(500).json({ message: "Error adding solution link", error: error.message });
  }
};

// Get solution links for a contest
export const getSolutions = async (req, res) => {
  try {
    const { contestId } = req.params;
    const solutions = await Solution.find({ contestId }).populate("addedBy", "name email");
    res.json(solutions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching solution links", error: error.message });
  }
};

// Update a solution link
export const updateSolution = async (req, res) => {
  try {
    const { id } = req.params;
    const { youtubeLink } = req.body;

    const solution = await Solution.findById(id);
    if (!solution) return res.status(404).json({ message: "Solution not found" });

    if (solution.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    solution.youtubeLink = youtubeLink || solution.youtubeLink;
    await solution.save();
    res.json(solution);
  } catch (error) {
    res.status(500).json({ message: "Error updating solution link", error: error.message });
  }
};

// Delete a solution link
export const deleteSolution = async (req, res) => {
  try {
    const { id } = req.params;
    const solution = await Solution.findById(id);

    if (!solution) return res.status(404).json({ message: "Solution not found" });

    if (solution.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await solution.deleteOne();
    res.json({ message: "Solution link removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting solution link", error: error.message });
  }
};
