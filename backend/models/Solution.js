import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema({
  contestId: { type: mongoose.Schema.Types.ObjectId, ref: "Contest", required: true },
  platform: { type: String, required: true }, // Codeforces, Leetcode, CodeChef
  youtubeLink: { type: String, required: true },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User who added the link
}, { timestamps: true });

const Solution = mongoose.model("Solution", solutionSchema);
export default Solution;
