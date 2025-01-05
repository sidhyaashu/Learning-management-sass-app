import Image from "next/image";
import { Progress } from "@/components/ui/progress";

function CourseIntroCard({ course }) {
    return (
        <div className="flex flex-col items-center bg-gradient-to-r from-pink-500 to-red-500 p-5 rounded-lg shadow-lg text-white">
            <Image src={'/knowledge.png'} alt="LOGO" width={70} height={70} className="mb-5" />

            <div className="text-center">
                <h2 className="text-lg font-semibold mb-2">{course?.courseLayout?.courseTitle}</h2>
                <p className="mb-4">{course?.courseLayout?.courseSummary}</p>
                <Progress value={0} className="w-full mb-4" />
                <h2 className="text-sm">Total Chapters: {course?.courseLayout?.chapters?.length}</h2>
            </div>
        </div>
    );
}

export default CourseIntroCard;