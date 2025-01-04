"use client"

import React from "react";
import { useUser } from "@clerk/nextjs";
// import {Button} from "@/components/ui/button";
import Link from "next/link";

const WelcomeBanner = () => {
    const { user } = useUser();

    return (
        <div className="relative bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white p-10 rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('/background-pattern.svg')] bg-cover bg-center"></div>
            <div className="relative z-10">
                <h1 className="text-5xl font-extrabold mb-4 animate-text bg-gradient-to-r from-teal-200 to-yellow-400 bg-clip-text text-transparent">
                    Hello, {user?.firstName || "there"}! 👋
                </h1>
                <p className="text-lg mb-6">
                    Welcome to your GenAI-powered Learning Management System! Let's make
                    learning smarter, faster, and more engaging.
                </p>
                <div className="flex space-x-4">
                    <Link href={"/create"} className="bg-white text-indigo-600 hover:bg-gray-100">
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default WelcomeBanner;
