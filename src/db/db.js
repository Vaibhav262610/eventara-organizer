// /lib/mongoose.js
import mongoose from 'mongoose';

const connectToDatabase = async () => {
    if (mongoose.connections[0].readyState) {
        return; // Already connected
    }
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
};

export default connectToDatabase;
