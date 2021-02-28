const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;
let boardLocked = false;
const flipCard = e => {
   
    if (boardLocked) return;
   
    const target = e.target.parentElement;
    
    if(target === firstCard) return;
    target.classList.add("flip");

    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = target;
    } else {

        // Second click

        hasFlippedCard = false;
        secondCard = target;

        // Check for Match
        checkForMatch();

    }
};


const checkForMatch = () => {

    const isEqual = firstCard.dataset.framework === secondCard.dataset.framework;

        isEqual ? disableCards() : unflipCards();
    
}

const disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}
const unflipCards = () => {

    boardLocked = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
};

const resetBoard = () => {
   
    hasFlippedCard = boardLocked = false;
    firstCard = secondCard = null;
}

cards.forEach(card => {
    // Add event Listener to every card
    card.addEventListener('click', flipCard);
    const randomIndex = Math.floor(Math.random() * cards.length);
   card.style.order = randomIndex;
});

