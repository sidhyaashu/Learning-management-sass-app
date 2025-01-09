"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import Image from "next/image"; // For optimized image rendering
import { useState, useEffect } from "react";

const developers = [
    {
        name: "Asutosh Sidhya",
        department: "AI/ML",
        email: "asutosh.sidhya@example.com",
        linkedin: "https://www.linkedin.com/in/asutosh-sidhya/",
        image: "/images/asutosh.jpg", // Replace with the actual image path
    },
    {
        name: "Jane Doe",
        department: "Frontend Development",
        email: "jane.doe@example.com",
        linkedin: "https://www.linkedin.com/in/jane-doe/",
        image: "/images/jane.jpg", // Replace with the actual image path
    },
    {
        name: "John Smith",
        department: "Backend Development",
        email: "john.smith@example.com",
        linkedin: "https://www.linkedin.com/in/john-smith/",
        image: "/images/john.jpg", // Replace with the actual image path
    },
    {
        name: "Emily Davis",
        department: "DevOps",
        email: "emily.davis@example.com",
        linkedin: "https://www.linkedin.com/in/emily-davis/",
        image: "/images/emily.jpg", // Replace with the actual image path
    },
    {
        name: "Michael Brown",
        department: "UI/UX Design",
        email: "michael.brown@example.com",
        linkedin: "https://www.linkedin.com/in/michael-brown/",
        image: "/images/michael.jpg", // Replace with the actual image path
    },
];

function DeveloperCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Automatically change to the next item every 3 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % developers.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(intervalId); // Clean up on component unmount
    }, []);

    // Handle next and previous buttons
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % developers.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? developers.length - 1 : prevIndex - 1
        );
    };

    // Handle indicator click
    const handleIndicatorClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section className="py-10 bg-gray-800 text-gray-100">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold text-gray-200">Meet Our Talented Developers</h2>
                <p className="mt-2 text-gray-400">Get to know the team that makes it all happen.</p>
            </div>

            <Carousel className="relative max-w-4xl mx-auto rounded-lg overflow-hidden">
                <CarouselContent
                    className="space-x-6 flex transition-transform ease-in-out duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {developers.map((developer, index) => (
                        <CarouselItem key={index} className="flex-shrink-0 w-80 px-4">
                            <div className="bg-gray-900 rounded-lg shadow-lg p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
                                {/* Developer Image */}
                                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-600">
                                    <Image
                                        src={developer.image}
                                        alt={`${developer.name}'s photo`}
                                        width={128}
                                        height={128}
                                        className="object-cover"
                                    />
                                </div>

                                {/* Name and Department */}
                                <h3 className="text-xl font-semibold text-gray-200 mb-2">{developer.name}</h3>
                                <p className="text-gray-400 mb-4">{developer.department}</p>

                                {/* Contact Information */}
                                <div className="mb-6">
                                    <a
                                        href={`mailto:${developer.email}`}
                                        className="flex items-center justify-center text-gray-300 hover:text-blue-500 transition-colors duration-300"
                                    >
                                        <FaEnvelope className="mr-2" /> {developer.email}
                                    </a>
                                </div>

                                {/* Social Links */}
                                <div className="flex justify-center space-x-4">
                                    <a
                                        href={developer.linkedin}
                                        className="text-gray-300 hover:text-blue-500 transition-colors duration-300"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaLinkedin className="text-2xl" />
                                    </a>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Carousel Navigation */}
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
                    <CarouselPrevious
                        className="text-3xl text-gray-300 hover:text-blue-500 transition-all"
                        onClick={handlePrevious}
                    >
                        &#8592;
                    </CarouselPrevious>
                </div>

                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
                    <CarouselNext
                        className="text-3xl text-gray-300 hover:text-blue-500 transition-all"
                        onClick={handleNext}
                    >
                        &#8594;
                    </CarouselNext>
                </div>
            </Carousel>

            {/* Indicators */}
            <div className="flex justify-center mt-4">
                {developers.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 w-2 mx-2 rounded-full transition-all ${
                            index === currentIndex ? "bg-blue-500" : "bg-gray-500"
                        }`}
                        onClick={() => handleIndicatorClick(index)}
                    ></button>
                ))}
            </div>
        </section>
    );
}

export default DeveloperCarousel;
