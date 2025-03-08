import jwt from "jsonwebtoken";
import { parse } from "cookie";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const cookies = parse(req.headers.cookie || ""); 
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized! No token found." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ userId: decoded.userId });
  } catch (error) {
    // console.error("Auth Error:", error);
    res.status(401).json({ error: "Invalid or Expired Token" });
  }
}
