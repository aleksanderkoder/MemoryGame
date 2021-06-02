let flippedCardsId = []; 
let wantedNumberOfCards = 12; 
let possibleValues = ["!","<",">","&&","=","==","!=","<",">","&","*","{}","[]","var","let","div"];

// Draws random cards and populates the game wrapper
function populateCards() {
    for(let cardCount = 0; cardCount < wantedNumberOfCards; cardCount++) {
        let elemCard = document.createElement("div");
        elemCard.id = cardCount; 
        let elemSpanFront = document.createElement("span");
        elemSpanFront.id = "card-front-" + cardCount; 
        elemSpanFront.innerHTML = "?";
        elemSpanFront.classList.add("card-front"); 
        let elemSpanBack = document.createElement("span");
        elemSpanBack.id = "card-back-" + cardCount;
        elemSpanBack.classList.add("card-back");
        elemCard.appendChild(elemSpanFront);
        elemCard.appendChild(elemSpanBack);
        document.getElementById("game-wrapper").appendChild(elemCard); 
    }
    

}

// Flips selected card
function turnCard(el) {
    if(flippedCardsId.length < 2 && !el.classList.contains("flipped")) {
        console.log("Turning card..."); 
        document.getElementById(el.id).classList.toggle("flipped");
        flippedCardsId.push(el.id); 
    }
    if(flippedCardsId.length >= 2) {
        setTimeout(function() {
            resetCards(); 
        }, 3000);
    }

}

// Resets flipped cards to starting state
function resetCards() {
    console.log("Resetting cards...");
    for(let card of flippedCardsId) {
        document.getElementById(card).classList.toggle("flipped");    
    }
    flippedCardsId = []; 
}

// Checks if selected pair of cards match
function checkMatching() {
    for(let card of flippedCardsId) {

    }
}