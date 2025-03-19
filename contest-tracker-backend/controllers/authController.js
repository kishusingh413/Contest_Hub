import User from "../models/User.js";
import jwt from "jsonwebtoken"; // Import as default
import { compare } from "bcryptjs";

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Signup Controller
 export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        user = new User({ username, email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true }).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Login Controller
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = generateToken(user);
        console.log("Token: ", token);
        res.cookie("token", token, { httpOnly: true }).json({ message: "Login successful" , token, user});
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Logout Controller
export const logoutUser = (req, res) => {
    res.clearCookie("token").json({ message: "Logged out successfully" });
};

// export default { registerUser, loginUser, logoutUser };
