"use client";

export default function HeroSection() {
    return (
        <section
            className="relative bg-gray-900 text-gray-100 min-h-screen flex flex-col justify-center items-center"
        >
            {/* Animated Background */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black animate-pulse"
                aria-hidden="true"
            ></div>
            <div
                className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 opacity-20 blur-2xl mix-blend-overlay"
                aria-hidden="true"
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
                <div className="mt-8 flex justify-center space-x-4">
                    <button
                        className="bg-green-600 hover:bg-green-500 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                    >
                        Get Started
                    </button>
                    <button
                        className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                    >
                        Learn More
                    </button>
                </div>
            </div>


            {/* Mobile Animation Hint */}
            <div className="absolute bottom-8 text-gray-400 text-sm animate-bounce">
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
    );
}
