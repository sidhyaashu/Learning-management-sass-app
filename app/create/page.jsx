"use client";

import { useState } from "react";
import SelectOption from "@/app/create/_components/SelectOption";
import { Button } from "@/components/ui/button";
import TopicInput from "@/app/create/_components/TopicInput";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function Create() {
    const router = useRouter();
    const { user } = useUser();
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    const handleUserInput = (fieldName, fieldValue) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: fieldValue,
        }));
    };

    const GenerateCourseOutLine = async () => {
        if (!formData.courseType || !formData.topic) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const courseId = uuid();

        try {
            setLoading(true);
            await axios.post("/api/generate-course-outline", {
                courseId,
                ...formData,
                createdBy: user?.primaryEmailAddress?.emailAddress,
            });
            setLoading(false);
            router.replace("/dashboard");
            toast.success("Your Course Content is Generating. Please Wait.");
        } catch (error) {
            setLoading(false);
            toast.error(error.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
            <div className="max-w-4xl w-full bg-gray-800 rounded-3xl shadow-2xl p-10">
                <h2 className="text-4xl font-extrabold text-center text-gray-100 mb-6">
                    Create Your Personalized Study Companion 🌟
                </h2>
                <p className="text-lg text-gray-400 text-center mb-10">
                    Start creating tailored learning resources for exams, coding prep,
                    interviews, and more with our AI-powered platform.
                </p>

                <div className="transition-all duration-300">
                    {step === 0 ? (
                        <SelectOption
                            selectedStudyType={(value) => handleUserInput("courseType", value)}
                        />
                    ) : (
                        <TopicInput
                            setTopic={(value) => handleUserInput("topic", value)}
                            setDifficulty={(value) => handleUserInput("difficultyLevel", value)}
                        />
                    )}
                </div>
            </div>

            {/* Button Container */}
            <div className="flex justify-between items-center w-full max-w-4xl mt-16 space-x-4">
                <Button
                    className={`flex-1 py-3 px-6 bg-gray-700 text-white font-semibold text-lg rounded-full shadow-md hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 
                    ${step === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
                    onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
                    disabled={step === 0}
                >
                    Previous
                </Button>

                {step === 0 ? (
                    <Button
                        className="flex-1 py-3 px-6 bg-blue-600 text-white font-semibold text-lg rounded-full shadow-md hover:bg-blue-500 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                        onClick={() => setStep((prev) => prev + 1)}
                        disabled={!formData.courseType}
                    >
                        Next
                    </Button>
                ) : (
                    <Button
                        className="flex-1 py-3 px-6 bg-green-600 text-white font-semibold text-lg rounded-full shadow-md hover:bg-green-500 hover:scale-105 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300"
                        onClick={GenerateCourseOutLine}
                        disabled={loading}
                    >
                        {loading ? "Generating..." : "Generate"}
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Create;
