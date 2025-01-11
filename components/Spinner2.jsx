"use client";

const Spinner2 = ({ show }) => {
    if (!show) return null; // Only render when 'show' is true

    return (
        <div
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-md flex items-center justify-center z-50"
            style={{ animation: "fadeIn 0.3s ease-in-out" }}
        >
            <div
                className="h-12 w-12 border-4 border-t-gray-600 border-t-4 rounded-full animate-spin"
                style={{
                    borderColor: "rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) #0366d6 rgba(0, 0, 0, 0.1)", // GitHub blue (#0366d6)
                }}
            ></div>
        </div>
    );
};

export default Spinner2;
