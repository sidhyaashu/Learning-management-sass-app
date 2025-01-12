"use client";

import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

function MaterialCardItem({ item, studyTypeContent, setStudyTypeContent, course, courseId, type }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    let isActive = studyTypeContent?.[`${item.type}`] != null;

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

            // Properly update state using setStudyTypeContent
            setStudyTypeContent((prevContent) => ({
                ...prevContent,
                [item.type]: result.data,
            }));
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
            className={`flex flex-col items-center text-center gap-3 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 border 
                ${isActive ? 'bg-green-800 border-green-600' : 'bg-gray-800 border-gray-600'}`} // Conditional color based on isActive
        >
            {loading ? (
                <p className="text-center text-gray-300">Generating...</p>
            ) : (
                <>
                    <Image
                        src={item.icon}
                        alt={item.name}
                        height={50}
                        width={50}
                        className="mb-3"
                    />
                    <h2 className="font-bold text-lg text-white">{item.name}</h2>
                    <p className="text-sm text-gray-400">{item.description}</p>

                    {/* Only show the Generate button if no content is available */}
                    {!isActive && (
                        <button
                            onClick={GenerateContent}
                            className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                        >
                            Generate
                        </button>
                    )}

                    {/* Display the content if available */}
                    {isActive && (
                        <button
                            onClick={handleView}
                            className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                        >
                            View
                        </button>
                    )}
                </>
            )}
        </div>
    );
}

export default MaterialCardItem;
