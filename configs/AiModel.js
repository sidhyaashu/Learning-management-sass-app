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

    const generationConfig2 = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
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
        generationConfig2,
        history: [
            {
                role: "user",
                parts: [
                    {text: "Generate exam material detailed content for the chapter. Make sure to Include all topic points in the content, make sure to give content in HTML format and also inline style (Do not add HTML, Head, Body, Title tags). The chapters : {\n\"chapterNumber\": 1,\n\"chapterTitle\": \"Getting Started with Python\",\n\"chapterSummary\": \"Introduction to Python, basic syntax, variables, data types, and operators.\",\n\"chapterEmoji\": \"🚀\",\n\"topics\": [\n\"What is Python and why learn it?\",\n\"Installing Python and setting up your environment\",\n\"Basic Syntax: Indentation and Comments\",\n\"Variables and Data Types: Integers, Floats, Strings, Booleans\",\n\"Operators: Arithmetic, Comparison, Logical, Assignment\",\n\"Basic Input and Output using print() and input()\"\n]\n},"},
                ],
            },
            {
                role: "model",
                parts: [
                    {text: "```html\n<div style=\"font-family: sans-serif;\">\n  <h1>Chapter 1: Getting Started with Python 🚀</h1>\n  <p style=\"font-style: italic;\">Introduction to Python, basic syntax, variables, data types, and operators.</p>\n\n  <section style=\"margin-bottom: 20px;\">\n    <h2>What is Python and why learn it?</h2>\n    <p>Describe Python's high-level, general-purpose nature.  Explain its readability and ease of use.  Discuss its wide range of applications (web development, data science, machine learning, scripting, etc.). Highlight the benefits of learning Python in today's job market.</p>\n    <ul style=\"list-style-type: disc;\">\n      <li>Explain the concept of interpreted language.</li>\n      <li>Mention popular Python libraries and frameworks.</li>\n      <li>Discuss the community support and resources available for Python.</li>\n    </ul>\n  </section>\n\n  <section style=\"margin-bottom: 20px;\">\n    <h2>Installing Python and setting up your environment</h2>\n    <p>Provide step-by-step instructions on downloading and installing Python from the official website (depending on the operating system: Windows, macOS, Linux). Explain the concept of a Python interpreter and how to run Python code.  Discuss different IDEs or code editors (VS Code, PyCharm, Thonny) and their advantages.  Guide students through installing a suitable IDE.</p>\n    <ul style=\"list-style-type: disc;\">\n      <li>Explain the concept of a virtual environment and its benefits (optional, but recommended for more advanced students).</li>\n      <li>Provide instructions on creating and activating a virtual environment (if covered).</li>\n    </ul>\n  </section>\n\n  <section style=\"margin-bottom: 20px;\">\n    <h2>Basic Syntax: Indentation and Comments</h2>\n    <p>Explain the importance of indentation in Python (as opposed to curly braces in other languages). Show examples of correct and incorrect indentation. Describe the purpose of comments in code and how to write single-line and multi-line comments.</p>\n    <ul style=\"list-style-type: disc;\">\n      <li>Illustrate the impact of incorrect indentation on code execution.</li>\n      <li>Provide examples of effective commenting practices.</li>\n    </ul>\n  </section>\n\n  <section style=\"margin-bottom: 20px;\">\n    <h2>Variables and Data Types: Integers, Floats, Strings, Booleans</h2>\n    <p>Explain the concept of variables and how to declare them in Python. Describe the common data types: integers (int), floating-point numbers (float), strings (str), and booleans (bool). Provide examples of each data type and how to use them. Discuss type conversion (casting).</p>\n    <ul style=\"list-style-type: disc;\">\n      <li>Illustrate variable assignment and re-assignment.</li>\n      <li>Explain the concept of dynamic typing in Python.</li>\n      <li>Show examples of type conversion (e.g., int to str, float to int).</li>\n    </ul>\n  </section>\n\n  <section style=\"margin-bottom: 20px;\">\n    <h2>Operators: Arithmetic, Comparison, Logical, Assignment</h2>\n    <p>Explain different types of operators in Python: arithmetic (+, -, *, /, //, %, **), comparison (==, !=, >, <, >=, <=), logical (and, or, not), and assignment (=, +=, -=, *=, /=). Provide examples of how to use each type of operator.</p>\n    <ul style=\"list-style-type: disc;\">\n      <li>Explain operator precedence and associativity.</li>\n      <li>Show examples of compound assignment operators.</li>\n      <li>Include examples using boolean logic.</li>\n    </ul>\n  </section>\n\n  <section style=\"margin-bottom: 20px;\">\n    <h2>Basic Input and Output using print() and input()</h2>\n    <p>Explain how to use the <code>print()</code> function to display output to the console. Explain how to use the <code>input()</code> function to get input from the user.  Provide examples of taking user input, performing operations on it, and displaying the result.</p>\n    <ul style=\"list-style-type: disc;\">\n      <li>Demonstrate how to use formatted strings (f-strings) for cleaner output.</li>\n      <li>Explain how to handle different input types (e.g., converting string input to numbers).</li>\n      <li>Show examples of error handling (e.g., using try-except blocks to handle potential exceptions).</li>\n    </ul>\n  </section>\n</div>\n```\n"},
                ],
            },
        ],
    });


export const generateFlashCardAiModel = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {text: "Generate the flashcard on topic : Flutter fundamentals, User Interface (UI) Development, Basic App navigation in JSON format with front back content, maximum 15"},
            ],
        },
        {
            role: "model",
            parts: [
                {text: "```json\n[\n  {\n    \"front\": \"What is a Widget in Flutter?\",\n    \"back\": \"A Widget is the fundamental building block of a Flutter UI.  Everything you see on the screen is a widget, including text, images, buttons, and layouts.\"\n  },\n  {\n    \"front\": \"What are the two main types of Widgets?\",\n    \"back\": \"StatelessWidgets and StatefulWidgets. StatelessWidgets don't change their state, while StatefulWidgets can.\"\n  },\n  {\n    \"front\": \"Explain the difference between `StatelessWidget` and `StatefulWidget`.\",\n    \"back\": \"StatelessWidgets are immutable; their UI doesn't change after creation. StatefulWidgets have internal state that can change, triggering UI updates.\"\n  },\n  {\n    \"front\": \"What is the purpose of a `BuildContext`?\",\n    \"back\": \"It provides information about the widget's position in the widget tree and allows access to services like `Theme` and `Navigator`.\"\n  },\n  {\n    \"front\": \"Name three common layout widgets.\",\n    \"back\": \"Row, Column, and Stack.  Row arranges widgets horizontally, Column vertically, and Stack overlays widgets.\"\n  },\n  {\n    \"front\": \"What is the role of `MaterialApp`?\",\n    \"back\": \"It provides a Material Design theme and a default set of widgets for your application.\"\n  },\n  {\n    \"front\": \"How do you navigate to a new screen in Flutter?\",\n    \"back\": \"Use `Navigator.push(context, MaterialPageRoute(builder: (context) => NewScreen()))`.\"\n  },\n  {\n    \"front\": \"How do you return data from a new screen after navigation?\",\n    \"back\": \"Use `Navigator.pop(context, data)` to return data to the previous screen.\"\n  },\n  {\n    \"front\": \"What is the purpose of `Scaffold`?\",\n    \"back\": \"Provides a basic visual layout structure for Material Design apps, including an AppBar, body, and bottomNavigationBar.\"\n  },\n  {\n    \"front\": \"Explain the concept of a Widget Tree.\",\n    \"back\": \"A hierarchical representation of widgets composing the UI, where each widget is a child of another, forming a tree-like structure.\"\n  },\n  {\n    \"front\": \"What is the difference between `setState()` and `build()`?\",\n    \"back\": \"`setState()` triggers a rebuild of the widget, while `build()` is the method that constructs the widget's UI.\"\n  },\n  {\n    \"front\": \"What is a key in Flutter widgets?\",\n    \"back\": \"Keys help Flutter identify widgets during rebuilds, allowing for efficient updates when the widget tree changes structure.\"\n  },\n  {\n    \"front\": \"How to use a `Text` widget?\",\n    \"back\": \"Use `Text('Your text here')` to display text.  You can style it using `TextStyle`.\"\n  },\n  {\n    \"front\": \"What is a `Container` widget used for?\",\n    \"back\": \"A `Container` is a versatile widget that allows you to define size, padding, margin, background color, and other visual aspects for widgets inside it.\"\n  },\n  {\n    \"front\": \"How to handle user input in Flutter?\",\n    \"back\": \"Use widgets like `TextField` for text input, `Checkbox` for boolean choices, and other input widgets appropriate for user interaction.\"\n  }\n]\n```\n"},
            ],
        },
    ],
})

export const generateQuizAiModel = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {text: "Generate Quiz on topic: Flutter fundamentals,user Interface (ui), Development, Basic App Navigation with Question and options along with answer in json format (Maximum 10)\n"},
            ],
        },
        {
            role: "model",
            parts: [
                {text: "```json\n{\n  \"quizTitle\": \"Flutter Fundamentals, UI, and Basic Navigation\",\n  \"questions\": [\n    {\n      \"question\": \"What is the primary language used for building Flutter applications?\",\n      \"options\": [\"Java\", \"Kotlin\", \"Swift\", \"Dart\"],\n      \"answer\": \"Dart\"\n    },\n    {\n      \"question\": \"Which widget is the root of most Flutter UI hierarchies?\",\n      \"options\": [\"Container\", \"Row\", \"Column\", \"MaterialApp\"],\n      \"answer\": \"MaterialApp\"\n    },\n    {\n      \"question\": \"What is the purpose of a StatefulWidget in Flutter?\",\n      \"options\": [\"To create static UI elements\", \"To manage mutable UI state\", \"To define layout structures\", \"To handle user input\"],\n      \"answer\": \"To manage mutable UI state\"\n    },\n    {\n      \"question\": \"Which widget is used to arrange children in a horizontal row?\",\n      \"options\": [\"Column\", \"Row\", \"Stack\", \"Container\"],\n      \"answer\": \"Row\"\n    },\n    {\n      \"question\": \"What does the `BuildContext` provide in a Flutter widget?\",\n      \"options\": [\"The app's theme\", \"Access to the widget tree\", \"User input data\", \"Network connectivity status\"],\n      \"answer\": \"Access to the widget tree\"\n    },\n    {\n      \"question\": \"How do you navigate to a new route in Flutter using `Navigator`?\",\n      \"options\": [\"`Navigator.pushNamed(context, '/routeName')`\", \"`Navigator.pop(context)`\", \"`Navigator.pushReplacementNamed(context, '/routeName')`\", \"All of the above\"],\n      \"answer\": \"All of the above\"\n    },\n    {\n      \"question\": \"What widget is typically used to display a list of items in Flutter?\",\n      \"options\": [\"ListView\", \"GridView\", \"Column\", \"Row\"],\n      \"answer\": \"ListView\"\n    },\n    {\n      \"question\": \"What is the hot reload feature in Flutter?\",\n      \"options\": [\"A way to rebuild the entire app from scratch\", \"A feature that allows you to instantly see code changes in the running app\", \"A debugging tool for finding memory leaks\", \"A method for optimizing app performance\"],\n      \"answer\": \"A feature that allows you to instantly see code changes in the running app\"\n    },\n    {\n      \"question\": \"Which widget is used for creating a simple button in Flutter?\",\n      \"options\": [\"IconButton\", \"TextButton\", \"ElevatedButton\", \"All of the above\"],\n      \"answer\": \"All of the above\"\n    },\n    {\n      \"question\": \"What does `Scaffold` provide in a Flutter app?\",\n      \"options\": [\"A basic layout structure with AppBar, body, and bottomNavigationBar\", \"A way to manage app state\", \"A method for handling user input\", \"A mechanism for network requests\"],\n      \"answer\": \"A basic layout structure with AppBar, body, and bottomNavigationBar\"\n    }\n  ]\n}\n```\n"},
            ],
        },
    ],
});


export const generateQAAiModel = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {text: "Generate a Q&A on topic: Flutter fundamentals,user Interface (ui), Development, Basic App Navigation with question and answer pairs in JSON format (maximum 10)"},
            ],
        },
        {
            role: "model",
            parts: [
                {text: "```json\n[\n  {\n    \"question\": \"What is Flutter?\",\n    \"answer\": \"Flutter is Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.\"\n  },\n  {\n    \"question\": \"What are Widgets in Flutter?\",\n    \"answer\": \"Widgets are the fundamental building blocks of Flutter UI. Everything in a Flutter app is a widget, from a simple button to complex layouts.\"\n  },\n  {\n    \"question\": \"Explain the difference between StatelessWidget and StatefulWidget.\",\n    \"answer\": \"StatelessWidget represents a part of the UI that doesn't change, while StatefulWidget represents a part that can change over time in response to user interactions or other events.\"\n  },\n  {\n    \"question\": \"How do you manage the layout of widgets in Flutter?\",\n    \"answer\": \"Flutter offers various layout widgets like Row, Column, Stack, GridView, and ListView to arrange widgets in different ways, controlling their positioning and size.\"\n  },\n  {\n    \"question\": \"What is the purpose of the `BuildContext`?\",\n    \"answer\": \"BuildContext provides information about the location of a widget within the widget tree. It's used to access services and other parts of the application.\"\n  },\n  {\n    \"question\": \"How do you navigate between screens in a Flutter app?\",\n    \"answer\": \"The `Navigator` widget is used for navigation.  Methods like `Navigator.push()` push a new route onto the navigation stack, and `Navigator.pop()` removes the current route.\"\n  },\n  {\n    \"question\": \"What is a route in Flutter navigation?\",\n    \"answer\": \"A route represents a single screen or page in your application.  It's essentially a visual representation managed by the Navigator.\"\n  },\n  {\n    \"question\": \"How can you pass data between screens during navigation?\",\n    \"answer\": \"Data can be passed using the `arguments` parameter of `Navigator.push()` and retrieved from `ModalRoute.of(context).settings.arguments`.\"\n  },\n  {\n    \"question\": \"What are some common Flutter UI widgets?\",\n    \"answer\": \"Some common widgets include Text, Button, Image, Icon, Container, Scaffold, AppBar, and many more specialized widgets for different UI elements.\"\n  },\n  {\n    \"question\": \"What is the role of the `main()` function in a Flutter application?\",\n    \"answer\": \"The `main()` function is the entry point of the Flutter application.  It's where the `runApp()` function is called, which starts the application and renders the root widget.\"\n  }\n]\n```\n"},
            ],
        },
    ],
});