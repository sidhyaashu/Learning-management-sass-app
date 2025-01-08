"use client"

import MaterialCardItem from "@/app/course/[courseId]/_components/MaterialCardItem";
import {useEffect, useState} from "react";
import axios from "axios";

function StudyMaterialSection({ courseId, course }) {
    const [loading, setLoading] = useState(false);
    const MaterialList = [
        { name: "Notes/Chapters", description: "Notes for Chapters", icon: '/notes.png', type: 'notes' },
        { name: "FlashCard", description: "Flashcards for Chapters", icon: '/flashcard.png', type: 'flashcard' },
        { name: "Quiz", description: "Quiz for Chapters", icon: '/quiz.png', type: 'quiz' },
        { name: "Q&A", description: "Q&A for Chapters", icon: '/qa.png', type: 'qa' },
    ];
    const [studyTypeContent, setStudyTypeContent] = useState();

    const GetStudyMaterial = async () => {
        setLoading(true);
        const result = await axios.post('/api/study-type', { courseId, studyType: 'ALL' });
        setStudyTypeContent(result?.data);
        setLoading(false);
    };

    useEffect(() => {
        GetStudyMaterial();
    }, []);

    return (
        <div className="mt-10">
            <h2 className="text-3xl font-extrabold text-gray-100 text-center mb-8">Study Material</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {MaterialList.map((item, index) => (
                    <MaterialCardItem
                        key={index}
                        item={item}
                        path={item.type}
                        type={item.type}
                        course={course}
                        courseId={courseId}
                        studyTypeContent={studyTypeContent}
                    />
                ))}
            </div>
        </div>
    );
}

export default StudyMaterialSection;
