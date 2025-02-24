"use client";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function GenerateQR() {
    const [studentId, setStudentId] = useState("");
    const [qrUrl, setQrUrl] = useState("");
    const [attendanceRecords, setAttendanceRecords] = useState([]);

    const handleGenerateQR = () => {
        if (!studentId.trim()) return; // Prevent empty input
        const timestamp = Date.now();
        const encodedUrl = `${window.location.origin}/confirm-attendance/${studentId}?t=${timestamp}`;
        setQrUrl(encodedUrl);

        // Add to attendance records
        setAttendanceRecords(prevRecords => [
            { id: studentId, time: new Date(timestamp).toLocaleString() },
            ...prevRecords
        ]);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Generate Attendance QR Code</h1>
            <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter Student ID"
                className="p-2 border rounded-md mb-4"
            />
            <button
                onClick={handleGenerateQR}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Generate QR
            </button>

            {qrUrl && (
                <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                    <QRCodeCanvas value={qrUrl} size={200} />
                    <p className="mt-2 text-sm">Scan this QR within 5 minutes.</p>
                </div>
            )}

            {/* Attendance Records Section */}
            {attendanceRecords.length > 0 && (
                <div className="mt-8 w-full max-w-md bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Marked Attendance</h2>
                    <ul className="divide-y divide-gray-300">
                        {attendanceRecords.map((record, index) => (
                            <li key={index} className="py-2">
                                <span className="font-medium">ID:</span> {record.id} -
                                <span className="text-gray-600 text-sm"> {record.time}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
