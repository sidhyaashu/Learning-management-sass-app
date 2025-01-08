import ReactCardFlip from "react-card-flip";

function FlashCardItem({ isFlipped, handleClick, flashCard }) {
    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <div
                onClick={handleClick}
                className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white cursor-pointer hover:shadow-xl transition duration-300"
            >
                <h2 className="text-xl font-semibold text-gray-800">{flashCard?.front}</h2>
            </div>

            <div
                onClick={handleClick}
                className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white cursor-pointer hover:shadow-xl transition duration-300"
            >
                <h2 className="text-xl font-semibold text-gray-800">{flashCard?.back}</h2>
            </div>
        </ReactCardFlip>
    );
}

export default FlashCardItem;
