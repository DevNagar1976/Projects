import mongoose from "mongoose";

export async function connectDatabase(uri) {
  if (!uri) {
    console.warn("MONGODB_URI is not set; continuing without a database connection.");
    return;
  }

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.warn(`MongoDB connection failed: ${error.message}`);
  }
}

export async function disconnectDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}
