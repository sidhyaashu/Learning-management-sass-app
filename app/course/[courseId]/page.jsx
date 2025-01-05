"use client"

import {useParams} from "next/navigation";
import DashboardHeader from "@/app/dashboard/_components/DashBoardHeader";


function ViewCourse(){
    const { courseId } = useParams()

    return (
        <div>
            <DashboardHeader/>
        </div>
    )
}

export default ViewCourse;