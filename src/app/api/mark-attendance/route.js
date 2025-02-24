import { connectToDatabase } from "@/db/db";
import Attendance from "@/models/Attendance";

export async function POST(req) {
    try {
        await connectToDatabase();
        const { studentId } = await req.json();

        const existingRecord = await Attendance.findOne({ studentId });

        if (existingRecord && existingRecord.attended) {
            return Response.json({ success: false, message: "❌ Already Marked!" }, { status: 400 });
        }

        const updatedRecord = await Attendance.findOneAndUpdate(
            { studentId },
            { attended: true, generatedAt: Date.now() },
            { new: true, upsert: true }
        );

        return Response.json({ success: true, data: updatedRecord });
    } catch (error) {
        return Response.json({ success: false, message: error.message }, { status: 500 });
    }
}
