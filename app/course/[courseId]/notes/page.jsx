"use client"

import axios from "axios";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";

function ViewNotes(){

    const { courseId } = useParams();
    const [notes,setNotes] = useState();
    const [stepCount, setStepCount] = useState(0);

    const GetNotes = async()=>{
        const notes = await axios.post("/api/study-type",{
            courseId: courseId,
            studyType:"notes"
        })

        console.log(notes?.data[stepCount]?.notes)
        setNotes(notes?.data)
    }

    useEffect(()=>{
        GetNotes();
    },[])
    return notes && (
        <div>
            <div className={`flex gap-5 items-center`}>
                {stepCount !== 0 && <Button variant="outline" size="sm" onClick={()=>setStepCount(stepCount-1)}>Previous</Button>}
                {notes?.map((item,index)=>(
                    <div key={index} className={`w-full h-2 rounded-full ${index<stepCount ? 'bg-primary' : 'bg-gray-200'}`} >
                    </div>
                ))}
                <Button variant="outline" onClick={()=>setStepCount(stepCount+1)} size="sm">Next</Button>
            </div>

            <div>
                <div dangerouslySetInnerHTML={{__html:notes[stepCount]?.notes}} />
            </div>
        </div>
    )
}

export default ViewNotes