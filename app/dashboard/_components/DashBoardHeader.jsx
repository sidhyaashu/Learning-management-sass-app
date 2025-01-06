"use client";

import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function DashboardHeader({ title, extraContent }) {
    const router = useRouter(); // Correctly call useRouter at the top level

    const navigateToDashboard = () => {
        if (title === "Dashboard") {
            router.push("/dashboard"); // Use the router instance to navigate
            return;
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

            {/* Right Section: Extra Content & User Button */}
            <div className="flex items-center space-x-4">
                {extraContent && (
                    <div className="hidden sm:block text-gray-400">{extraContent}</div>
                )}
                <UserButton />
            </div>
        </header>
    );
}

export default DashboardHeader;
