import { NextResponse } from "next/server";
import { connectToDatabase } from "@/db/db";
import Event from "@/models/event.models";
import FAQ from "@/models/faq.models"; // ✅ Import FAQ model

export async function POST(req) {
    try {
        await connectToDatabase(); // Connect to MongoDB
        const body = await req.json(); // Parse request body

        // ✅ Create event first
        const newEvent = await Event.create({
            name: body.name,
            tagline: body.tagline,
            about: body.about,
            participants: body.participants,
            minTeamSize: body.minTeamSize,
            maxTeamSize: body.maxTeamSize
        });

        let insertedFaqs = [];

        // ✅ Save each FAQ separately in FAQ collection
        if (Array.isArray(body.faqs) && body.faqs.length > 0) {
            const faqsToInsert = body.faqs.map(faq => ({
                eventId: newEvent._id, // 🔗 Link FAQ to Event
                question: faq.question,
                answer: faq.answer
            }));

            insertedFaqs = await FAQ.insertMany(faqsToInsert); // 🚀 Save all FAQs in one go
        }

        return NextResponse.json({
            message: "Event created with FAQs",
            event: newEvent,
            faqs: insertedFaqs // ✅ Return FAQs in response
        }, { status: 201 });

    } catch (error) {
        console.error("Error saving event and FAQs:", error);
        return NextResponse.json({ error: error.message || "Failed to create event" }, { status: 500 });
    }
}
