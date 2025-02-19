"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const logoRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);

        // Check if authToken is present in cookies
        const token = getCookie("authToken");
        setIsLoggedIn(!!token);

        // Make logo draggable
        Draggable.create(logoRef.current, {
            type: "x,y",
            inertia: true,
            onRelease: function () {
                gsap.to(this.target, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.5)" });
            },
        });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Helper function to get a cookie by name
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    };

    return (
        <div className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 ${isScrolled ? "bg-[#0a0a0a] shadow-lg" : "bg-transparent"}`}>
            <div className="flex w-full justify-evenly items-center py-5">
                <Link href="/">
                    <h1 ref={logoRef} className="text-4xl font-black text-white cursor-grab">
                        Eventara. <span className="text-xs font-normal">organizer</span>
                    </h1>
                </Link>

                <div className="text-xl font-semibold gap-12 flex">
                    {isLoggedIn ? (
                        <>

                            <Link href="/profile">
                                <button className="text-[#d1d1d1] border-2 px-5 rounded-lg hover:bg-[#d1d1d1] hover:text-black duration-200 py-2 border-[#d1d1d1]">
                                    Profile
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>

                            <Link href="/login">
                                <button className="text-[#d1d1d1] border-2 px-5 rounded-lg hover:bg-[#d1d1d1] hover:text-black duration-200 py-2 border-[#d1d1d1]">
                                    Sign In
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
