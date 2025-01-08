"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
// import FlashCardItem from "@/app/course/[courseId]/flashcard/_components/FlashCardItem";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

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

        console.log(`Flashcard data`)
        console.log(result?.data);
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
        <div className="max-w-4xl mx-auto mt-10 p-4">
            <h2 className="text-3xl font-bold text-gray-800">Flash Card</h2>
            <p className="mt-2 text-lg text-gray-600">Best thing to know about the content</p>

            {loading ? (
                <div className="text-center mt-6">
                    <span className="text-gray-500">Loading...</span>
                </div>
            ) : (
                <Carousel setApi={setApi} className='mt-10'>
                    <CarouselContent>
                        {flashCard?.content?.map((item, index) => (
                            <CarouselItem key={index} className="p-4">
                                {/*<FlashCardItem*/}
                                {/*    isFlipped={isFlipped}*/}
                                {/*    flashCard={item}*/}
                                {/*    handleClick={handleClick}*/}
                                {/*/>*/}
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex justify-between mt-4">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            )}
        </div>
    );
}

export default FlashCard;
