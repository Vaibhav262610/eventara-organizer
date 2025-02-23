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
        location: "",
        endDate: "",
        startDate: "",
        status: "",
        faqs: [],
        partners: [],
        prizes: []
    });

    const [faqInput, setFaqInput] = useState({ question: "", answer: "" });
    const [partnerInput, setPartnerInput] = useState({ name: "", type: "", description: "" });
    const [prizeInput, setPrizeInput] = useState("");
    const [activeSection, setActiveSection] = useState("basic");

    // const addPartner = () => {
    //     if (partnerInput) {
    //         setFormData(prevState => ({
    //             ...prevState,
    //             partners: [...(prevState.partners || []), partnerInput]  // Ensure it's an array
    //         }));
    //         setPartnerInput("");
    //     }
    // };

    // const addPrize = () => {
    //     if (prizeInput) {
    //         setFormData(prevState => ({
    //             ...prevState,
    //             prizes: [...(prevState.prizes || []), prizeInput]
    //         }));
    //         setPrizeInput("");
    //     }
    // };

    const [links, setLinks] = useState({
        github: "",
        facebook: "",
        linkedin: "",
        twitter: "",
        instagram: ""
    });

    const [dates, setDates] = useState({
        registrationStart: "",
        registrationClose: "",
        eventStart: "",
        eventEnd: "",
        timings: ""
    });

    const addFaq = (e) => {
        e.preventDefault();
        if (faqInput.question && faqInput.answer) {
            setFormData(prevState => ({
                ...prevState,
                // faqs: [...prevState.faqs, faqInput]
                faqs: [...(prevState.faqs || []), faqInput]
            }));
            setFaqInput({ question: "", answer: "" });
        }
    };
    const addPartner = (e) => {
        e.preventDefault();
        if (partnerInput.name && partnerInput.type && partnerInput.description) {
            setFormData(prevState => ({
                ...prevState,
                // faqs: [...prevState.faqs, faqInput]
                partners: [...(prevState.partners || []), partnerInput]
            }));
            setPartnerInput({ name: "", type: "", description: "" });
        }
    };
    const addPrize = (e) => {
        e.preventDefault();
        if (prizeInput.title && prizeInput.amount && prizeInput.description) {
            setFormData(prevState => ({
                ...prevState,
                // faqs: [...prevState.faqs, faqInput]
                prizes: [...(prevState.prizes || []), prizeInput]
            }));
            setPrizeInput({ title: "", amount: "", description: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Constructing the formData object for submission
        const formattedData = {
            name: formData.name,
            tagline: formData.tagline,
            about: formData.about,
            participants: formData.participants,
            minTeamSize: formData.minTeamSize,
            maxTeamSize: formData.maxTeamSize,
            location: "chandigarh",
            startDate: dates.eventStart,
            endDate: dates.eventEnd,
            status: "active",
            faqs: formData.faqs,
            partners: formData.partners,
            prizes: formData.prizes,
            // Add any additional data fields here, if needed
            registrationStart: dates.registrationStart,
            registrationClose: dates.registrationClose,
            eventStart: dates.eventStart,
            eventEnd: dates.eventEnd,
            timings: dates.timings,
            socialLinks: links // Assuming links are part of the API
        };

        // Logging data for debugging
        console.log("Submitting Data:", JSON.stringify(formattedData, null, 2));

        // Sending request to the API
        const response = await fetch("/api/events/event-creation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formattedData),
        });

        const data = await response.json();

        if (response.ok) {
            // Handle success response (e.g., show success message)
            console.log("Response:", data);
        } else {
            // Handle failure response (e.g., show error message)
            console.error("Error:", data);
        }
    };


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
                <div className="flex items-center bg-gray-700 py-4 px-8 rounded-md shadow-lg justify-center gap-10 mb-8 z-50">
                    {["basic", "links", "dates", "partners", "prizes", "faqs"].map((section) => (
                        <button
                            key={section}
                            className={`nav text-sm font-thin tracking-widest text-white py-2 px-6 rounded-md transition duration-300 ${activeSection === section ? 'text-blue-400' : 'hover:text-gray-600'}`}
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
                    {activeSection === "dates" && (
                        <div className="z-50 grid grid-cols-1 gap-6">
                            <div>
                                <label className="text-white/70 text-lg mb-2">Registration Start:</label>
                                <input type="date" className="w-full px-6 py-3 rounded-lg bg-gray-700 text-white" value={dates.registrationStart} onChange={(e) => setDates({ ...dates, registrationStart: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-white/70 text-lg mb-2">Registration Close:</label>
                                <input type="date" className="w-full px-6 py-3 rounded-lg bg-gray-700 text-white" value={dates.registrationClose} onChange={(e) => setDates({ ...dates, registrationClose: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-white/70 text-lg mb-2">Event Start:</label>
                                <input type="date" className="w-full px-6 py-3 rounded-lg bg-gray-700 text-white" value={dates.eventStart} onChange={(e) => setDates({ ...dates, eventStart: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-white/70 text-lg mb-2">Event End:</label>
                                <input type="date" className="w-full px-6 py-3 rounded-lg bg-gray-700 text-white" value={dates.eventEnd} onChange={(e) => setDates({ ...dates, eventEnd: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-white/70 text-lg mb-2">Event Timings:</label>
                                <select className="w-full px-6 py-3 rounded-lg bg-gray-700 text-white" value={dates.timings} onChange={(e) => setDates({ ...dates, timings: e.target.value })}>
                                    <option value="">Select Time</option>
                                    <option value="09:00 AM">09:00 AM</option>
                                    <option value="10:00 AM">10:00 AM</option>
                                    <option value="11:00 AM">11:00 AM</option>
                                    <option value="12:00 PM">12:00 PM</option>
                                </select>
                            </div>
                        </div>
                    )}
                    {activeSection === "partners" && (
                        <div>
                            <button type="button" onClick={() => setPartnerInput(partnerInput.name === "" && partnerInput.type === "" && partnerInput.description === "" ? { name: " ", type: " ", description: " " } : partnerInput)} className="bg-blue-500 text-white px-4 py-2 rounded">Add Partner</button>

                            {(partnerInput.name !== "" || partnerInput.type !== "" && partnerInput.description !== "") && (
                                <div className="mt-4 flex gap-4">
                                    <input type="text" placeholder="name" value={partnerInput.name} onChange={(e) => setPartnerInput({ ...partnerInput, name: e.target.value })} className="px-4 py-2 rounded bg-gray-700 text-white mb-2" />
                                    <input type="text" placeholder="type" value={partnerInput.type} onChange={(e) => setPartnerInput({ ...partnerInput, type: e.target.value })} className="px-4 py-2 rounded bg-gray-700 text-white" />
                                    <input type="text" placeholder="description" value={partnerInput.description} onChange={(e) => setPartnerInput({ ...partnerInput, description: e.target.value })} className="px-4 py-2 rounded bg-gray-700 text-white" />
                                    <button onClick={addPartner} className="bg-green-500 text-white px-4 py-2 ml-2 rounded">Save</button>
                                </div>
                            )}
                            <ul className="mt-4 text-white">
                                {formData.partners.map((partner, index) => (
                                    <li key={index}>{partner.name}: {partner.type} : {partner.description} </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {activeSection === "prizes" && (
                        <div>
                            <button type="button" onClick={() => setPrizeInput(prizeInput.title === "" && prizeInput.amount === "" && prizeInput.description === "" ? { title: " ", type: " ", description: " " } : prizeInput)} className="bg-blue-500 text-white px-4 py-2 rounded">Add Prize</button>

                            {(prizeInput.title !== "" || prizeInput.amount !== "" && prizeInput.description !== "") && (
                                <div className="mt-4 flex gap-4">
                                    <input type="text" placeholder="title" value={prizeInput.title} onChange={(e) => setPrizeInput({ ...prizeInput, title: e.target.value })} className="px-4 py-2 rounded bg-gray-700 text-white mb-2" />
                                    <input type="text" placeholder="amount" value={prizeInput.amount} onChange={(e) => setPrizeInput({ ...prizeInput, amount: e.target.value })} className="px-4 py-2 rounded bg-gray-700 text-white" />
                                    <input type="text" placeholder="description" value={prizeInput.description} onChange={(e) => setPrizeInput({ ...prizeInput, description: e.target.value })} className="px-4 py-2 rounded bg-gray-700 text-white" />
                                    <button onClick={addPrize} className="bg-green-500 text-white px-4 py-2 ml-2 rounded">Save</button>
                                </div>
                            )}
                            <ul className="mt-4 text-white">
                                {formData.prizes.map((prize, index) => (
                                    <li key={index}>{prize.title}: {prize.amount} : {prize.description} </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {activeSection === "faqs" && (
                        <div>
                            <div className='flex gap-4'>
                                <button type="button" onClick={() => setFaqInput(faqInput.question === "" && faqInput.answer === "" ? { question: " ", answer: " " } : faqInput)} className="bg-blue-500 text-white px-4 py-2 rounded">Add FAQ</button>

                                <button
                                    type="submit"
                                    className="bg-green-400  font-bold text-black py-2 px-4 rounded-md transition duration-300 hover:bg-green-500"
                                >
                                    Submit
                                </button>
                            </div>
                            {(faqInput.question !== "" || faqInput.answer !== "") && (
                                <div className="mt-4 flex gap-4">
                                    <input type="text" placeholder="Question" value={faqInput.question} onChange={(e) => setFaqInput({ ...faqInput, question: e.target.value })} className="px-4 py-2 rounded bg-gray-700 text-white mb-2" />
                                    <input type="text" placeholder="Answer" value={faqInput.answer} onChange={(e) => setFaqInput({ ...faqInput, answer: e.target.value })} className="px-4 py-2 rounded bg-gray-700 text-white" />
                                    <button onClick={addFaq} className="bg-green-500 text-white px-4 py-2 ml-2 rounded">Save</button>
                                </div>
                            )}
                            <ul className="mt-4 text-white">
                                {formData.faqs.map((faq, index) => (
                                    <li key={index}>{faq.question}: {faq.answer} </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {/* Button Section */}
                    <div className="flex justify-between gap-4 mt-6">
                        <button
                            type="button"
                            className=" nav font-thin bg-gray-600 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-gray-500"
                            onClick={handlePrevious}
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            className=" nav font-thin bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-500"
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default EventForm;
