"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import CourseCardItem from "@/app/dashboard/_components/CourseCardItem";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import Spinner2 from "@/components/Spinner2";



function CourseList() {
    const { user } = useUser();
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            GetCourseList();
        }
    }, [user, page]); // Ensures the effect runs when `user` or `page` changes

    const GetCourseList = async () => {
        setLoading(true);
        setError(""); // Clear any previous error
        try {
            const response = await axios.post("/api/courses", {
                createdBy: user?.primaryEmailAddress?.emailAddress,
                page: page,
                limit: 6,
            });

            const courses = response.data.result;

            if (courses.length === 0) {
                setHasMore(false); // No more courses to load
            } else {
                setCourseList((prevCourses) => [...prevCourses, ...courses]);
            }
        } catch (error) {
            setError("Error fetching courses. Please try again later.");
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        setCourseList([]); // Clear current courses
        setPage(1); // Reset to first page
        setHasMore(true); // Enable load more button again
        GetCourseList(); // Re-fetch courses
    };

    const handleLoadMore = () => {
        if (hasMore && !loading) {
            setPage((prevPage) => prevPage + 1); // Load the next page
        }
    };

    return (
        <div className="mt-10">
            <h2 className="font-bold text-2xl flex justify-between items-center">
                Your Study Materials
                <Button
                    variant="outline"
                    onClick={handleRefresh}
                    className="border-primary text-black hover:bg-gray-500 flex items-center"
                    disabled={loading} // Disable button while loading
                >
                    <RefreshCw className="text-black" />
                    {loading ? "Refreshing..." : "Refresh"}
                </Button>
            </h2>

            {/* Error Message */}
            {error && (
                <div className="text-red-500 text-center mt-4">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5">
                {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-56 w-full bg-slate-200 rounded-lg animate-pulse relative overflow-hidden"
                        >
                            {/* Loading Skeleton */}
                            <div className="absolute top-0 left-0 w-full h-full bg-slate-400 opacity-60 blur-lg" />
                        </div>
                    ))
                    : courseList.map((course, index) => (
                        <CourseCardItem course={course} key={index} />
                    ))}
            </div>

            {/* Show Load More Button */}
            {hasMore && !loading && (
                <div className="mt-4 text-center">
                    <Button
                        onClick={handleLoadMore}
                        className="border-primary text-black hover:bg-gray-500"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Load More"}
                    </Button>
                </div>
            )}

            {/* Show Spinner when loading */}
            {loading && <Spinner2 show={loading} />}
        </div>
    );
}

export default CourseList;
