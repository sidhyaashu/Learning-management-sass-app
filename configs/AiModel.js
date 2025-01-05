const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


    export const courseOutlineAIModel = model.startChat({
        generationConfig,
        history: [
            {
                role: "user",
                parts: [
                    {text: "Generate a study material for python for exam and level of difficulty will be easy with summery of course,\nlist of chapter, Topic list in each chapter. All result in JSON format"},
                ],
            },
            {
                role: "model",
                parts: [
                    {text: "```json\n{\n  \"courseTitle\": \"Python for Beginners\",\n  \"courseSummary\": \"This course provides a foundational understanding of Python programming.  It covers basic syntax, data types, control flow, and fundamental programming concepts.  The material is designed for beginners with little to no prior programming experience and prepares students for introductory-level exams.\",\n  \"chapters\": [\n    {\n      \"chapterNumber\": 1,\n      \"chapterTitle\": \"Introduction to Python\",\n      \"topics\": [\n        \"What is Python?\",\n        \"Setting up your Python environment (Installation and IDE)\",\n        \"Running your first Python program\",\n        \"Basic Syntax (Indentation, comments)\",\n        \"Printing to the console\",\n        \"Understanding Variables and Data Types (Integers, Floats, Strings, Booleans)\"\n      ]\n    },\n    {\n      \"chapterNumber\": 2,\n      \"chapterTitle\": \"Operators and Expressions\",\n      \"topics\": [\n        \"Arithmetic Operators (+, -, *, /, //, %, **)\",\n        \"Comparison Operators (==, !=, >, <, >=, <=)\",\n        \"Logical Operators (and, or, not)\",\n        \"Assignment Operators (=, +=, -=, *=, /=)\",\n        \"Operator Precedence\",\n        \"Working with expressions\"\n      ]\n    },\n    {\n      \"chapterNumber\": 3,\n      \"chapterTitle\": \"Control Flow\",\n      \"topics\": [\n        \"Conditional Statements (if, elif, else)\",\n        \"Looping Constructs (for loop, while loop)\",\n        \"break and continue statements\",\n        \"Nested loops\",\n        \"Practical examples of control flow\"\n      ]\n    },\n    {\n      \"chapterNumber\": 4,\n      \"chapterTitle\": \"Data Structures\",\n      \"topics\": [\n        \"Lists: Creation, Accessing elements, Slicing, Methods\",\n        \"Tuples: Creation, Accessing elements, Immutability\",\n        \"Strings: Common string methods and manipulation\",\n        \"Basic understanding of Dictionaries (key-value pairs)\" \n      ]\n    },\n    {\n      \"chapterNumber\": 5,\n      \"chapterTitle\": \"Functions\",\n      \"topics\": [\n        \"Defining functions\",\n        \"Function parameters and arguments\",\n        \"Return values\",\n        \"Function scope\",\n        \"Calling functions\",\n        \"Practical examples of function usage\"\n      ]\n    },\n    {\n      \"chapterNumber\": 6,\n      \"chapterTitle\": \"Input and Output\",\n      \"topics\": [\n        \"Taking user input (input() function)\",\n        \"Formatted output using f-strings and print()\",\n        \"Reading from and writing to files (basic file I/O)\"\n      ]\n    }\n  ]\n}\n```\n"},
                ],
            },
        ],
    });

    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());

