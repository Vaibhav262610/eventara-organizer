import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
