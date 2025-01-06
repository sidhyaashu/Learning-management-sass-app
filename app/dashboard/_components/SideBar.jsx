"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Shield, UserCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

function SideBar() {
    const MenuList = [
        {
            name: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard",
        },
        {
            name: "Upgrade",
            icon: Shield,
            path: "/dashboard/upgrade",
        },
        {
            name: "Profile",
            icon: UserCircle,
            path: "/dashboard/profile",
        },
    ];
    const path = usePathname();

    return (
        <div className="h-screen bg-gray-900 text-white shadow-md p-5 flex flex-col justify-between">
            {/* Logo Section */}
            <div>
                <div className="flex gap-3 items-center">
                    <Image src={"/logo.svg"} alt="LOGO" width={40} height={40} />
                    <h2 className="font-bold text-2xl text-gray-200">XPOLO LMS</h2>
                </div>
                {/* Create New Button */}
                <div className="mt-10">
                    <Link href={"/create"} className="w-full">
                        <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                            + Create New
                        </Button>
                    </Link>
                </div>
                {/* Menu List */}
                <div className="mt-5">
                    {MenuList.map((menu, index) => (
                        <Link
                            href={menu.path}
                            key={index}
                            className={`flex gap-4 items-center p-3 hover:bg-gray-700 rounded-lg cursor-pointer mt-3 ${
                                path === menu.path ? "bg-gray-800" : ""
                            }`}
                        >
                            <menu.icon className="text-gray-300" />
                            <h2 className="text-gray-300">{menu.name}</h2>
                        </Link>
                    ))}
                </div>
            </div>
            {/* Credits Section */}
            <div className="bg-gray-800 p-4 rounded-lg">
                <h2 className="text-lg mb-2 text-gray-200">Available Credits: 5</h2>
                <Progress value={25} className="bg-gray-600" />
                <h2 className="text-sm text-gray-400 mt-2">1 Out of 5 Credits Used</h2>
                <Link
                    href={"/dashboard/upgrade"}
                    className="text-blue-400 text-sm mt-3 inline-block"
                >
                    Upgrade to create more credits
                </Link>
            </div>
        </div>
    );
}

export default SideBar;
