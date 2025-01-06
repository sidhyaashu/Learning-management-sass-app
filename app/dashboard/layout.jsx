"use client";

import SideBar from "@/app/dashboard/_components/SideBar";
import DashboardHeader from "@/app/dashboard/_components/DashBoardHeader";
import { useUser } from "@clerk/nextjs";

function DashboardLayout({ children }) {
    const { user } = useUser();

    return (
        <div className="flex min-h-screen bg-gray-800 text-gray-100">
            {/* Sidebar */}
            <aside className="w-64 hidden md:block fixed top-0 left-0 h-full">
                <SideBar />
            </aside>

            {/* Main Content */}
            <div className="flex-1 md:ml-64">
                <header>
                    <DashboardHeader
                        title="Dashboard"
                        extraContent={user?.fullName}
                    />
                </header>
                <main className="p-4">{children}</main>
            </div>
        </div>
    );
}

export default DashboardLayout;
