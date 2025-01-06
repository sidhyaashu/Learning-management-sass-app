import axios from "axios";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import StepProgress from "@/app/course/[courseId]/_components/StepProgress";

function Quiz(){

    const {courseId } = useParams()
    const [loading, setLoading] = useState(flase);
    const [quizData, setQuizData] = useState();
    const [quiz, setQuiz] = useState([]);
    const [stepCount, setStepCount] = useState(0);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState();


    const GetQuiz = async () => {
        setLoading(true);
        const result = await axios.post('/api/study-type',{
            courseId:courseId,
            studyType:'quiz'
        })
        console.log(result?.data)
        setQuizData(result?.data)
        setQuiz(result?.data?.content?.questions)
        setLoading(false);
    }

    const checkAnswer =(userAns,currentQuestion)=>{
        if(userAns == currentQuestion?.answer){
            setIsCorrectAnswer(true);
            setCorrectAnswer(currentQuestion?.answer)
            return;
        }
        setIsCorrectAnswer(false);
    }

    useEffect(() => {
        GetQuiz()
    },[])

    useEffect(() => {
        setIsCorrectAnswer(true);
        setCorrectAnswer(null);
    },[stepCount])

    return quiz && (
        <div>
            <h2>Quiz</h2>
            <StepProgress data={quiz} stepCount={stepCount} setStepCount={v=>setStepCount(v)} />

            <div>
                <QuizCardItem quiz={quiz[stepCount]} userSelectedOption={(v)=>checkAnswer(v,quiz[stepCount])}/>
            </div>

            {isCorrectAnswer == false && <div><h2>Incorrect : {correctAnswer}</h2></div>}
            {isCorrectAnswer == true && <div><h2>Correct</h2></div>}
        </div>
    )
}

export default Quiz;