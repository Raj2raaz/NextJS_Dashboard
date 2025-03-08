import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const token = req.headers.authorization;
  
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: "Protected data", userId: decoded.id });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
