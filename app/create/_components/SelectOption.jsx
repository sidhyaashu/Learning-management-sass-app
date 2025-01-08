"use client";

import Image from "next/image";
import { useState } from "react";

function SelectOption({ selectedStudyType }) {
    const Options = [
        { name: "Exam Preparation", icon: "/exam_1.png" },
        { name: "Job Interview", icon: "/job.png" },
        { name: "Practice", icon: "/practice.png" },
        { name: "Coding Preparation", icon: "/code.png" },
        { name: "Other", icon: "/knowledge.png" },
    ];

    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-100 text-center">
                What are you preparing for?
            </h2>
            <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-5 gap-6">
                {Options.map((option, index) => (
                    <div
                        key={index}
                        className={`group flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg transform transition-all duration-300 cursor-pointer 
                        ${
                            selectedOption === option.name
                                ? "bg-blue-600 scale-105 shadow-2xl"
                                : "bg-gray-700 hover:bg-blue-500"
                        }`}
                        onClick={() => {
                            setSelectedOption(option.name);
                            selectedStudyType(option.name);
                        }}
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
                                    : "text-gray-300 group-hover:text-white"
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