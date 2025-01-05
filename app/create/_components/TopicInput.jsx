"use client";

import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function TopicInput({setTopic,setDifficulty}) {
    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-3xl">
            {/* Title */}
            <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                Create a New Topic
            </h2>

            {/* Textarea Section */}
            <div className="space-y-4">
                <label className="block text-lg font-medium text-gray-700">
                    Start writing your topic:
                </label>
                <Textarea
                    placeholder="Write your topic details here..."
                    className="w-full p-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
                    onChange={(e) => setTopic(e.target.value)}
                  />
            </div>

            {/* Select Section */}
            <div className="space-y-4">
                <label className="block text-lg font-medium text-gray-700">
                    Select the difficulty level:
                </label>
                <Select onValueChange={(value)=>setDifficulty(value)}>
                    <SelectTrigger className="w-full p-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300">
                        <SelectValue placeholder="Choose Difficulty Level" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-lg w-full">
                        <SelectItem
                            value="Easy"
                            className="p-3 text-gray-700 hover:bg-purple-100 rounded-lg transition-all cursor-pointer"
                        >
                            Easy
                        </SelectItem>
                        <SelectItem
                            value="Moderate"
                            className="p-3 text-gray-700 hover:bg-purple-100 rounded-lg transition-all cursor-pointer"
                        >
                            Intermediate
                        </SelectItem>
                        <SelectItem
                            value="Hard"
                            className="p-3 text-gray-700 hover:bg-purple-100 rounded-lg transition-all cursor-pointer"
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
