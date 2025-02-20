"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import QRCode from "qrcode";

export default function AttendancePage() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <AttendanceContent />
        </Suspense>
    );
}

function AttendanceContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [attendance, setAttendance] = useState("None");
    const [qrImage, setQrImage] = useState("");

    useEffect(() => {
        if (searchParams.get("attended") === "true") {
            setAttendance("Present");
        }

        // Generate QR code with the external website URL
        const qrUrl = `https://eventara-organizer.vercel.app/?attended=true`;

        // Convert URL to QR Code
        QRCode.toDataURL(qrUrl)
            .then((dataUrl) => {
                setQrImage(dataUrl);
            })
            .catch((err) => console.error("QR Code Generation Error:", err));
    }, [searchParams]);

    return (
        <div className='w-full h-screen justify-center items-center flex text-white'>
            <div className="flex flex-col items-center p-4">
                <h1 className="text-2xl font-bold">QR Attendance System</h1>

                <p className="text-lg mt-4">
                    Attendance: <strong>{attendance}</strong>
                </p>

                {qrImage && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold">Scan this QR Code:</h2>
                        <img src={qrImage} alt="QR Code" className="mt-2" />
                    </div>
                )}

                <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => router.push("/attendance")}
                >
                    Reset Attendance
                </button>
            </div>
        </div>
    );
}
