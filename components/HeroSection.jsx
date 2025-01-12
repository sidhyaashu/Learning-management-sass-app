"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner2 from "@/components/Spinner2";
import Link from "next/link";

export default function HeroSection() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const navigateToDashboard = async () => {
        try {
            setLoading(true);
            router.push("/dashboard");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Spinner2 show={loading} />
            <section
                className="relative bg-gray-900 text-gray-100 min-h-screen flex flex-col justify-center items-center"
            >
                {/* Animated Background */}
                <div
                    className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black animate-pulse"
                ></div>
                <div
                    className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 opacity-20 blur-2xl mix-blend-overlay"
                ></div>

                {/* Content */}
                <div className="relative z-10 text-center px-4 md:px-8">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-100">
                        Empower Learning with{" "}
                        <span className="text-green-500">Generative AI</span>
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                        Create dynamic notes, flashcards, quizzes, and Q&A sessions with
                        AI-powered precision. Revolutionize your learning experience with
                        our cutting-edge platform.
                    </p>
                    <div className="text-center mt-16">
                        <p
                            className="cursor-pointer inline-block px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-gray-900 font-semibold rounded-lg shadow-lg transform hover:scale-110 hover:shadow-xl transition-transform"
                        >
                            Generative AI
                        </p>
                    </div>
                </div>

                {/* Mobile Animation Hint */}
                <div className="absolute bottom-8 text-gray-400 text-sm animate-bounce" role="status">
                    <span>Scroll to explore more</span>
                    <svg
                        className="w-5 h-5 mx-auto mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        ></path>
                    </svg>
                </div>
            </section>
        </>
    );
}
