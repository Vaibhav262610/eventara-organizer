"use client";

import React, { useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { PiGlobeHemisphereWest } from "react-icons/pi";
import { gsap } from "gsap";
import Magnet from "./ui/Magnet";

const Header = () => {
    useEffect(() => {
        gsap.to(".floating-icon", {
            y: -10,
            opacity: 1,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "easeInOut",
            stagger: 0.3,
        });
    }, []);

    return (
        <div className="relative w-full h-[100vh] flex flex-col justify-center items-center overflow-hidden bg-[#121b22]">

            {/* ✅ Wider Dot Background Pattern */}
            <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.15)_2px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>

            {/* ✅ Centered Text */}
            <div className="relative text-center flex flex-col items-center nav">
                <h2 className="text-white/50 text-[4rem] font-light flex items-center gap-4">
                    Organize an
                    <span className="text-[#c9f330] font-bold">Eventara</span>!{" "}
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
                    <button className="flex items-center gap-4 bg-[#93d6e1] text-xl py-4 px-8 rounded-full text-black cursor-pointer hover:bg-[#6cb3c1] transition-all duration-200">
                        <h1 className="font-bold">Organize your events on Eventara</h1>
                        <FaArrowRightLong />
                    </button>
                </Magnet>
            </div>
        </div>
    );
};

export default Header;
