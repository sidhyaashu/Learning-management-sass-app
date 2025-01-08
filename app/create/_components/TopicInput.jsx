"use client";

import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function TopicInput({ setTopic, setDifficulty }) {
    return (
        <div className="p-6 max-w-3xl mx-auto bg-gray-800 rounded-3xl">
            <h2 className="text-3xl font-bold text-center text-gray-100 mb-6">
                Create a New Topic
            </h2>

            <div className="space-y-4">
                <label className="block text-lg font-medium text-gray-300">
                    Start writing your topic:
                </label>
                <Textarea
                    placeholder="Write your topic details here..."
                    className="w-full p-4 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                    onChange={(e) => setTopic(e.target.value)}
                />
            </div>

            <div className="space-y-4 mt-6">
                <label className="block text-lg font-medium text-gray-300">
                    Select the difficulty level:
                </label>
                <Select onValueChange={(value) => setDifficulty(value)}>
                    <SelectTrigger className="w-full p-4 bg-gray-700 border border-gray-600 text-gray-100 rounded-lg shadow-sm hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300">
                        <SelectValue placeholder="Choose Difficulty Level" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-full">
                        <SelectItem
                            value="Easy"
                            className="p-3 text-gray-300 hover:bg-blue-600 hover:text-white rounded-lg transition-all cursor-pointer"
                        >
                            Easy
                        </SelectItem>
                        <SelectItem
                            value="Moderate"
                            className="p-3 text-gray-300 hover:bg-blue-600 hover:text-white rounded-lg transition-all cursor-pointer"
                        >
                            Intermediate
                        </SelectItem>
                        <SelectItem
                            value="Hard"
                            className="p-3 text-gray-300 hover:bg-blue-600 hover:text-white rounded-lg transition-all cursor-pointer"
                        >
                            Advanced
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default TopicInput;