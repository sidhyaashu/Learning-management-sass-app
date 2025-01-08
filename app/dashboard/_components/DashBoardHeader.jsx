"use client";

import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react"; // Import the hamburger icon from lucide-react

function DashboardHeader({ title, extraContent, toggleSidebar }) {
    const router = useRouter();

    const navigateToDashboard = () => {
        if (title === "Dashboard") {
            router.push("/dashboard");
        }
    };

    return (
        <header
            className="p-4 shadow-md bg-gray-900 text-gray-100 flex justify-between items-center"
            aria-label="Dashboard Header"
        >
            {/* Left Section: Title */}
            <div onClick={navigateToDashboard} className="flex items-center cursor-pointer">
                {title && <h1 className="text-xl font-bold tracking-wide">{title}</h1>}
            </div>

            {/* Right Section: Hamburger & User Button */}
            <div className="flex items-center space-x-4">
                {/* Hamburger Button */}
                <button
                    onClick={toggleSidebar}  // Trigger sidebar toggle
                    className="md:hidden text-gray-400 hover:text-white"
                >
                    <Menu className="w-6 h-6" />
                </button>

                {/* Extra Content */}
                {extraContent && (
                    <div className="hidden sm:block text-gray-400">{extraContent}</div>
                )}

                <UserButton />
            </div>
        </header>
    );
}

export default DashboardHeader;
