"use client";

import { Button } from "@/components/ui/button";

function StepProgress({ stepCount, data, setStepCount }) {
    return (
        <div className="flex gap-5 items-center">
            {stepCount !== 0 && (
                <Button
                    variant="outline"
                    size="sm"
                    className="text-white border-gray-600 hover:bg-gray-700"
                    onClick={() => setStepCount(stepCount - 1)}
                >
                    Previous
                </Button>
            )}
            {data?.map((item, index) => (
                <div
                    key={index}
                    className={`w-full h-2 rounded-full transition-all duration-300 ${
                        index < stepCount ? "bg-blue-500" : "bg-gray-600"
                    }`}
                ></div>
            ))}
            <Button
                variant="outline"
                size="sm"
                className="text-white border-gray-600 hover:bg-gray-700"
                onClick={() => setStepCount(stepCount + 1)}
            >
                Next
            </Button>
        </div>
    );
}

export default StepProgress;
