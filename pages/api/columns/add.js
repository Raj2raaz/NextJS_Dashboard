import { connectToDatabase } from "../../../lib/mongodb";
import Column from "../../../models/Column";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await connectToDatabase();
  const { userId, column } = req.body;

  let userColumns = await Column.findOne({ userId });

  if (!userColumns) {
    userColumns = new Column({ userId, columns: [] });
  }

  userColumns.columns.push(column);
  await userColumns.save();
  res.json(userColumns);
}
