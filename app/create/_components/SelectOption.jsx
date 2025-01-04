import Image from "next/image";

function SelectOption() {
    const Options = [
        {
            name: "Exam Prep",
            icon: "/exam_1.png",
        },
        {
            name: "Job Interview",
            icon: "/job.png",
        },
        {
            name: "Practice",
            icon: "/practice.png",
        },
        {
            name: "Coding Prep",
            icon: "/code.png",
        },
        {
            name: "Other",
            icon: "/knowledge.png",
        },
    ];

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
                What are you preparing for?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {Options.map((option, index) => (
                    <div
                        key={index}
                        className="group flex flex-col items-center justify-center bg-gradient-to-tr from-purple-100 to-pink-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
                    >
                        <div className="relative w-20 h-20 mb-4">
                            <Image
                                src={option.icon}
                                alt={`${option.name} Icon`}
                                layout="fill"
                                objectFit="contain"
                                className="group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <h3 className="text-gray-900 font-medium text-lg group-hover:text-purple-700 transition-colors duration-300">
                            {option.name}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectOption;
