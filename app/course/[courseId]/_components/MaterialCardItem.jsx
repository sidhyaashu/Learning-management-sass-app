"use client";

import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

function MaterialCardItem({ item, studyTypeContent, course, courseId }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const isActive = studyTypeContent?.[item.type]?.length > 0 || studyTypeContent?.flashcard?.content?.length || studyTypeContent?.quiz?.content?.questions?.length || studyTypeContent?.qa?.content?.length;

    // console.log(studyTypeContent?.flashcard?.content?.length)
    // console.log(studyTypeContent?.quiz?.content?.questions?.length)
    // console.log(studyTypeContent?.qa?.content?.length)

    const GenerateContent = async () => {
        setLoading(true);
        try {
            const chapters = course?.courseLayout?.chapters
                .map((chapter) => chapter.chapterTitle)
                .join(", ");

            const result = await axios.post("/api/generate-study-type-content", {
                courseId,
                type: item.type,
                chapters,
            });

            // Update the local state to simulate content readiness
            studyTypeContent[item.type] = result.data;
        } catch (error) {
            console.error("Error generating content:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleView = () => {
        router.push(`/course/${courseId}/${item.type}`);
    };

    return (
        <div
            className={`flex flex-col items-center text-center gap-3 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 border ${
                isActive
                    ? "bg-green-800 border-green-500"
                    : "bg-gray-800 border-gray-600"
            }`}
        >
            {loading ? (
                <p className="text-center text-gray-300">Generating...</p>
            ) : (
                <>
                    <h2
                        className={`p-1 px-2 text-white rounded-full text-[10px] ${
                            isActive ? "bg-green-500" : "bg-gray-700"
                        }`}
                    >
                        {isActive ? "Ready" : "Generate"}
                    </h2>
                    <Image
                        src={item.icon}
                        alt={item.name}
                        height={50}
                        width={50}
                        className="mb-3"
                    />
                    <h2 className="font-bold text-lg text-white">{item.name}</h2>
                    <p className="text-sm text-gray-400">{item.description}</p>
                    {isActive ? (
                        <button
                            onClick={handleView}
                            className="mt-2 bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
                        >
                            View
                        </button>
                    ) : (
                        <button
                            onClick={GenerateContent}
                            className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                        >
                            Generate
                        </button>
                    )}
                </>
            )}
        </div>
    );
}

export default MaterialCardItem;
