import { NextResponse } from "next/server";
import { connectToDatabase } from "@/db/db";
import Event from "@/models/event.models";
import FAQ from "@/models/faq.models";
import PARTNERS from "@/models/partners.models";
import PRIZES from "@/models/prizes.models";

export async function POST(req) {
    try {
        await connectToDatabase(); // Connect to MongoDB
        const body = await req.json(); // Parse request body

        let insertedFaqs = [];
        let insertedPartners = [];
        let insertedPrizes = [];

        // Create event first (without faqs, partners, prizes)
        const newEvent = await Event.create({
            name: body.name,
            tagline: body.tagline,
            about: body.about,
            participants: body.participants,
            minTeamSize: body.minTeamSize,
            maxTeamSize: body.maxTeamSize,
            location: body.location,
            endDate: body.endDate,
            startDate: body.startDate,
            status: body.status,
            prizes: [],
            faqs: [],
            partners: [],
        });

        // ✅ Save FAQs and store their IDs
        if (Array.isArray(body.faqs) && body.faqs.length > 0) {
            insertedFaqs = await FAQ.insertMany(
                body.faqs.map(faq => ({
                    eventId: newEvent._id,
                    question: faq.question,
                    answer: faq.answer
                }))
            );
        }

        // ✅ Save Partners and store their IDs
        if (Array.isArray(body.partners) && body.partners.length > 0) {
            insertedPartners = await PARTNERS.insertMany(
                body.partners.map(partner => ({
                    eventId: newEvent._id,
                    name: partner.name,
                    type: partner.type,
                    description: partner.description,
                    // logoUrl: partner.logoUrl || null
                }))
            );
        }

        // ✅ Save Prizes and store their IDs
        if (Array.isArray(body.prizes) && body.prizes.length > 0) {
            insertedPrizes = await PRIZES.insertMany(
                body.prizes.map(prize => ({
                    eventId: newEvent._id,
                    title: prize.title,
                    amount: prize.amount,
                    description: prize.description,
                    // logoUrl: partner.logoUrl || null
                }))
            );
        }
        // let prizesData = newEvent.prizes

        // ✅ Update the Event with inserted IDs
        newEvent.faqs = insertedFaqs.map(faq => faq._id);
        newEvent.partners = insertedPartners.map(partner => partner._id);
        // hereeeeee erorrrrrr
        newEvent.prizes = insertedPrizes.map(prize => prize._id);
        await newEvent.save(); // Save the updated event

        return NextResponse.json({
            message: "Event created with FAQs, Partners, and Prizes",
            event: newEvent,
            // prizes: newEvent.prizes
            // faqs: insertedFaqs,
            // partners: insertedPartners,
            // prizes: insertedPrizes
        }, { status: 201 });

    } catch (error) {
        console.error("Error saving event and related data:", error);
        return NextResponse.json({ error: error.message || "Failed to create event" }, { status: 500 });
    }
}
