"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

function QA() {
    const { courseId } = useParams();
    const [loading, setLoading] = useState(false);
    const [qa, setQa] = useState(null);

    const getQA = async () => {
        try {
            setLoading(true);
            const result = await axios.post("/api/study-type", {
                courseId: courseId,
                studyType: "qa",
            });
            setQa(result?.data);
        } catch (error) {
            console.error("Error fetching QA data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect( () => {
        if (courseId) {
            getQA();
        }
    }, [courseId]);

    return (
        <div className="pl-16 pr-16 w-full h-screen">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Accordion type="single" collapsible>
                    {qa?.content?.map((item, index) => (
                        <AccordionItem value={`${index}`} key={`${index}`}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent className={`text-gray-500`}>{item.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
        </div>
    );
}

export default QA;
