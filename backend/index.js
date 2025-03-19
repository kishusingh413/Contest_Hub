import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contestRoutes from "./routes/contestRoutes.js";
import solutionRoutes from "./routes/solutionRoutes.js";

config();
connectDB();

const app = express();


// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cors());
app.use(json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/contests", contestRoutes);
app.use("/api/solutions", solutionRoutes);

app.get("/", (req, res) => {
    res.send("Contest Tracker API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
