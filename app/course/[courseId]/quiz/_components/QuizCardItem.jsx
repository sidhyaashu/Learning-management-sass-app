"use client"

import {useState} from "react";

function QuizCardItem({quiz,userSelectedOption}){
    const [selectedOption, setSelectedOption] = useState()

    return (
        <div>
            <h2>{quiz?.question}</h2>

            <div>
                {quiz?.options.map((option,index)=>(
                    <h2 onClick={()=> {
                        setSelectedOption(option); userSelectedOption(option)
                    }} key={index}>{option}</h2>
                ))}
            </div>
        </div>
    )
}