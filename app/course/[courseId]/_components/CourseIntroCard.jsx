import Image from "next/image";
import { Progress } from "@/components/ui/progress";

function CourseIntroCard({ course }) {
    return (
        <div className="flex flex-col items-center bg-gray-800 p-8 rounded-xl shadow-xl text-gray-300">
            <Image src={'/knowledge.png'} alt="LOGO" width={80} height={80} className="mb-4 rounded-full" />
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2 text-gray-100">{course?.courseLayout?.courseTitle}</h2>
                <p className="mb-4 text-gray-400">{course?.courseLayout?.courseSummary}</p>
                <Progress value={0} className="w-full mb-4 bg-gray-700" />
                <h2 className="text-sm text-gray-400">Total Chapters: {course?.courseLayout?.chapters?.length}</h2>
            </div>
        </div>
    );
}

export default CourseIntroCard;
