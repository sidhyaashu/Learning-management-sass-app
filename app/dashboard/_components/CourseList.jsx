"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import CourseCardItem from "@/app/dashboard/_components/CourseCardItem";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

function CourseList() {
    const { user } = useUser();
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(""); // State for error message

    useEffect(() => {
        if (user) {
            GetCourseList();
        }
    }, [user, page]);

    const GetCourseList = async () => {
        setLoading(true);
        setError(""); // Reset error state
        try {
            const result = await axios.post("/api/courses", {
                createdBy: user?.primaryEmailAddress?.emailAddress,
                page: page,
                limit: 6,
            });
            if (result.data.result.length === 0) {
                setHasMore(false);
            } else {
                setCourseList((prevCourses) => [...prevCourses, ...result.data.result]);
            }
        } catch (error) {
            setError("Error fetching courses. Please try again later.");
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        setCourseList([]); // Clear the current courses
        setPage(1); // Reset to the first page
        setHasMore(true); // Ensure "Load More" works again
        GetCourseList(); // Re-fetch the courses
    };

    const handleLoadMore = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1); // Increment page number to load more
        }
    };

    return (
        <div className="mt-10">
            <h2 className="font-bold text-2xl flex justify-between items-center">
                Your study materials
                <Button
                    variant="outline"
                    onClick={handleRefresh}
                    className="border-primary text-black hover:bg-gray-500 flex items-center"
                >
                    <RefreshCw className="text-black" />
                    Refresh
                </Button>
            </h2>

            {/* Error Message */}
            {error && (
                <div className="text-red-500 text-center mt-4">
                    {error}
                </div>
            )}

            <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5">
                {loading
                    ? [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div
                            key={index}
                            className="h-56 w-full bg-slate-200 rounded-lg animate-pulse relative overflow-hidden"
                        >
                            {/* Add a blur overlay for loading skeleton */}
                            <div className="absolute top-0 left-0 w-full h-full bg-slate-400 opacity-60 blur-lg" />
                        </div>
                    ))
                    : courseList.map((course, index) => <CourseCardItem course={course} key={index} />)}
            </div>

            {hasMore && !loading && (
                <div className="mt-4 text-center">
                    <Button
                        onClick={handleLoadMore}
                        className="border-primary text-black hover:bg-gray-500"
                    >
                        Load More
                    </Button>
                </div>
            )}
        </div>
    );
}

export default CourseList;
