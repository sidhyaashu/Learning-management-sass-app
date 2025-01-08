"use client";

import SideBar from "@/app/dashboard/_components/SideBar";
import DashboardHeader from "@/app/dashboard/_components/DashBoardHeader";
import { useState } from "react";  // Import useState for managing sidebar collapse state
import { useUser } from "@clerk/nextjs";

function DashboardLayout({ children }) {
    const { user } = useUser();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);  // State for managing sidebar collapse

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);  // Toggle the collapse state
    };

    return (
        <div className="flex min-h-screen bg-gray-800 text-gray-100">
            {/* Sidebar */}
            <aside className={`w-64 ${isSidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 hidden md:block fixed top-0 left-0 h-full`}>
                <SideBar isCollapsed={isSidebarCollapsed} />  {/* Pass collapse state */}
            </aside>

            {/* Main Content */}
            <div className="flex-1 md:ml-64">
                <header>
                    <DashboardHeader
                        title="Dashboard"
                        extraContent={user?.fullName}
                        toggleSidebar={toggleSidebar}  // Pass toggle function
                    />
                </header>
                <main className="p-4">{children}</main>
            </div>
        </div>
    );
}

export default DashboardLayout;
