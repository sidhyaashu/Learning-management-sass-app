"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {useState,useEffect} from "react";

function MaterialCardItem({ item ,studyTypeContent,course,courseId}) {
    const [ loading, setLoading ] = useState(false);
    useEffect(()=>{
        console.log(`item ${item}`);
        console.log(`studyTypeContent ${studyTypeContent}`);
        console.log(`Course ID ${courseId}`);
    },[])

    const GenerateContent = async ()=>{
        setLoading(true);
        let chapters = ''
        course?.courseLayout?.chapters.forEach((chapter)=>{
            chapters = (chapter.chapterTitle || chapter.chapter_title)+','+ chapters
        })
        const result = await axios.post("/api/generate-study-type-content",{
            courseId:courseId,
            type:item.name,
            chapters:chapters,
        });

        console.log(result);
        setLoading(false);
    }

    return (
        <div className={`bg-white bg-opacity-20 p-5 rounded-lg shadow-lg flex flex-col items-center text-center gap-2 ${studyTypeContent?.[item.type]?.length == null && 'grayscale'}`}>
            {
                studyTypeContent?.[item.type]?.length == null
                    ? <h2 className={'p-1 px-2 bg-gray-500 text-white rounded-full text-[10px]'}>Generate</h2>
                    : <h2 className={'p-1 px-2 bg-green-500 text-white rounded-full text-[10px]'}>Ready</h2>
            }

            <Image src={item.icon} alt={item.name} height={50} width={50} className="mb-3" />
            <h2 className="font-bold text-lg mb-2">{item.name}</h2>
            <p className="text-sm mb-3">{item.description}</p>

            {
                studyTypeContent?.[item.type]?.length == null
                    ? <Button className="bg-gradient-to-r from-gray-400 to-blue-500 text-white px-4 py-2 rounded-lg" onClick={()=>GenerateContent()}>Generate</Button>
                    : <Button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-lg">View</Button>
            }

        </div>
    );
}

export default MaterialCardItem;