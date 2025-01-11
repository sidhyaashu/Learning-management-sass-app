"use client";

import Image from "next/image";

function FeaturesSection() {
    const features = [
        {
            title: "AI-Generated Notes",
            description:
                "Automatically create detailed and personalized study notes with just a click.",
            image: "/ss1.png", // Replace with actual image path
        },
        {
            title: "Flashcards & Quizzes",
            description:
                "Generate interactive flashcards and quizzes to test and reinforce your knowledge.",
            image: "/ss1.png", // Replace with actual image path
        },
        {
            title: "Q&A Sessions",
            description:
                "Get precise answers to your queries and engage in AI-driven Q&A sessions.",
            image: "/ss1.png", // Replace with actual image path
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
            {/* Section Header */}
            <div className="text-center mb-16 px-6">
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                    Unlock the Power of Generative AI
                </h2>
                <p className="mt-6 text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
                    Experience next-level learning with AI-powered tools designed to make education smarter, faster, and more interactive.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6 md:px-12 lg:px-20">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="relative group bg-gray-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-green-400/50 transition-all transform hover:scale-105"
                    >
                        {/* Decorative Gradient Border */}
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 rounded-xl blur-lg opacity-20 group-hover:opacity-100 transition-opacity"></div>

                        {/* Image Container */}
                        <div className="relative z-10 rounded-t-xl overflow-hidden">
                            <Image
                                src={feature.image}
                                alt={feature.title}
                                width={500}
                                height={300}
                                className="w-full h-48 md:h-60 object-cover"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="relative z-20 p-6 bg-gray-900/80 backdrop-blur-md rounded-b-xl">
                            <h3 className="text-xl font-bold text-green-400">
                                {feature.title}
                            </h3>
                            <p className="mt-3 text-gray-300 text-sm">
                                {feature.description}
                            </p>
                        </div>

                        {/* Subtle Glow Effect */}
                        <div className="absolute inset-0 z-0 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 opacity-10 group-hover:opacity-30 transition-opacity"></div>
                    </div>
                ))}
            </div>

            {/* Call-to-Action */}

        </section>
    );
}

export default FeaturesSection;
