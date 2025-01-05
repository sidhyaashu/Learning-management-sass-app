import Image from "next/image";
import {Progress} from "@/components/ui/progress";
import {Button} from "@/components/ui/button";
import {RefreshCw} from "lucide-react";


function CourseCardItem({ course}) {
    return (
            <div className={`p-5 border rounded-lg shadow-md`}>
                <div className={`flex justify-between items-center`}>
                    <Image src={"/knowledge.png"} alt="LOGO" width={50} height={50}/>
                    <h2 className="text-[10px] p-1 px-2 rounded-full bg-blue-600 text-white">20 Dec 2025</h2>
                </div>
                <h2 className={`mt-3 font-medium text-lg`}>{course?.courseLayout?.courseTitle}</h2>
                <p className={`text-xs line-clamp-2 text-gray-500 mt-2`}> {course?.courseLayout?.courseSummary}</p>

                <div className={`mt-3`}>
                    <Progress  value={0}/>
                </div>

                <div className={`mt-3 flex justify-end`}>
                    {course?.status === "Generating"?   <h2 className={`text-[12px] p-1 px-2 rounded-full flex gap-2 items-center text-sm bg-gray-400 text-white`}> <RefreshCw className={`h-5 w-5`} /> Generating...</h2> :<Button>View</Button>}
                </div>

            </div>
    )
}

export default CourseCardItem