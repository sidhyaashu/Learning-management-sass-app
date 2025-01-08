"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ label = "Go Back", className = "" }) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className={`px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded ${className}`}
        >
            Back
        </button>
    );
}
