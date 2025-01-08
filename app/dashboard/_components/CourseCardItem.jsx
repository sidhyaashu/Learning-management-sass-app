import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import Link from "next/link";

function CourseCardItem({ course }) {
    return (
        <div className="p-5 border border-gray-700 rounded-lg shadow-xl bg-gray-900 text-gray-300 transition-all duration-300 hover:shadow-2xl hover:bg-gray-800">
            <div className="flex justify-between items-center">
                <Image
                    src={"/knowledge.png"}
                    alt="Course Logo"
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <h2 className="text-xs p-1 px-2 rounded-full bg-blue-600 text-white">
                    20 Dec 2025
                </h2>
            </div>
            <h2 className="mt-3 font-semibold text-xl text-gray-100 leading-snug">
                {course?.courseLayout?.courseTitle}
            </h2>
            <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                {course?.courseLayout?.courseSummary}
            </p>
            <div className="mt-3">
                <Progress value={0} className="rounded-full h-2 bg-blue-500" />
            </div>
            <div className="mt-4 flex justify-end items-center gap-3">
                {course?.status === "Generating" ? (
                    <h2 className="text-sm p-1 px-3 rounded-full flex gap-2 items-center bg-gray-600 text-white">
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        Generating...
                    </h2>
                ) : (
                    <Link href={`/course/${course?.courseId}`}>
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200">
                            View
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default CourseCardItem;
