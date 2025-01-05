"use client"

import {useUser} from "@clerk/nextjs";
import axios from "axios";
import {useEffect, useState} from "react";
import CourseCardItem from "@/app/dashboard/_components/CourseCardItem";


function CourseList() {
    const { user } = useUser()
    const [courseList,setCourseList] = useState([])

    useEffect(()=>{
        user && GetCourseList()
    },[user])

    const GetCourseList =async()=>{
        const result = await axios.post("/api/courses",{
            createdBy:user?.primaryEmailAddress?.emailAddress
        })
        setCourseList(result.data.result)
    }

    return (
        <div>
            <h2> Your study materials</h2>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5">
                {courseList.map((course,index)=>(
                    <CourseCardItem course={course} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default CourseList