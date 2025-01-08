"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import FlashCardItem from "@/app/course/[courseId]/flashcard/_components/FlashCardItem";

function FlashCard() {
    const { courseId } = useParams();
    const [loading, setLoading] = useState(false);
    const [flashCard, setFlashCard] = useState([]);
    const [isFlipped, setIsFlipped] = useState(false);
    const [api, setApi] = useState(false);

    const GetFlashCard = async () => {
        setLoading(true);
        const result = await axios.post("/api/study-type", {
            courseId: courseId,
            studyType: "flashcard",
        });

        setFlashCard(result?.data);
        setLoading(false);
    };

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    useEffect(() => {
        if (!api) {
            return;
        }
        api.on("select", () => {
            setIsFlipped(false);
        });
    }, [api]);

    useEffect(() => {
         GetFlashCard();
    }, []);

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-md">
            <h2 className="text-4xl font-bold text-gray-100 text-center">
                Flash Cards
            </h2>
            <p className="mt-2 text-lg text-gray-400 text-center">
                Enhance your knowledge interactively
            </p>

            {loading ? (
                <div className="text-center mt-6">
                    <span className="text-gray-400">Loading...</span>
                </div>
            ) : (
                <Carousel setApi={setApi} className="mt-10">
                    <CarouselContent>
                        {flashCard?.content?.map((item, index) => (
                            <CarouselItem
                                key={index}
                                className="flex justify-center items-center p-4"
                            >
                                <FlashCardItem
                                    isFlipped={isFlipped}
                                    flashCard={item}
                                    handleClick={handleClick}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex justify-between mt-4">
                        <CarouselPrevious className="bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-md px-4 py-2 transition" />
                        <CarouselNext className="bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-md px-4 py-2 transition" />
                    </div>
                </Carousel>
            )}
        </div>
    );
}

export default FlashCard;
