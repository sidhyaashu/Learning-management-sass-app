import ReactCardFlip from "react-card-flip";


function FlashCardItem({isFlipped,handleClick,flasCard}){
    return(
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <div onClick={handleClick}>

                <h2 >{flasCard?.front}</h2>
            </div>

            <div onClick={handleClick}>
                This is the back of the card.
                <h2>{flasCard?.back}</h2>
            </div>
        </ReactCardFlip>
    )
}

export default FlashCardItem