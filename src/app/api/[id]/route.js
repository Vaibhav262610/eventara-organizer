import { NextResponse } from "next/server";
import { connectToDatabase } from "@/db/db";
import Event from "@/models/event.models";
import FAQ from "@/models/faq.models";

export async function GET(req, { params }) {
    try {
        await connectToDatabase();
        const { id } = params;

        // Fetch event and FAQs separately
        const event = await Event.findById(id);
        const faqs = await FAQ.find({ eventId: id });

        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        return NextResponse.json({ event, faqs }, { status: 200 });
    } catch (error) {
        console.error("Error fetching event:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch event" }, { status: 500 });
    }
}
