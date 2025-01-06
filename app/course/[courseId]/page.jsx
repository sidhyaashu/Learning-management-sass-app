"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import CourseIntroCard from "@/app/course/[courseId]/_components/CourseIntroCard";
import StudyMaterialSection from "@/app/course/[courseId]/_components/StudyMaterialSection";
import ChapterList from "@/app/course/[courseId]/_components/ChapterList";

function ViewCourse() {
    const { courseId } = useParams();
    const [course, setCourse] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (courseId) {
            GetCourse();
        }
    }, [courseId]);

    const GetCourse = async () => {
        setLoading(true);
        const result = await axios.get(`/api/courses?courseId=${courseId}`);
        setCourse(result.data.result);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-300">
            <div className="mx-auto max-w-6xl p-6 bg-gray-800 rounded-lg shadow-lg">
                <CourseIntroCard course={course} />
                <StudyMaterialSection courseId={courseId} course={course} />
                <ChapterList course={course} />
            </div>
        </div>
    );
}

export default ViewCourse;