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

    export const generateNotesAiModel = model.startChat({
        generationConfig,
        history: [
            {
                role: "user",
                parts: [
                    {text: "Generate exam material detail content for each chapter, make sure to includes all topic point in the content, make sure to give content in HTML format(do not add HTMLKL,Head,Body,title tag), Then chapters:{\n      \"chapterNumber\": 1,\n      \"chapterTitle\": \"Introduction to Python\",\n      \"topics\": [\n        \"What is Python and its uses?\",\n        \"Basic syntax: Indentation, comments, keywords\",\n        \"Variables and data types: Integers, floats, strings, booleans\"\n      ]\n    }"},
                ],
            },
            {
                role: "model",
                parts: [
                    {text: "```html\n<h1>Chapter 1: Introduction to Python</h1>\n\n<h2>1.1 What is Python and its uses?</h2>\n<p>This section covers the fundamental aspects of Python.  Students should be able to define Python, describe its characteristics (e.g., interpreted, high-level, general-purpose), and provide examples of its diverse applications across various domains, including (but not limited to): web development, data science, machine learning, scripting, automation, and game development.  The exam will assess understanding through short answer questions and potential scenario-based questions where students need to identify the appropriate use of Python for a given task.</p>\n\n<h2>1.2 Basic syntax: Indentation, comments, keywords</h2>\n<p>This section focuses on the core syntactic elements of Python. Students should be able to:</p>\n<ul>\n  <li>Explain the significance of indentation in Python and its role in defining code blocks.</li>\n  <li>Write and identify single-line and multi-line comments effectively.</li>\n  <li>Recognize and define the purpose of common Python keywords (e.g., <code>if</code>, <code>else</code>, <code>for</code>, <code>while</code>, <code>def</code>, <code>return</code>, <code>import</code>, etc.).  The exam may include questions that require identifying correct or incorrect indentation, writing comments to explain code snippets, or determining the function of given keywords within code examples.</li>\n</ul>\n\n<h2>1.3 Variables and data types: Integers, floats, strings, booleans</h2>\n<p>This section covers fundamental data types and variable handling. Students should be able to:</p>\n<ul>\n  <li>Declare and initialize variables of different data types (integer, float, string, boolean).</li>\n  <li>Understand the differences between these data types and their appropriate uses.</li>\n  <li>Perform basic operations (e.g., arithmetic, concatenation, comparison) on variables of different data types.  The exam will include questions requiring variable declarations, type identification, and the correct application of operations based on data types.  Expect code snippets that need to be analyzed or corrected based on data type usage.  Questions on type conversion (casting) may also be included.</li>\n</ul>\n```\n"},
                ],
            },
        ],
    });