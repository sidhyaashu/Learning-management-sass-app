"use client"

import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

function MaterialCardItem({ item, studyTypeContent, course, courseId, type })
{
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const GenerateContent = async () => {
        setLoading(true);
        try {
            const chapters = course?.courseLayout?.chapters
                .map((chapter) => chapter.chapterTitle)
                .join(", ");

            const result = await axios.post("/api/generate-study-type-content", {
                courseId,
                type: type,
                chapters,
            });
            // Update the local state to simulate content readiness
            studyTypeContent[item.type] = result.data;
            setLoading(false);
        } catch (error) {
            console.error("Error generating content:", error);
            setLoading(false);
        }
    };

    const handleNavigation = async () => {
        if (!studyTypeContent?.[item.type]?.length) {
            // If the resource is not ready, generate it first
            await GenerateContent();
        }
        // Navigate to the specified path after ensuring resource readiness
        // router.push(`/course/${courseId}/${path}`);
    };

    return (
        <div
            className={`flex flex-col items-center text-center gap-3 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 border ${
                studyTypeContent?.[item.type]?.length
                    ? "bg-green-800 border-green-500"
                    : "bg-gray-800 border-gray-600"
            }`}
        >
            <h2
                className={`p-1 px-2 text-white rounded-full text-[10px] ${
                    studyTypeContent?.[item.type]?.length ? "bg-green-500" : "bg-gray-700"
                }`}
            >
                {studyTypeContent?.[item.type]?.length ? "Ready" : "Generate"}
            </h2>
            <Image src={item.icon} alt={item.name} height={50} width={50} className="mb-3" />
            <h2 className="font-bold text-lg text-white">{item.name}</h2>
            <p className="text-sm text-gray-400">{item.description}</p>
            <button
                className={`px-4 py-2 rounded-lg text-white ${
                    studyTypeContent?.[item.type]?.length
                        ? "bg-gradient-to-r from-green-500 to-blue-500"
                        : "bg-gradient-to-r from-gray-600 to-gray-400"
                }`}
                onClick={handleNavigation}
                disabled={loading}
            >
                {loading
                    ? "Generating..."
                    : studyTypeContent?.[item.type]?.length
                        ? "View"
                        : "Generate"}
            </button>
        </div>
    );
}

export default MaterialCardItem;
