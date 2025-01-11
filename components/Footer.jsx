
import Link from "next/link";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";
import { SiGoogle } from "react-icons/si";

function Footer() {


    return (
        <footer className="bg-gray-900 text-gray-100 py-12">
            <div className="container mx-auto px-6 sm:px-12 lg:px-24">
                {/* Flex container for content */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-8 lg:space-y-0">
                    {/* About Section */}
                    <div className="lg:w-1/3">
                        <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                            Generative AI LMS
                        </h3>
                        <p className="text-gray-400 mb-4">
                            Revolutionizing learning through generative AI for personalized, adaptive education.
                        </p>
                        <a
                            href="mailto:contact@lms.com"
                            className="flex items-center text-gray-300 hover:text-blue-500 transition-colors duration-300"
                        >
                            <FaEnvelope className="mr-2" />
                            contact@lms.com
                        </a>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-12 lg:w-1/3">
                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-200 mb-2">
                                Quick Links
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/"
                                        className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/about"
                                        className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/courses"
                                        className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                                    >
                                        Courses
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-200 mb-2">
                                Resources
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/faq"
                                        className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                                    >
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/privacy-policy"
                                        className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/terms"
                                        className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                                    >
                                        Terms of Service
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Social Media Section */}
                <div className="flex justify-center space-x-6 mt-8 lg:mt-12">
                    <Link
                        href="https://www.linkedin.com"
                        target="_blank"
                        className="text-gray-400 hover:text-blue-500 text-2xl transition-colors duration-300"
                    >
                        <FaLinkedin />
                    </Link>
                    <Link
                        href="https://github.com"
                        target="_blank"
                        className="text-gray-400 hover:text-blue-500 text-2xl transition-colors duration-300"
                    >
                        <FaGithub />
                    </Link>
                    <Link
                        href="https://twitter.com"
                        target="_blank"
                        className="text-gray-400 hover:text-blue-500 text-2xl transition-colors duration-300"
                    >
                        <FaTwitter />
                    </Link>
                    <Link
                        href="https://www.google.com"
                        target="_blank"
                        className="text-gray-400 hover:text-blue-500 text-2xl transition-colors duration-300"
                    >
                        <SiGoogle />
                    </Link>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 text-center text-gray-500">
                    <p>&copy; {"2025" || "Loading..."} Generative AI LMS. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
