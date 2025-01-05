"use client";

import { useState } from "react";
import SelectOption from "@/app/create/_components/SelectOption";
import { Button } from "@/components/ui/button";
import TopicInput from "@/app/create/_components/TopicInput";
import { v4 as uuid } from "uuid";
import axios from "axios";
import {useUser} from "@clerk/nextjs"
import {useRouter} from "next/navigation";

function Create() {
    const router = useRouter();
    const { user } = useUser()
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState([])
    const [loading,setLoading] = useState(false);
    const handleUserInput =(fieldName,fieldValue)=>{
        setFormData(prev=>({
            ...prev,
            [fieldName]:fieldValue
        }))
    }

    // Used to save user input and generate Ai course layout
    const GenerateCourseOutLine = async () => {
        if (!formData.courseType || !formData.topic) {
            console.error("Missing required fields in formData");
            return;
        }

        const courseId = uuid();

        try {
            setLoading(true);
            const result = await axios.post("/api/generate-course-outline", {
                courseId,
                ...formData,
                createdBy: user?.primaryEmailAddress?.emailAddress,
            });
            setLoading(false);
            router.replace("/dashboard")
        } catch (error) {
            console.error("API Call Error:", error.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#6C63FF] via-[#6B5B95] to-[#FF6F91] flex flex-col items-center justify-center p-6">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-10 ">
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 text-center mb-6">
                    Create Your Personalized Study Companion 🌟
                </h2>
                <p className="text-lg text-gray-700 text-center mb-10">
                    Welcome to our AI-powered platform! Start creating your tailored
                    learning resources for exams, coding prep, interviews, and more.
                </p>
                <div>{step === 0 ? <SelectOption selectedStudyType={(value)=>handleUserInput('courseType',value)} /> : <TopicInput setTopic={(value)=>handleUserInput('topic',value)} setDifficulty={(value)=>handleUserInput('difficualtyLevel',value)}/>}</div>
            </div>

            {/* Button Container */}
            <div className="flex justify-between items-center w-full max-w-4xl mt-16 space-x-4">
                <Button
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-lg rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
                    onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
                    disabled={step === 0} // Disable the "Previous" button on the first step
                >
                    Previous
                </Button>
                {
                    step === 0 ? <Button
                        className="flex-1 py-3 px-6 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold text-lg rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
                        onClick={() => setStep((prev) => prev + 1)}
                    >
                        Next
                    </Button> : <Button
                        className="flex-1 py-3 px-6 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold text-lg rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
                        onClick={GenerateCourseOutLine}
                        disabled={loading}
                    >
                        Generate
                    </Button>
                }
            </div>
        </div>
    );
}

export default Create;
