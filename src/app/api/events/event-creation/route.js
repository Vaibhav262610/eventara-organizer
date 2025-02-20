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
    }
};

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        console.log('🟢 Received Event Data:', body);

        // Only saving the "name" field
        const processedEventData = {
            name: String(body.name) || 'Untitled Event', // Default to prevent empty name
        };

        console.log('🟡 Processed Event Data Before Save:', processedEventData);

        const newEvent = new Event(processedEventData);
        const savedEvent = await newEvent.save();

        console.log('🟢 Saved Event in DB:', savedEvent);

        return NextResponse.json({ message: 'Event created successfully!', event: savedEvent });
    } catch (error) {
        console.error('❌ Error saving event:', error);
        return NextResponse.json({ message: 'Failed to create event', error }, { status: 500 });
    }
}
