"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";
import { SiGoogle } from "react-icons/si";

function Footer() {
    const [currentYear, setCurrentYear] = useState(null);

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="bg-gray-900 text-gray-100 py-12">
            <div className="container mx-auto px-6 sm:px-12 lg:px-24">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-8 sm:space-y-0">
                    {/* About Section */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-2xl font-semibold text-blue-400 mb-4">Generative AI LMS</h3>
                        <p className="text-lg text-gray-400 mb-4">
                            Revolutionizing learning through generative AI for personalized, adaptive education.
                        </p>
                        <div className="text-gray-500">
                            <a href="mailto:contact@lms.com" className="flex items-center justify-center sm:justify-start text-gray-300 hover:text-blue-500 transition-colors duration-300">
                                <FaEnvelope className="mr-2" />
                                contact@lms.com
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 text-center sm:text-left">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-200 mb-2">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><Link href="/" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">Home</Link></li>
                                <li><Link href="/about" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">About Us</Link></li>
                                <li><Link href="/courses" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">Courses</Link></li>
                                <li><Link href="/contact" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-200 mb-2">Resources</h4>
                            <ul className="space-y-2">
                                <li><Link href="/faq" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">FAQ</Link></li>
                                <li><Link href="/privacy-policy" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Social Media Section */}
                <div className="flex justify-center space-x-6 mt-8">
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 text-2xl transition-colors duration-300">
                        <FaLinkedin />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 text-2xl transition-colors duration-300">
                        <FaGithub />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 text-2xl transition-colors duration-300">
                        <FaTwitter />
                    </a>
                    <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 text-2xl transition-colors duration-300">
                        <SiGoogle />
                    </a>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 text-center text-gray-500">
                    <p>&copy; {currentYear || "Loading..."} Generative AI LMS. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
