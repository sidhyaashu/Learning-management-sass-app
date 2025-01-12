"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

const developers = [
    {
        name: "Asutosh Sidhya",
        department: "AI/ML",
        email: "sidhyaasutosh@gmail.com",
        linkedin: "https://www.linkedin.com/in/asutosh-sidhya/",
        image: "https://www.pngkit.com/png/full/349-3499672_kevin-wooster-dummy-profile.png",
    },
    {
        name: "Bishal Sarkar",
        department: "Frontend Development",
        email: "bishalsarkartest@gmail.com",
        linkedin: "https://www.linkedin.com/in/jane-doe/",
        image: "https://www.pngkit.com/png/full/349-3499672_kevin-wooster-dummy-profile.png",
    },
    {
        name: "Bipasha Saha",
        department: "Backend Development",
        email: "bipashasahatest@gmail.com",
        linkedin: "https://www.linkedin.com/in/john-smith/",
        image: "https://www.pngkit.com/png/full/349-3499672_kevin-wooster-dummy-profile.png",
    },
    {
        name: "Koushik Sarkar",
        department: "Next.js/Javascript",
        email: "koushiksarkartest@gmail.com",
        linkedin: "https://www.linkedin.com/in/emily-davis/",
        image: "https://www.pngkit.com/png/full/349-3499672_kevin-wooster-dummy-profile.png",
    },
    {
        name: "Shreya",
        department: "UI/UX Design",
        email: "shreyatest@gmail.com",
        linkedin: "https://www.linkedin.com/in/michael-brown/",
        image: "https://www.pngkit.com/png/full/349-3499672_kevin-wooster-dummy-profile.png",
    },
];

function DeveloperCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Automatically cycle through items
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % developers.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % developers.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? developers.length - 1 : prevIndex - 1
        );
    };

    const handleIndicatorClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section className="py-10 bg-gray-800 text-gray-100">
            <div className="text-center mb-8 px-4">
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-200">
                    Meet Our Talented Developers
                </h2>
                <p className="mt-2 text-gray-400">
                    Get to know the team that makes it all happen.
                </p>
            </div>

            <div className="relative max-w-5xl mx-auto overflow-hidden">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {developers.map((developer, index) => (
                        <div
                            key={index}
                            className="min-w-full flex-shrink-0 px-4"
                        >
                            <div className="bg-gray-900 rounded-lg shadow-lg p-6 text-center">
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-600">
                                    <Image
                                        src={developer.image}
                                        alt={`${developer.name}'s photo`}
                                        width={128}
                                        height={128}
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-200 mb-1">
                                    {developer.name}
                                </h3>
                                <p className="text-gray-400 mb-4">
                                    {developer.department}
                                </p>
                                <a
                                    href={`mailto:${developer.email}`}
                                    className="flex items-center justify-center text-gray-300 hover:text-blue-500 transition-colors duration-300 mb-4"
                                >
                                    <FaEnvelope className="mr-2" />
                                    {developer.email}
                                </a>
                                <a
                                    href={developer.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-blue-500 transition-colors duration-300 text-2xl"
                                >
                                    <FaLinkedin />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <button
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-300 hover:text-blue-500 text-3xl focus:outline-none"
                    onClick={handlePrevious}
                >
                    &#8592;
                </button>
                <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-300 hover:text-blue-500 text-3xl focus:outline-none"
                    onClick={handleNext}
                >
                    &#8594;
                </button>
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-4">
                {developers.map((_, index) => (
                    <button
                        key={index}
                        className={`h-3 w-3 mx-2 rounded-full transition-all ${
                            index === currentIndex
                                ? "bg-blue-500 scale-110"
                                : "bg-gray-500"
                        }`}
                        onClick={() => handleIndicatorClick(index)}
                    ></button>
                ))}
            </div>
        </section>
    );
}

export default DeveloperCarousel;
