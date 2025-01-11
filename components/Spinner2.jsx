"use client"


const Spinner2 = ({ show }) => {
    if (!show) return null; // Only render when 'show' is true

    return (
        <div
            className="fixed inset-0 bg-white/80 backdrop-blur-md flex items-center justify-center z-50"
            style={{ animation: "fadeIn 0.3s ease-in-out" }}
        >
            <div
                className="h-12 w-12 border-4 border-t-blue-500 border-t-4 rounded-full animate-spin"
                style={{
                    borderColor: "rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.2) blue rgba(0, 0, 0, 0.2)",
                }}
            ></div>
        </div>
    );
};

export default Spinner2;
