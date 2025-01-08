"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {useParams} from "next/navigation";

function StepProgress({ stepCount, data, setStepCount }) {
    return (
        <div className="flex items-center gap-4 mb-6">
            {stepCount > 0 && (
                <Button
                    variant="outline"
                    size="sm"
                    className="text-black border-gray-600 hover:bg-gray-700"
                    onClick={() => setStepCount(stepCount - 1)}
                >
                    Previous
                </Button>
            )}
            <div className="flex-1 flex gap-2">
                {data?.map((_, index) => (
                    <div
                        key={index}
                        className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                            index <= stepCount ? "bg-blue-500" : "bg-gray-600"
                        }`}
                    ></div>
                ))}
            </div>
            {stepCount < data.length - 1 && (
                <Button
                    variant="outline"
                    size="sm"
                    className="text-black border-gray-600 hover:bg-gray-700"
                    onClick={() => setStepCount(stepCount + 1)}
                >
                    Next
                </Button>
            )}
        </div>
    );
}

function Quiz() {
    const { courseId } = useParams();
    const [loading, setLoading] = useState(false);
    const [quizData, setQuizData] = useState(null);
    const [quiz, setQuiz] = useState([]);
    const [stepCount, setStepCount] = useState(0);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);

    const getQuiz = async () => {
        try {
            setLoading(true);
            const result = await axios.post("/api/study-type", {
                courseId: courseId,
                studyType: "quiz",
            });
            setQuizData(result?.data);
            setQuiz(result?.data?.content?.questions || []);
        } catch (error) {
            console.error("Error fetching quiz data:", error);
        } finally {
            setLoading(false);
        }
    };

    const checkAnswer = (userAns, currentQuestion) => {
        if (userAns === currentQuestion?.answer) {
            setIsCorrectAnswer(true);
        } else {
            setIsCorrectAnswer(false);
            setCorrectAnswer(currentQuestion?.answer);
        }
    };

    useEffect(() => {
        if (courseId) {
            getQuiz();
        }
    }, [courseId]);

    useEffect(() => {
        setIsCorrectAnswer(null);
        setCorrectAnswer(null);
    }, [stepCount]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        quiz && (
            <div>
                <h2 className="text-3xl font-bold mb-6">Quiz</h2>
                <StepProgress data={quiz} stepCount={stepCount} setStepCount={setStepCount} />

                <div>
                    <QuizCardItem
                        quiz={quiz[stepCount]}
                        userSelectedOption={(v) => checkAnswer(v, quiz[stepCount])}
                    />
                </div>

                {isCorrectAnswer === false && (
                    <div className="mt-4">
                        <h2 className="text-red-500">
                            Incorrect! Correct Answer: {correctAnswer}
                        </h2>
                    </div>
                )}
                {isCorrectAnswer === true && (
                    <div className="mt-4">
                        <h2 className="text-green-500">Correct!</h2>
                    </div>
                )}
            </div>
        )
    );
}

export default Quiz;

function QuizCardItem({ quiz, userSelectedOption }) {
    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <div className="p-6 bg-gray-900 text-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">{quiz?.question}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quiz?.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setSelectedOption(option);
                            userSelectedOption(option);
                        }}
                        className={`py-3 px-6 rounded-md transition-all duration-300 ${
                            selectedOption === option
                                ? "bg-green-500 text-gray-900"
                                : "bg-gray-800 hover:bg-gray-700"
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}
