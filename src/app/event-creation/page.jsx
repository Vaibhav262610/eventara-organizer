"use client";
import { useState } from "react";

const EventForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        tagline: "",
        about: "",
        participants: "",
        minTeamSize: "",
        maxTeamSize: "",
        faqs: [] // ✅ Ensure FAQs is an array
    });

    const [faqInput, setFaqInput] = useState({ question: "", answer: "" });
    const [activeSection, setActiveSection] = useState("general"); // State for active section

    const [links, setLinks] = useState({
        github: "",
        facebook: "",
        linkedin: "",
        twitter: "",
        instagram: ""
    });

    // Add FAQ to the array
    const addFaq = () => {
        if (faqInput.question && faqInput.answer) {
            setFormData(prevState => ({
                ...prevState,
                faqs: [...prevState.faqs, faqInput] // Ensures array format
            }));
            setFaqInput({ question: "", answer: "" }); // Reset input fields
        }
    };

    // Remove FAQ from array
    const removeFaq = (index) => {
        setFormData(prevState => ({
            ...prevState,
            faqs: prevState.faqs.filter((_, i) => i !== index)
        }));
    };

    // Submit form to API
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting Data:", JSON.stringify(formData, null, 2)); // Debugging

        const response = await fetch("/api/events/event-creation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log("Response:", data);
    };

    // Handle next and previous section navigation
    const handleNext = () => {
        const sections = [
            "basic", "links", "dates", "partners", "prizes", "schedule", "faq"
        ];
        const currentIndex = sections.indexOf(activeSection);
        if (currentIndex < sections.length - 1) {
            setActiveSection(sections[currentIndex + 1]);
        }
    };

    const handlePrevious = () => {
        const sections = [
            "basic", "links", "dates", "partners", "prizes", "schedule", "faq"
        ];
        const currentIndex = sections.indexOf(activeSection);
        if (currentIndex > 0) {
            setActiveSection(sections[currentIndex - 1]);
        }
    };

    return (
        <div className="flex justify-center items-center h-[110vh]  w-full ">
            <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.15)_2px,transparent_1px)] z-40 bg-[size:40px_40px] opacity-30"></div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl z-50 w-fit">
                {/* Sidebar for selecting sections */}
                <div className="flex items-center bg-gray-700 py-4  px-8 rounded-md shadow-lg justify-center gap-10 mb-8 z-50">
                    {["basic", "links", "dates", "partners", "prizes", "schedule", "faq"].map((section) => (
                        <button
                            key={section}
                            className={`nav text-sm font-thin tracking-widest text-white py-2 px-6 rounded-md transition duration-300
                          ${activeSection === section ? 'text-blue-400' : 'hover:text-gray-600'}`}
                            onClick={() => setActiveSection(section)}
                        >
                            {section.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* Conditional rendering of sections */}
                <form onSubmit={handleSubmit}>
                    {activeSection === "basic" && (
                        <div className="z-50 grid grid-cols-1 gap-6">
                            <div>
                                <label className="text-white/70 text-lg mb-2">Event Name:</label>
                                <input
                                    className="w-full px-6 py-3 rounded-lg text-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="text"
                                    name="name"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Event Name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-white/70 text-lg mb-2">Tagline:</label>
                                <input
                                    className="w-full px-6 py-3 rounded-lg text-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="text"
                                    name="tagline"
                                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                                    placeholder="Tagline"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-white/70 text-lg mb-2">About:</label>
                                <textarea
                                    className="w-full px-6 py-3 rounded-lg text-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    name="about"
                                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                                    placeholder="About the Event"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-white/70 text-lg mb-2">Total Participants:</label>
                                <input
                                    className="w-full px-6 py-3 rounded-lg text-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="number"
                                    name="participants"
                                    onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                                    placeholder="Total Participants"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-white/70 text-lg mb-2">Min Team Size:</label>
                                <input
                                    className="w-full px-6 py-3 rounded-lg text-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="number"
                                    name="minTeamSize"
                                    onChange={(e) => setFormData({ ...formData, minTeamSize: e.target.value })}
                                    placeholder="Min Team Size (1-2)"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-white/70 text-lg mb-2">Max Team Size:</label>
                                <input
                                    className="w-full px-6 py-3 rounded-lg text-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="number"
                                    name="maxTeamSize"
                                    onChange={(e) => setFormData({ ...formData, maxTeamSize: e.target.value })}
                                    placeholder="Max Team Size (1-5)"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {activeSection === "links" && (
                        <div className="z-50 grid grid-cols-1 gap-6">
                            <div>
                                <h1 className="text-white text-xl mb-2">GitHub:</h1>
                                <input
                                    className="w-full px-6 py-3 rounded-lg text-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="text"
                                    name="github"
                                    value={links.github}
                                    onChange={(e) => setLinks({ ...links, github: e.target.value })}
                                    placeholder="GitHub Link"
                                />
                            </div>
                            <div>
                                <h1 className="text-white text-xl mb-2">Facebook:</h1>
                                <input
                                    className="w-full px-6 py-3 rounded-lg text-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="text"
                                    name="facebook"
                                    value={links.facebook}
                                    onChange={(e) => setLinks({ ...links, facebook: e.target.value })}
                                    placeholder="Facebook Link"
                                />
                            </div>
                            <div>
                                <h1 className="text-white text-xl mb-2">LinkedIn:</h1>
                                <input
                                    className="w-full px-6 py-3 rounded-lg text-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="text"
                                    name="linkedin"
                                    value={links.linkedin}
                                    onChange={(e) => setLinks({ ...links, linkedin: e.target.value })}
                                    placeholder="LinkedIn Link"
                                />
                            </div>
                            <div>
                                <h1 className="text-white text-xl mb-2">Twitter:</h1>
                                <input
                                    className="w-full px-6 py-3 rounded-lg text-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="text"
                                    name="twitter"
                                    value={links.twitter}
                                    onChange={(e) => setLinks({ ...links, twitter: e.target.value })}
                                    placeholder="Twitter Link"
                                />
                            </div>
                            <div>
                                <h1 className="text-white text-xl mb-2">Instagram:</h1>
                                <input
                                    className="w-full px-6 py-3 rounded-lg text-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="text"
                                    name="instagram"
                                    value={links.instagram}
                                    onChange={(e) => setLinks({ ...links, instagram: e.target.value })}
                                    placeholder="Instagram Link"
                                />
                            </div>
                        </div>
                    )}

                    {/* Button Section */}
                    <div className="flex justify-between gap-4 mt-6">
                        <button
                            type="button"
                            className="bg-gray-600 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-gray-500"
                            onClick={handlePrevious}
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            className="bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-500"
                            onClick={handleNext}
                        >
                            Next
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-green-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventForm;
