"use client";

import MaterialCardItem from "@/app/course/[courseId]/_components/MaterialCardItem";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link"

function StudyMaterialSection({ courseId, course }) {
    const [loading, setLoading] = useState(false);
    const [studyTypeContent, setStudyTypeContent] = useState(null);

    const MaterialList = [
        { name: "FlashCard", description: "Flashcards for Chapters", icon: '/flashcard.png', type: 'flashcard' },
        { name: "Quiz", description: "Quiz for Chapters", icon: '/quiz.png', type: 'quiz' },
        { name: "Q&A", description: "Q&A for Chapters", icon: '/qa.png', type: 'qa' },
    ];

    const GetStudyMaterial = async () => {
        try {
            setLoading(true);
            const result = await axios.post('/api/study-type', { courseId, studyType: 'ALL' });
            setStudyTypeContent(result?.data);
        } catch (error) {
            console.error("Error fetching study materials:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetStudyMaterial();
    }, [courseId]); // Added courseId as a dependency for useEffect to ensure it triggers properly

    return (
        <div className="mt-10">
            {loading ? (
                <p className="text-center text-gray-300">Loading...</p>
            ) : (
                <>
                    <h2 className="text-3xl font-extrabold text-gray-100 text-center mb-8">Study Material</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Notes section */}
                        <div id="note-section" className="flex flex-col bg-green-800 border-gray-600 items-center text-center gap-3 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 border ">
                            <Image
                                src={'/notes.png'}
                                alt="notes"
                                height={50}
                                width={50}
                                className="mb-3"
                            />
                            <h2 className="font-bold text-lg text-white">{'Notes'}</h2>
                            <p className="text-sm text-gray-400">Notes for chapters</p>
                            <Link href={`/course/${courseId}/notes`}
                                className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                            >
                                View
                            </Link>
                        </div>
                        
                        {/* Map through the MaterialList */}
                        {MaterialList.map((item, index) => (
                            <MaterialCardItem
                                key={index}
                                item={item}
                                path={item.type}
                                type={item.type}
                                course={course}
                                courseId={courseId}
                                studyTypeContent={studyTypeContent}
                                setStudyTypeContent={setStudyTypeContent} // Fixed missing setter for studyTypeContent
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default StudyMaterialSection;
