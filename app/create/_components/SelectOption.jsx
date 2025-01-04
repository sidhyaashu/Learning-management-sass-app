"use client";

import Image from "next/image";
import { useState } from "react";

function SelectOption() {
    const Options = [
        {
            name: "Exam Prep",
            icon: "/exam_1.png",
        },
        {
            name: "Job Interview",
            icon: "/job.png",
        },
        {
            name: "Practice",
            icon: "/practice.png",
        },
        {
            name: "Coding Prep",
            icon: "/code.png",
        },
        {
            name: "Other",
            icon: "/knowledge.png",
        },
    ];

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (optionName) => {
        // Toggle selection to allow deselecting the option
        setSelectedOption((prev) => (prev === optionName ? null : optionName));
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
                What are you preparing for?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {Options.map((option, index) => (
                    <div
                        key={index}
                        className={`group flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg transform transition-all duration-300 cursor-pointer 
              ${
                            selectedOption === option.name
                                ? "bg-gradient-to-tr from-purple-400 to-pink-400 shadow-xl scale-105"
                                : "bg-gradient-to-tr from-purple-100 to-pink-100 hover:shadow-xl hover:scale-105"
                        }`}
                        onClick={() => handleOptionClick(option.name)}
                    >
                        <div className="relative w-20 h-20 mb-4">
                            <Image
                                src={option.icon}
                                alt={`${option.name} Icon`}
                                layout="fill"
                                objectFit="contain"
                                className="group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <h3
                            className={`text-lg font-medium ${
                                selectedOption === option.name
                                    ? "text-white"
                                    : "text-gray-900 group-hover:text-purple-700"
                            } transition-colors duration-300`}
                        >
                            {option.name}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectOption;
