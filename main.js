// Game variables 
let flippedCardsId = []; 
let wantedNumberOfCards = 12; 
let possibleValues = ["!","<",">","&&","=","==","!=","&","*","{}","[]","var","let","div","</>","h1"];
let cardValueStore = []; 
let matchCounters = 0; 

// Game sounds 
let turnSound = new Audio("sounds/collect-point.wav");
let matchSound = new Audio("sounds/jingle.wav");
let failSound = new Audio("sounds/fail.wav");

// Draws random cards and populates the game wrapper
function populateCards() {
    let cardNumber = wantedNumberOfCards; 
    for(let cardCount = 0; cardCount < cardNumber; cardCount++) {
        let elemCard = document.createElement("div");
        elemCard.id = cardCount; 
        elemCard.classList.add("card");
        elemCard.tabIndex = "0"; // Makes navigation with tab possible
        elemCard.addEventListener("click", function () {
            turnCard(this); 
          });
        let elemSpanFront = document.createElement("span");
        elemSpanFront.id = "card-front-" + cardCount; 
        elemSpanFront.innerHTML = "?";
        elemSpanFront.classList.add("card-front"); 
        let elemSpanBack = document.createElement("span");
        elemSpanBack.id = "card-back-" + cardCount;
        elemSpanBack.innerHTML = "back";
        elemSpanBack.classList.add("card-back");
        elemCard.appendChild(elemSpanFront);
        elemCard.appendChild(elemSpanBack);
        document.getElementById("game-wrapper").appendChild(elemCard); 
    }
    drawCardValues(); 
}

// Draws a value for each card which determines its matching value
function drawCardValues() { 
    for(let i = 0; i < wantedNumberOfCards; i++) {
        let rand = Math.floor(Math.random() * wantedNumberOfCards); 
        let rand2 = Math.floor(Math.random() * wantedNumberOfCards); 
        wantedNumberOfCards--; 
        cardValueStore.splice(rand, 0, possibleValues[rand]); 
        cardValueStore.splice(rand2, 0, possibleValues[rand]);  
        possibleValues.splice(rand, 1);
        console.log(possibleValues.length);
    }
    // console.log(JSON.stringify(cardValueStore));
}

// Flips selected card
function turnCard(el) {
    if(flippedCardsId.length < 2 && !el.classList.contains("flipped")) {
        console.log("Turning card..."); 
        document.getElementById("card-back-" + el.id).innerHTML = cardValueStore[el.id]; 
        document.getElementById(el.id).classList.toggle("flipped");
        turnSound.play();
        flippedCardsId.push(el.id); 
    }
    if(flippedCardsId.length == 2 && !checkMatching()) {
        setTimeout(function() {
            failSound.play();
        }, 750);
        setTimeout(function() {
            resetCards(); 
        }, 2000);
    } 
}

// Resets flipped cards to starting state
function resetCards() {
    console.log("Resetting cards...");
    for(let card of flippedCardsId) {
        setTimeout(function() {
            document.getElementById("card-back-" + card).innerHTML = "";
        }, 800);
        document.getElementById(card).classList.toggle("flipped");    
    }
    flippedCardsId = []; 
}

// Checks if selected pair of cards match
function checkMatching() {
    // If cards have matching value
    if(document.getElementById("card-back-" + flippedCardsId[0]).innerHTML == 
    document.getElementById("card-back-" + flippedCardsId[1]).innerHTML) {
        console.log("Matching!"); 
        setTimeout(function() {
            matchSound.play();
        }, 750);
        setTimeout(function() {
            document.getElementById(flippedCardsId[0]).classList.toggle("completed"); 
            document.getElementById(flippedCardsId[1]).classList.toggle("completed"); 
            resetCards(); 
        }, 2000);
        return true;
    }
    return false; 
}

// Starts game with selected amount of cards
function startGame() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("game-wrapper").style.display = "flex"
    wantedNumberOfCards = document.querySelector('input[name="card-number"]:checked').value;
    populateCards(); 
}

// Make selected elements clickalble with ENTER key
document.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      // Trigger the button element with a click
      document.activeElement.click();
    }
  });