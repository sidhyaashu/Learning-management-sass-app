"use client"

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
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen text-white">
            <div className="mx-5 md:mx-20 lg:mx-40 xl:mx-60 p-5 rounded-lg bg-white bg-opacity-10 shadow-lg">
                {/* Course Intro */}
                <CourseIntroCard course={course} />

                {/* Study Material Options */}
                <StudyMaterialSection courseId={courseId} course={course} />

                {/* Chapter List */}
                <ChapterList course={course} />
            </div>
        </div>
    );
}

export default ViewCourse;