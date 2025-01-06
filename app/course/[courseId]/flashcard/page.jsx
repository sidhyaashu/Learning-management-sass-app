"use client"


import {useParams} from "next/navigation";
import axios from "axios";
import {useEffect, useState} from "react";
import FlashCardItem from "@/app/course/[courseId]/flashcard/_components/FlashCardItem";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";

function FlashCard(){
    const {courseId } = useParams()
    const [loading, setLoading] = useState(flase);
    const [flasCard,setFlashCard] = useState([])
    const [isFlipped,setIsFlipped] = useState();
    const [api,setApi] = useState(false);

    const GetFlashCard = async () => {
        setLoading(true);
        const result = await axios.post('/api/study-type',{
            courseId:courseId,
            studyType:'falshcard'
        })
        console.log(result?.data)
        setFlashCard(result?.data)
        setLoading(false);
    }

    const handleClick =()=>{
        setIsFlipped(!isFlipped)
    }

    useEffect(()=> {
        if (!api) {
            return;
        }
        api.on('select',()=>{
            setIsFlipped(false)
        })
    },[api])

    useEffect(() => {
        GetFlashCard()
    },[])

    return (
        <div >
            <h2>Flash Card</h2>
            <p>Best thing to know about the content</p>

            <Carousel setApi={setApi}>
                <CarouselContent>
                    {
                        flasCard && flasCard?.content?.map((item,index) => (
                            <CarouselItem key={index}>
                                <FlashCardItem isFlipped={isFlipped} flasCard={flasCard} handleClick={handleClick}></FlashCardItem>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>

        </div>
    )
}

export default FlashCard