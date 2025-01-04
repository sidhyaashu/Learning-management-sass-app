"use client";

import { useState } from "react";
import SelectOption from "@/app/create/_components/SelectOption";

function Create() {
    const [step, setStep] = useState(0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#6C63FF] via-[#6B5B95] to-[#FF6F91] flex flex-col items-center justify-center">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-10 transform transition-all duration-500 hover:scale-105">
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 text-center mb-6">
                    Create Your Personalized Study Companion 🌟
                </h2>
                <p className="text-lg text-gray-700 text-center mb-10">
                    Welcome to our AI-powered platform! Start creating your tailored
                    learning resources for exams, coding prep, interviews, and more.
                </p>
                <div>
                    {step === 0 ? <SelectOption /> : null}
                </div>
            </div>
        </div>
    );
}

export default Create;
