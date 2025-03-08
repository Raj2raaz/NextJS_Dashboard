import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import User from "../../../models/User";
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  await connectToDatabase();

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    // console.log("Checking if user exists:", email);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // console.error("User already exists:", email);
      return res.status(400).json({ error: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.setHeader("Set-Cookie", serialize("token", token, { httpOnly: true, path: "/" }));

    // console.log("User registered successfully:", email);
    res.status(201).json({ message: "User registered successfully!", token });
  } catch (error) {
    // console.error("Registration Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
