"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

function LandingDashBoard({ title }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        router.push("/sign-in");
    };

    const handleGoToDashboard = () => {
        setLoading(true);
        router.push("/dashboard");
    };

    // Close menu on route change
    useEffect(() => {
        const handleRouteChange = () => setMenuOpen(false);
        router.events?.on("routeChangeStart", handleRouteChange);

        return () => {
            router.events?.off("routeChangeStart", handleRouteChange);
        };
    }, [router]);

    return (
        <header className="p-4 shadow-md bg-gray-800 text-gray-100 flex justify-between items-center">
            {/* Left Section: Logo and Title */}
            <div className="flex items-center space-x-4 cursor-pointer" onClick={() => router.push("/")}>
                <img src="/logo.svg" alt="Logo" className="w-8 h-8 rounded-full" />
                {title && <h1 className="text-xl font-bold tracking-wide text-gray-100">{title}</h1>}
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
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-400 hover:text-white">
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Sidebar Menu */}
            {menuOpen && (
                <div className="absolute top-16 right-4 bg-gray-800 shadow-lg rounded-md w-48 z-50">
                    <ul className="text-gray-100">
                        <li className="border-b border-gray-700 p-2 hover:bg-gray-700">
                            <button onClick={handleGoToDashboard} className="w-full text-left">
                                Dashboard
                            </button>
                        </li>
                        <SignedOut>
                            <li className="border-b border-gray-700 p-2 hover:bg-gray-700">
                                <button onClick={handleLogin} className="w-full text-left">
                                    Login
                                </button>
                            </li>
                        </SignedOut>
                        <SignedIn>
                            <li className="border-b border-gray-700 p-2 hover:bg-gray-700">
                                <button onClick={handleGoToDashboard} className="w-full text-left">
                                    Go to Dashboard
                                </button>
                            </li>
                            <li className="p-2 hover:bg-gray-700">
                                <UserButton />
                            </li>
                        </SignedIn>
                    </ul>
                </div>
            )}

            {/* Spinner */}
            {loading && <Spinner show={loading} />}
        </header>
    );
}

const Spinner = ({ show }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-md flex items-center justify-center z-50" style={{ animation: "fadeIn 0.3s ease-in-out" }}>
            <div
                className="h-12 w-12 border-4 border-t-blue-500 border-t-4 rounded-full animate-spin"
                style={{ borderColor: "rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.2) blue rgba(0, 0, 0, 0.2)" }}
            ></div>
        </div>
    );
};

export default LandingDashBoard;
