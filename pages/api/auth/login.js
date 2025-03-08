import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import User from "../../../models/User";
import { connectToDatabase } from "../../../lib/mongodb"; 

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  await connectToDatabase(); 

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials!" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.setHeader("Set-Cookie", serialize("token", token, { httpOnly: true, path: "/" }));

    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    // console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
