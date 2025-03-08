import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI; 

if (!MONGODB_URI) {
  throw new Error("ERROR: Please define the MONGODB_URI in .env.local");
}

let cached = global.mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) {
    // console.log("Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    // console.log("Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  cached.conn = await cached.promise;
  // console.log("MongoDB Connected Successfully!");
  return cached.conn;
}
