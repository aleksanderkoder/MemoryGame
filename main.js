// Game variables 
let flippedCardsId = [];    // Keeps track of the IDs of flipped cards
let wantedNumberOfCards = 12;   // Wanted number of cards
let possibleValues = ["!","<",">","&&","=","==","!=","&","*","{}","[]","var","let","div","</>","h1"];   // Possible card values
let cardValueStore = [];    // Keeps track of drawn card values 
let matchCounter = 0;   // Counts matching cards
let totalMovesCounter = 0;  // Counts total moves (pairs turned)
let secondsOnStart;     // Used for calculating time spent playing
let secondsOnFinish; 

// Game sounds 
let music = new Audio("sounds/bit-forest.flac"); 
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
        document.getElementById("game-wrapper").appendChild(elemCard); // Adds elements to DOM 
    }
    drawCardValues(); 
}

// Draws a value for each card which determines its matching value
function drawCardValues() { 
    for(let i = 0; i < wantedNumberOfCards; i++) {
        let rand = Math.floor(Math.random() * wantedNumberOfCards); 
        let rand2 = Math.floor(Math.random() * wantedNumberOfCards); 
        wantedNumberOfCards--; 
        cardValueStore.splice(rand, 0, possibleValues[rand]);   // Registers drawn values at random index   
        cardValueStore.splice(rand2, 0, possibleValues[rand]);  
        possibleValues.splice(rand, 1);     // Removes already drawn value from possible values
    }
    // console.log(JSON.stringify(cardValueStore));
}

// Flips selected card
function turnCard(el) {
    if(flippedCardsId.length < 2 && !el.classList.contains("flipped")) {    // If 2 cards have not already been turned and selected card is not already flipped
        console.log("Turning card..."); 
        document.getElementById("card-back-" + el.id).innerHTML = cardValueStore[el.id]; 
        document.getElementById(el.id).classList.toggle("flipped");
        turnSound.play();
        flippedCardsId.push(el.id); 
    }
    if(flippedCardsId.length == 2 && !checkMatching()) {    // If 2 cards have been flipped and not matching
        setTimeout(function() {
            failSound.play();
        }, 750);
        setTimeout(function() {
            resetCards(); 
        }, 2000);
    } 
}

// Resets flipped cards to starting state and removes value from DOM for security
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
    totalMovesCounter++; 
    // If cards have matching value
    if(document.getElementById("card-back-" + flippedCardsId[0]).innerHTML == 
    document.getElementById("card-back-" + flippedCardsId[1]).innerHTML) {
        console.log("Matching!"); 
        matchCounter++; 
        setTimeout(function() {
            matchSound.play();
        }, 750);
        setTimeout(function() {     // Reset cards after 2 seconds and toggle class
            document.getElementById(flippedCardsId[0]).classList.toggle("completed"); 
            document.getElementById(flippedCardsId[1]).classList.toggle("completed"); 
            resetCards();
            if(matchCounter == wantedNumberOfCards) // If all cards have been matched, end game
                endGame();  
        }, 2000);
        return true;
    }
    return false; 
}

// Starts game with selected amount of cards
function startGame() {
    music.play();
    music.volume = 0.5; 
    document.getElementById("menu").style.display = "none";
    document.getElementById("game-wrapper").style.display = "flex"
    wantedNumberOfCards = document.querySelector('input[name="card-number"]:checked').value;    // Get checked value
    populateCards();    
    secondsOnStart = new Date().getTime() / 1000;   // Get amount of seconds on game start
    // console.log(secondsOnStart)
}

// Shows game end screen with scores
function endGame() {
    document.getElementById("game-wrapper").style.display = "none"; 
    document.getElementById("score-screen").style.display = "flex"; 
    document.getElementById("total-moves").innerHTML = "Total moves: " + totalMovesCounter;
    let secondsOnFinish =  new Date().getTime() / 1000; 
    let totalSeconds = parseInt(secondsOnFinish - secondsOnStart);  // Calculate seconds spent playing
    document.getElementById("total-elapsed-time").innerHTML = "Total elapsed time: " + 
    totalSeconds + " seconds"; 
}

// Refreshes page to easily "reset" game
function playAgain() {
    location.reload();
}

// Make selected elements clickable with ENTER key
document.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      // Trigger the focused element with a click
      document.activeElement.click();
    }
  });