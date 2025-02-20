"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import QRCode from "qrcode";

export default function QRGenerator() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [attendance, setAttendance] = useState("None");
    const [qrUrl, setQrUrl] = useState("");
    const [qrImage, setQrImage] = useState("");

    useEffect(() => {
        // Check if the URL contains ?attended=true
        if (searchParams.get("attended") === "true") {
            setAttendance("Present");
        }

        // Generate the QR code URL
        const url = `${window.location.origin}?attended=true`;
        setQrUrl(url);

        // Generate QR code image
        QRCode.toDataURL(url)
            .then((dataUrl) => {
                setQrImage(dataUrl);
            })
            .catch((err) => console.error("QR Code Generation Error:", err));
    }, [searchParams]);

    return (
        <div className="flex justify-center items-center h-screen w-full">

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
                    onClick={() => router.push("/")}
                >
                    Reset Attendance
                </button>
            </div>
        </div>
    );
}
