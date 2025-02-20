"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function AttendancePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [attendance, setAttendance] = useState("None");

    useEffect(() => {
        // Check if the URL contains ?attended=true
        if (searchParams.get("attended") === "true") {
            setAttendance("Present");
        }
    }, [searchParams]);

    // URL to be encoded in QR Code
    const qrUrl = `${window.location.origin}?attended=true`;

    return (
        <div className="flex justify-center text-white items-center w-full h-screen">
            <div className="flex flex-col items-center p-4">
                <h1 className="text-2xl font-bold">Attendance System</h1>

                <p className="text-lg mt-4">
                    Attendance: <strong>{attendance}</strong>
                </p>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Scan this QR Code:</h2>
                    <QRCodeCanvas value={qrUrl} size={200} />
                </div>

                <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => router.push("/")}
                >
                    Reset Attendance
                </button>
            </div>
        </div>
    );
}
