import {Button} from "@/components/ui/button";

function StepProgress({ stepCount, data, setStepCount }) {
    return (
        <div className="flex items-center gap-4 mb-6">
            {stepCount !== 0 && (
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
                            index < stepCount ? "bg-blue-500" : "bg-gray-600"
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

export default StepProgress;