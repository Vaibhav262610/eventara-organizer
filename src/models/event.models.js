import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    about: { type: String, required: true },
    participants: { type: String, required: true },
    minTeamSize: { type: String, required: true },
    maxTeamSize: { type: String, required: true },

    // ✅ Ensure FAQs is an array with default empty array
    faqs: {
        type: [
            {
                question: { type: String, required: true },
                answer: { type: String, required: true }
            }
        ],
        default: [] // ✅ This ensures FAQs is always an array
    }
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
