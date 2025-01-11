"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, UserCircle, LogOut, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

function SideBar({ isCollapsed }) {
    const MenuList = [
        {
            name: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard",
        },
        {
            name: "Profile",
            icon: UserCircle,
            path: "/dashboard/profile",
        },
    ];

    const path = usePathname();

    return (
        <div
            className={`relative h-screen bg-gray-900 text-white shadow-lg p-5 flex flex-col justify-between ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300`}>

            <div className="flex flex-col gap-10">
                {/* Logo Section */}
                <div className="flex gap-3  items-center">
                    {!isCollapsed && (
                        <>
                            <Image src={"/logo.svg"} alt="LOGO" width={40} height={40}/>
                            <h2 className="font-bold text-2xl text-gray-200">XPOLO LMS</h2>
                        </>
                    )}
                </div>


                <div className="flex flex-col gap-5">
                    {/* Create New Button */}
                    {!isCollapsed && (
                        <Link href={"/create"} className="w-full">
                            <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                                + Create New
                            </Button>
                        </Link>
                    )}

                    <div>
                        {/* Menu List */}
                        {MenuList.map((menu, index) => (
                            <Link
                                href={menu.path}
                                key={index}
                                className={`flex gap-4 items-center p-3 hover:bg-gray-700 rounded-lg cursor-pointer mt-3 transition-all ${
                                    path === menu.path ? "bg-gray-800" : ""
                                }`}
                            >
                                <menu.icon className="text-gray-300"/>
                                {!isCollapsed && <h2 className="text-gray-300">{menu.name}</h2>}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                {/* Credits Section */}
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h2 className="text-lg mb-2 text-gray-200">Available Credits: 5</h2>
                    <Progress value={25} className="bg-gray-600"/>
                    <h2 className="text-sm text-gray-400 mt-2">1 Out of 5 Credits Used</h2>
                    <Link
                        href={"/dashboard/upgrade"}
                        className="text-blue-400 text-sm mt-3 inline-block"
                    >
                        Upgrade to create more credits
                    </Link>
                </div>

                {/* User Configurations */}
                <div className="bg-gray-800 p-4 rounded-lg mt-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-gray-200">User Settings</h2>
                        <div className="flex gap-3 items-center">
                            <Settings className="text-gray-300 hover:text-white cursor-pointer"/>
                            <LogOut className="text-gray-300 hover:text-red-500 cursor-pointer"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
