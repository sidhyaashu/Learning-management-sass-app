import ReactCardFlip from "react-card-flip";

function FlashCardItem({ isFlipped, handleClick, flashCard }) {
    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div
                onClick={handleClick}
                className="w-96 h-64 p-5 flex items-center justify-center bg-gray-800 border border-gray-700 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition duration-300"
            >
                <h2 className="text-xl font-bold text-gray-100">{flashCard?.front}</h2>
            </div>

            <div
                onClick={handleClick}
                className="w-96 h-64 p-5 flex items-center justify-center bg-gray-700 border border-gray-600 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition duration-300"
            >
                <h2 className="text-xl font-bold text-gray-100">{flashCard?.back}</h2>
            </div>
        </ReactCardFlip>
    );
}

export default FlashCardItem;
