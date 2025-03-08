import bcrypt from "bcryptjs";
import User from "../../../models/User";
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await connectToDatabase();
  const { name, email, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.status(400).json({ error: "Email already exists" });
  }
}
