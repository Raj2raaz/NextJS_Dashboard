import mongoose from "mongoose";

const ColumnSchema = new mongoose.Schema({
  userId: String,
  columns: [{ name: String, type: String }],
});

export default mongoose.models.Column || mongoose.model("Column", ColumnSchema);
