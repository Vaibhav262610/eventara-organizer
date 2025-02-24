import { NextResponse } from "next/server";
import { connectToDatabase } from "@/db/db"; // Adjust path based on your project structure
import mongoose from "mongoose";

// Define Schema
const eventSchema = new mongoose.Schema({
    hackathonName: String,
    university: String,
    participationFee: String,
});

// Create a model if it doesn't exist
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

// Connect to DB and handle POST request
export async function POST(req) {
    try {
        await connectToDatabase();
        const body = await req.json();

        const { hackathonName, university, participationFee } = body;
        if (!hackathonName || !university) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newEvent = new Event({ hackathonName, university, participationFee });
        await newEvent.save();

        return NextResponse.json({ message: "Event created successfully!" }, { status: 201 });
    } catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json({ error: "Error saving event" }, { status: 500 });
    }
}
