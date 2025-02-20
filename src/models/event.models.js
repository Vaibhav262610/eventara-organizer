import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    about: { type: String, required: true },
    participants: { type: String, required: true },
    minTeamSize: { type: Number, required: true },
    maxTeamSize: { type: Number, required: true },
    contactEmail: { type: String, required: true },
    platforms: [{
        name: { type: String, required: true },
        url: { type: String, required: true }
    }],
    applicationOpenDate: { type: Date, required: true },
    applicationOpenTime: { type: String, required: true },
    hackathonStartDate: { type: Date, required: true },
    submissionDeadlineDate: { type: Date, required: true },
    announcementResultsDate: { type: Date, required: true },
    partners: [{ type: String, required: true }],
    prizes: [{ type: String, required: true }],
    faqs: [{
        question: { type: String, required: true },
        answer: { type: String, required: true }
    }]
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
