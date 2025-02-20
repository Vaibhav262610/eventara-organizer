"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const sectionKeys = [
    "BASICS",
    "APPLICATION",
    "LINKS",
    "DATES",
    "PARTNERS",
    "PRIZES",
    "SCHEDULE",
    "FAQS",
];

const Page = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        tagline: "",
        about: "",
        participants: "",
        minTeamSize: "",
        maxTeamSize: "",
        contactEmail: "",
        platforms: [{ name: "Twitter", url: "" }, { name: "Discord", url: "" }, { name: "Github", url: "" }, { name: "LinkedIn", url: "" }, { name: "Instagram", url: "" }, { name: "Facebook", url: "" }],
        applicationOpenDate: null,
        applicationOpenTime: "",
        hackathonStartDate: null,
        submissionDeadlineDate: null,
        announcementResultsDate: null,
        partners: [],
        prizes: [],
        faqs: [
            { question: "Eg. What is the eligibility criteria?", answer: "The hackathon is open to anyone with a passion for coding." },

        ],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlatformChange = (index, e) => {
        const { name, value } = e.target;
        const newPlatforms = [...formData.platforms];
        newPlatforms[index][name] = value;
        setFormData({ ...formData, platforms: newPlatforms });
    };

    const handleDateChange = (name, date) => {
        setFormData((prev) => ({ ...prev, [name]: date }));
    };

    const handleNext = () => {
        if (activeIndex === 0 && !isBasicsFilled()) {
            alert("Please fill all fields in the Basics section before proceeding.");
            return;
        }
        if (activeIndex < sectionKeys.length - 1) {
            setActiveIndex(activeIndex + 1);
        }
    };

    const handlePrev = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
    };

    // Validation functions
    const isBasicsFilled = () => {
        const { name, tagline, about, participants, minTeamSize, maxTeamSize } = formData;
        return (
            name.trim() !== "" &&
            tagline.trim() !== "" &&
            about.trim() !== "" &&
            participants.trim() !== "" &&
            minTeamSize.trim() !== "" &&
            maxTeamSize.trim() !== ""
        );
    };

    // Add to-do text for partners and prizes
    const addPartner = () => {
        const partnerName = prompt("Enter partner name:");
        if (partnerName) {
            setFormData((prev) => ({ ...prev, partners: [...prev.partners, partnerName] }));
        }
    };

    const addPrize = () => {
        const prize = prompt("Enter prize description:");
        if (prize) {
            setFormData((prev) => ({ ...prev, prizes: [...prev.prizes, prize] }));
        }
    };

    const addFAQ = () => {
        const question = prompt("Enter FAQ question:");
        const answer = prompt("Enter FAQ answer:");
        if (question && answer) {
            setFormData((prev) => ({
                ...prev,
                faqs: [...prev.faqs, { question, answer }]
            }));
        }
    };
    const handlePublish = async () => {
        try {
            // Ensure formData is properly spread
            const processedEventData = {
                ...formData,
                participants: formData.participants ? String(formData.participants) : "",
                minTeamSize: formData.minTeamSize ? String(formData.minTeamSize) : "",
                maxTeamSize: formData.maxTeamSize ? String(formData.maxTeamSize) : "",
                applicationOpenDate: formData.applicationOpenDate ? String(formData.applicationOpenDate) : "",
                hackathonStartDate: formData.hackathonStartDate ? String(formData.hackathonStartDate) : "",
                submissionDeadlineDate: formData.submissionDeadlineDate ? String(formData.submissionDeadlineDate) : "",
                announcementResultsDate: formData.announcementResultsDate ? String(formData.announcementResultsDate) : "",
            };

            console.log('Processed eventData:', processedEventData);

            // Validate the form data if necessary
            if (!isBasicsFilled()) {
                alert("Please fill all fields in the Basics section before publishing.");
                return;
            }

            const response = await fetch('/api/events/event-creation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(processedEventData),
            });

            // Check if response is valid JSON
            let result;
            try {
                result = await response.json();
            } catch (jsonError) {
                console.error('Failed to parse JSON response:', jsonError);
                alert("Unexpected server response. Check the server logs.");
                return;
            }

            console.log('API Response:', result);
            alert("Event published successfully!");

        } catch (error) {
            console.error('Error publishing event:', error);
            alert("Failed to publish event.");
        }
    };


    return (
        <div className="min-h-screen p-6">
            <div className="max-w-4xl mt-40 mx-auto p-6 rounded-lg">
                <div className="flex justify-between mb-4">
                    <h2 className="text-4xl text-[#34D399] nav font-light">vaibhav</h2>
                </div>

                {/* Navigation Tabs */}
                <nav className="flex space-x-4 border-b pb-2 mb-4 mt-12">
                    {sectionKeys.map((tab, index) => (
                        <button
                            key={tab}
                            className={`px-3 py-1 rounded-lg tracking-widest text-sm hover:text-blue-500 ${activeIndex === index ? "text-blue-500" : "text-gray-300"
                                }`}
                            onClick={() => {
                                if (index === 0 || (index === 2) || (index === 0 && isBasicsFilled())) {
                                    setActiveIndex(index);
                                }
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

                {/* Section Content */}
                <div>
                    {sectionKeys[activeIndex] === "BASICS" ? (
                        <form className="space-y-4">
                            <div>
                                <label className="block text-md mb-2 tracking-widest text-gray-400">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                            <div>
                                <label className="block text-md mb-2 tracking-widest text-gray-400">
                                    Tagline
                                </label>
                                <input
                                    type="text"
                                    name="tagline"
                                    value={formData.tagline}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                            <div>
                                <label className="block text-md mb-2 tracking-widest text-gray-400">
                                    About
                                </label>
                                <textarea
                                    name="about"
                                    value={formData.about}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    rows="4"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-md mb-2 tracking-widest text-gray-400">
                                    Approximate Participants
                                </label>
                                <input
                                    type="number"
                                    name="participants"
                                    value={formData.participants}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                            <div>
                                <label className="block text-md mb-2 tracking-widest text-gray-400">
                                    Minimum Team Size Allowed
                                </label>
                                <input
                                    type="number"
                                    name="minTeamSize"
                                    value={formData.minTeamSize}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                            <div>
                                <label className="block text-md mb-2 tracking-widest text-gray-400">
                                    Maximum Team Size Allowed
                                </label>
                                <input
                                    type="number"
                                    name="maxTeamSize"
                                    value={formData.maxTeamSize}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                        </form>
                    ) : sectionKeys[activeIndex] === "LINKS" ? (
                        <form className="space-y-4">
                            <div>
                                <label className="block text-md mb-2 tracking-widest text-gray-400">
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    name="contactEmail"
                                    value={formData.contactEmail}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                            {formData.platforms.map((platform, index) => (
                                <div key={index} className="space-y-2">
                                    <label className="block text-md mb-2 tracking-widest text-gray-400">
                                        {platform.name} URL
                                    </label>
                                    <input
                                        type="url"
                                        name="url"
                                        value={platform.url}
                                        onChange={(e) => handlePlatformChange(index, e)}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                            ))}
                        </form>
                    ) : sectionKeys[activeIndex] === "DATES" ? (
                        <form className="space-y-4">
                            <div>
                                <label className="block text-md mb-2 tracking-widest text-gray-400">
                                    Application Open Date
                                </label>
                                <DatePicker
                                    selected={formData.applicationOpenDate}
                                    onChange={(date) => handleDateChange('applicationOpenDate', date)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    dateFormat="yyyy/MM/dd"
                                />
                            </div>
                            <div>
                                <label className="block text-md mb-2 tracking-widest text-gray-400">
                                    Application Open Time
                                </label>
                                <select
                                    name="applicationOpenTime"
                                    value={formData.applicationOpenTime}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    <option value="">Select Time</option>
                                    {Array.from({ length: 24 }, (_, index) => {
                                        const hour = index < 10 ? `0${index}` : index;
                                        return <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>;
                                    })}
                                </select>
                            </div>
                            <div>
                                <label className="block text-md mb-2 tracking-widest text-gray-400">
                                    Hackathon Start Date
                                </label>
                                <DatePicker
                                    selected={formData.hackathonStartDate}
                                    onChange={(date) => handleDateChange('hackathonStartDate', date)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    dateFormat="yyyy/MM/dd"
                                />
                            </div>
                            <div>
                                <label className="block text-md mb-2 tracking-widest text-gray-400">
                                    Submission Deadline Date
                                </label>
                                <DatePicker
                                    selected={formData.submissionDeadlineDate}
                                    onChange={(date) => handleDateChange('submissionDeadlineDate', date)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    dateFormat="yyyy/MM/dd"
                                />
                            </div>
                            <div>
                                <label className="block text-md mb-2 tracking-widest text-gray-400">
                                    Results Announcement Date
                                </label>
                                <DatePicker
                                    selected={formData.announcementResultsDate}
                                    onChange={(date) => handleDateChange('announcementResultsDate', date)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    dateFormat="yyyy/MM/dd"
                                />
                            </div>
                        </form>
                    ) : sectionKeys[activeIndex] === "PARTNERS" ? (
                        <div>
                            <button
                                type="button"
                                onClick={addPartner}
                                className="px-6 py-2 rounded-md bg-blue-500 text-white"
                            >
                                Add Partner
                            </button>
                            <ul className="mt-4">
                                {formData.partners.map((partner, index) => (
                                    <li key={index} className="text-gray-300">{partner}</li>
                                ))}
                            </ul>
                        </div>
                    ) : sectionKeys[activeIndex] === "PRIZES" ? (
                        <div>
                            <button
                                type="button"
                                onClick={addPrize}
                                className="px-6 py-2 rounded-md bg-blue-500 text-white"
                            >
                                Add Prize
                            </button>
                            <ul className="mt-4">
                                {formData.prizes.map((prize, index) => (
                                    <li key={index} className="text-gray-300">{prize}</li>
                                ))}
                            </ul>
                        </div>
                    ) : sectionKeys[activeIndex] === "FAQS" ? (
                        <div>
                            <button
                                type="button"
                                onClick={addFAQ}
                                className="px-6 py-2 rounded-md bg-blue-500 text-white"
                            >
                                Add FAQ
                            </button>
                            <div className="mt-4">
                                {formData.faqs.map((faq, index) => (
                                    <div key={index} className="text-gray-300 mb-2">
                                        <strong>Q: </strong>{faq.question}
                                        <br />
                                        <strong>A: </strong>{faq.answer}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={handlePublish}
                                    className="px-6 py-2 rounded-md bg-green-500 text-white"
                                >
                                    Publish
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-white nav">Coming Soon...</div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-center gap-5 mt-6">
                    <button
                        onClick={handlePrev}
                        disabled={activeIndex === 0}
                        className="px-6 py-2 nav rounded-md bg-gray-700 text-white disabled:bg-gray-400"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={activeIndex === sectionKeys.length - 1}
                        className="px-6 py-2 nav rounded-md bg-blue-500 text-white disabled:bg-gray-400"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;
