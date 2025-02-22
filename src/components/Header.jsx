"use client";
// import React, { useEffect } from "react";
// import GridDistortion from "./ui/GridDistortion";
// import RotatingText from "./ui/RotatingText";
import { FaArrowRightLong } from "react-icons/fa6";
import { PiGlobeHemisphereWest } from "react-icons/pi";
// import { gsap } from "gsap";
import Magnet from "./ui/Magnet";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation"; // Import Next.js router

const Header = () => {
    const [modalStep, setModalStep] = useState(0); // 0 = No modal, 1 = Organizer Type, 2 = Hackathon Mode, 3 = Hackathon Details
    const [selectedMode, setSelectedMode] = useState(null); // Stores selected hackathon mode
    const [hackathonName, setHackathonName] = useState("");
    const [university, setUniversity] = useState("");
    const [participationFee, setParticipationFee] = useState("No");


    const router = useRouter(); // Initialize Next.js router
    // Check if the "Begin" button should be enabled
    const isFormValid = hackathonName.trim() !== "" && university.trim() !== "";


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const eventData = { hackathonName, university, participationFee };

        try {
            const response = await fetch("/api/events/overview", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(eventData),
            });

            if (response.status === 201) { // Correct way to check response status
                router.push("/event-creation"); // Redirect immediately on success
            } else {
                const data = await response.json();
                toast.error(data.error || "Something went wrong!");
            }
        } catch (error) {
            console.error("Error submitting event data:", error);
            toast.error("Failed to create event. Please try again.");
        }
    };


    return (
        <div className="flex flex-col items-center justify-center text-center w-full h-screen bg-gray-900 text-white">
            <div className="relative w-full h-[100vh] flex flex-col justify-center items-center overflow-hidden bg-[#121b22]">

                {/* ✅ Wider Dot Background Pattern */}
                <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.15)_2px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>

                {/* ✅ Centered Text */}
                <div className="relative text-center flex flex-col  items-center ">
                    <h2 className=" text-white/50 text-[4rem] nav font-thin  flex items-center gap-4">
                        Organize an
                        <span className="text-[#c9f330] nav font-thin">Eventara</span>!{" "}
                        <PiGlobeHemisphereWest className="text-[#E6007A] text-5xl opacity-80 animate-pulse" />
                    </h2>
                    <p className="text-gray-300 max-w-5xl mt-12">
                        The only thing that can match the thrill of attending an Eventara is
                        the exhilaration of organizing one yourself! Join 100s of other
                        events on Eventara and manage your applications, submissions,
                        comms, reimbursements, and judging, all on our platform.
                    </p>
                </div>

                {/* ✅ Call-to-Action Button */}
                <div className="mt-12 flex items-center gap-3 relative z-10">
                    <Magnet padding={1000} disabled={false} magnetStrength={40}>
                        <button onClick={() => setModalStep(1)} className="flex items-center gap-4 bg-[#93d6e1] text-xl py-4 px-8 rounded-full text-black cursor-pointer hover:bg-[#6cb3c1] transition-all duration-200">
                            <h1 className="font-bold">Organize your events on Eventara</h1>
                            <FaArrowRightLong />
                        </button>
                    </Magnet>
                </div>

                {/* First Modal: Choose Organizer Type */}
                {modalStep === 1 && (
                    <div className="fixed z-20  inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-black w-[700px] relative">
                            {/* Close Button */}
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                onClick={() => setModalStep(0)}
                            >
                                <IoClose size={24} />
                            </button>

                            {/* Modal Content */}
                            <h2 className="text-xl font-semibold text-gray-700">Great decision!</h2>
                            <h3 className="text-xl font-bold text-gray-900 mt-1">
                                Choose the type of event to proceed
                            </h3>

                            <div className="flex mt-6 space-x-6">
                                {/* Students Card */}
                                <div className="border p-6 rounded-lg shadow-sm w-1/2">
                                    <h4 className="font-semibold text-xl text-gray-800">For Students</h4>
                                    <ul className="mt-2 text-gray-600 space-y-2">
                                        <li>📖 Access to premium features</li>
                                        <li>⚡ Partner with great companies</li>
                                        <li>🎁 Cool swag for winners</li>
                                        <li>🧑‍🏫 Mentorship & support</li>
                                    </ul>
                                    <button
                                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full"
                                        onClick={() => setModalStep(2)}
                                    >
                                        Start Event Setup
                                    </button>
                                </div>

                                {/* Communities/Companies Card */}
                                <div className="border p-6 rounded-lg shadow-sm w-1/2">
                                    <h4 className="font-semibold text-xl text-gray-800">For Communities/Companies</h4>
                                    <ul className="mt-2 text-gray-600 space-y-2">
                                        <li>🛠️ Access to the platform</li>
                                        <li>👁️ Get listed for more reach</li>
                                        <li>📢 Support from the team</li>
                                    </ul>
                                    <button
                                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full"
                                        onClick={() => setModalStep(2)}
                                    >
                                        Start Event Setup
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Second Modal: Select Hackathon Mode */}
                {modalStep === 2 && (
                    <div className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-black w-[700px] relative">
                            {/* Close Button */}
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                onClick={() => setModalStep(0)}
                            >
                                <IoClose size={24} />
                            </button>

                            {/* Modal Content */}
                            <h2 className="text-2xl font-bold text-gray-900">Select hackathon mode</h2>
                            <p className="text-gray-600 mb-4">
                                You'll not be able to change the hackathon mode later.
                            </p>

                            {/* Radio Buttons */}
                            <div className="space-y-4">
                                {/* Offline Option */}
                                <label className="flex items-center border p-4 rounded-md cursor-pointer hover:bg-gray-100">
                                    <input
                                        type="radio"
                                        name="hackathonMode"
                                        value="offline"
                                        className="mr-3"
                                        checked={selectedMode === "offline"}
                                        onChange={() => {
                                            setSelectedMode("offline");
                                            setModalStep(3); // Move to next modal
                                        }}
                                    />
                                    <h4 className="font-semibold text-lg text-gray-800">📍 Offline</h4>
                                </label>

                                {/* Online Option */}
                                <label className="flex items-center border p-4 rounded-md cursor-pointer hover:bg-gray-100">
                                    <input
                                        type="radio"
                                        name="hackathonMode"
                                        value="online"
                                        className="mr-3"
                                        checked={selectedMode === "online"}
                                        onChange={() => {
                                            setSelectedMode("online");
                                            setModalStep(3); // Move to next modal
                                        }}
                                    />
                                    <h4 className="font-semibold text-lg text-gray-800">🌍 Online</h4>
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* Third Modal: Hackathon Details */}
                {modalStep === 3 && (
                    <div className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-black w-[500px] relative">
                            {/* Close Button */}
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                onClick={() => setModalStep(0)}
                            >
                                <IoClose size={24} />
                            </button>

                            <h2 className="text-2xl font-bold text-gray-900">Let's get you started</h2>

                            <form className="mt-4">
                                <label className="block font-semibold text-gray-700">Name (You can change this later)</label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded mt-1"
                                    placeholder="What are you calling your hackathon?"
                                    value={hackathonName}
                                    onChange={(e) => setHackathonName(e.target.value)}
                                    required
                                />

                                <label className="block font-semibold text-gray-700 mt-4">University Representing</label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded mt-1"
                                    placeholder="Start Typing!"
                                    value={university}
                                    onChange={(e) => setUniversity(e.target.value)}
                                    required
                                />
                                <h2 className="text-2xl font-bold text-gray-900">Participation Fee</h2>


                                {/* Radio Buttons for Yes/No */}
                                <div className="justify-center gap-4 flex">
                                    <label className={`flex items-center border p-4 rounded-md cursor-pointer transition-all
                    ${participationFee === "yes" ? "bg-blue-100 border-blue-500" : "hover:bg-gray-100"}`}>
                                        <input
                                            type="radio"
                                            name="participationFee"
                                            value="yes"
                                            className="mr-3 hidden"
                                            checked={participationFee === "yes"}
                                            onChange={() => setParticipationFee("yes")}
                                        />
                                        <div className="flex items-center">
                                            <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3
                            ${participationFee === "yes" ? "border-blue-500" : "border-gray-400"}`}>
                                                {participationFee === "yes" && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                                            </div>
                                            <h4 className="font-semibold text-lg text-gray-800">Yes</h4>
                                        </div>
                                    </label>

                                    <label className={`flex items-center border p-4 rounded-md cursor-pointer transition-all
                    ${participationFee === "no" ? "bg-blue-100 border-blue-500" : "hover:bg-gray-100"}`}>
                                        <input
                                            type="radio"
                                            name="participationFee"
                                            value="no"
                                            className="mr-3 hidden"
                                            checked={participationFee === "no"}
                                            onChange={() => setParticipationFee("no")}
                                        />
                                        <div className="flex items-center">
                                            <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3
                            ${participationFee === "no" ? "border-blue-500" : "border-gray-400"}`}>
                                                {participationFee === "no" && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                                            </div>
                                            <h4 className="font-semibold text-lg text-gray-800">No</h4>
                                        </div>
                                    </label>
                                </div>
                                <div className="flex justify-between mt-6">
                                    <button
                                        className="bg-gray-400 text-white px-6 py-3 rounded-md font-semibold"
                                        onClick={() => setModalStep(2)}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className={`px-6 py-3 rounded-md font-semibold ${isFormValid ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            }`}
                                        disabled={!isFormValid}
                                        onClick={handleSubmit} // Send the event data to MongoDB
                                    >
                                        Begin
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
