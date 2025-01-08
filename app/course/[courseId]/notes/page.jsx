"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import StepProgress from "@/app/course/[courseId]/_components/StepProgress";



function ViewNotes() {
    const { courseId } = useParams();
    const [notes, setNotes] = useState([]);
    const [stepCount, setStepCount] = useState(0);

    const getNotes = async () => {
        const result = await axios.post("/api/study-type", {
            courseId: courseId,
            studyType: "notes",
        });
        setNotes(result?.data || []);
    };

    useEffect(() => {
        getNotes();
    }, []);

    return notes.length > 0 ? (
        <div className="p-10 bg-gray-900 text-white min-h-screen">
            <h1 className="text-2xl font-semibold mb-4 text-blue-400">
                Course Notes Viewer
            </h1>
            <StepProgress stepCount={stepCount} data={notes} setStepCount={setStepCount} />
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-2 text-blue-300">
                    Chapter {stepCount + 1}: {notes[stepCount]?.title}
                </h2>
                <div
                    className="text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: (notes[stepCount]?.notes).replace("```html","") }}
                />
            </div>
        </div>
    ) : (
        <div className="flex justify-center items-center min-h-screen text-gray-400">
            <p>Loading notes...</p>
        </div>
    );
}

export default ViewNotes;
