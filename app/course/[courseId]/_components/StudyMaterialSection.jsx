"use client"

import MaterialCardItem from "@/app/course/[courseId]/_components/MaterialCardItem";
import axios from "axios";
import {useEffect, useState} from "react";


function StudyMaterialSection({ courseId ,course}) {
    const MaterialList = [
        {
            name: "Notes/Chapters",
            description: "Notes for Chapters",
            icon: '/notes.png',
            path: '/notes',
            type:'notes'
        },
        {
            name: "FlashCard",
            description: "Flashcards for Chapters",
            icon: '/flashcard.png',
            path: '/flashcard',
            type:'flashcard'
        },
        {
            name: "Quiz",
            description: "Quiz for Chapters",
            icon: '/quiz.png',
            path: '/quiz',
            type:'quiz'
        },
        {
            name: "Q&A",
            description: "Q&A for Chapters",
            icon: '/qa.png',
            path: '/qa',
            type:'qa'
        },
    ];
    const [ studyTypeContent,setStudyTypeContent ] = useState();
    const [loading, setLoading] = useState(false);

    const GetStudyMaterial = async() => {
        setLoading(true);
        const result = await axios.post('/api/study-type',{
            courseId,
            studyType:'ALL'
        })
        setStudyTypeContent(result?.data)
        setLoading(false);
    }

    useEffect(() => {
        GetStudyMaterial()
    },[])
    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold text-center mb-5">Study Material</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                {MaterialList.map((item, index) => (
                        <MaterialCardItem key={index}  item={item} course={course} courseId={courseId} studyTypeContent={studyTypeContent} />
                ))}
            </div>
        </div>
    );
}

export default StudyMaterialSection;