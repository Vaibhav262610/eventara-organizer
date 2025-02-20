import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import Event from '@/models/event.models';

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        throw error; // Re-throw to handle in POST
    }
};

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        console.log('🟢 Received Event Data:', body);

        // Validate required fields
        if (!body.name || !body.tagline || !body.about || !body.participants ||
            !body.minTeamSize || !body.maxTeamSize || !body.contactEmail) {
            return NextResponse.json({
                message: 'Missing required fields',
                error: 'Validation Error'
            }, { status: 400 });
        }

        // Process all fields from the request body
        const processedEventData = {
            name: String(body.name),
            tagline: String(body.tagline),
            about: String(body.about),
            participants: String(body.participants),
            minTeamSize: Number(body.minTeamSize),
            maxTeamSize: Number(body.maxTeamSize),
            contactEmail: String(body.contactEmail),
            platforms: body.platforms.map(platform => ({
                name: String(platform.name),
                url: String(platform.url)
            })),
            applicationOpenDate: new Date(body.applicationOpenDate),
            applicationOpenTime: String(body.applicationOpenTime),
            hackathonStartDate: new Date(body.hackathonStartDate),
            submissionDeadlineDate: new Date(body.submissionDeadlineDate),
            announcementResultsDate: new Date(body.announcementResultsDate),
            partners: body.partners.map(partner => String(partner)),
            prizes: body.prizes.map(prize => String(prize)),
            faqs: body.faqs.map(faq => ({
                question: String(faq.question),
                answer: String(faq.answer)
            }))
        };

        console.log('🟡 Processed Event Data Before Save:', processedEventData);

        const newEvent = new Event(processedEventData);

        // Validate against schema
        const validationError = newEvent.validateSync();
        if (validationError) {
            console.error('❌ Validation Error:', validationError);
            return NextResponse.json({
                message: 'Invalid event data',
                error: validationError.message
            }, { status: 400 });
        }

        const savedEvent = await newEvent.save();
        console.log('🟢 Saved Event in DB:', savedEvent);

        if (!savedEvent) {
            throw new Error('Failed to save event to database');
        }

        return NextResponse.json({
            message: 'Event created successfully!',
            event: savedEvent
        }, { status: 201 });

    } catch (error) {
        console.error('❌ Error saving event:', error);
        return NextResponse.json({
            message: 'Failed to create event',
            error: error.message
        }, { status: 500 });
    }
}
