import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI; // Ensure this is defined in .env file

export const connectToDatabase = async () => {
    if (mongoose.connection.readyState >= 1) {
        return; // Already connected
    }
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Database connection failed");
    }
};
