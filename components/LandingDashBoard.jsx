"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

function LandingDashBoard({ title, toggleSidebar }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const handleLogin = () => {
        router.push("/login");
    };

    const handleGoToDashboard = () => {
        router.push("/dashboard");
    };

    return (
        <header
            className="p-4 shadow-md bg-gray-800 text-gray-100 flex justify-between items-center"
            aria-label="Dashboard Header"
        >
            {/* Left Section: Logo and Title */}
            <div
                className="flex items-center space-x-4 cursor-pointer"
                onClick={() => router.push("/")}
            >
                <img
                    src="/logo.svg"
                    alt="Logo"
                    className="w-8 h-8 rounded-full"
                />
                {title && (
                    <h1 className="text-xl font-bold tracking-wide text-gray-100">
                        {title}
                    </h1>
                )}
            </div>

            {/* Right Section: Menu for Desktop */}
            <div className="hidden md:flex items-center space-x-4">
                <SignedOut>
                    <button
                        onClick={handleLogin}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
                    >
                        Login
                    </button>
                </SignedOut>
                <SignedIn>
                    <button
                        onClick={handleGoToDashboard}
                        className="bg-green-600 hover:bg-green-500 text-white font-medium py-2 px-4 rounded"
                    >
                        Go to Dashboard
                    </button>
                </SignedIn>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>

            {/* Hamburger Menu for Tablet and Mobile */}
            <div className="md:hidden">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-gray-400 hover:text-white"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Sidebar Menu */}
            {menuOpen && (
                <div className="absolute top-14 right-4 bg-gray-800 shadow-lg rounded-md w-48">
                    <ul className="text-gray-100">
                        <li className="border-b border-gray-700 p-2 hover:bg-gray-700">
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    router.push("/");
                                }}
                                className="w-full text-left"
                            >
                                Home
                            </button>
                        </li>
                        <SignedOut>
                            <li className="border-b border-gray-700 p-2 hover:bg-gray-700">
                                <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        handleLogin();
                                    }}
                                    className="w-full text-left"
                                >
                                    Login
                                </button>
                            </li>
                        </SignedOut>
                        <SignedIn>
                            <li className="border-b border-gray-700 p-2 hover:bg-gray-700">
                                <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        handleGoToDashboard();
                                    }}
                                    className="w-full text-left"
                                >
                                    Go to Dashboard
                                </button>
                            </li>
                            <li className="p-2 hover:bg-gray-700">
                                <UserButton afterSignOutUrl="/" />
                            </li>
                        </SignedIn>
                    </ul>
                </div>
            )}
        </header>
    );
}

export default LandingDashBoard;
