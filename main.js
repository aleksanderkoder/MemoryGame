let flippedCardsId = []; 


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

function resetCards() {
    console.log("Resetting cards...");
    for(let card of flippedCardsId) {
        document.getElementById(card).classList.toggle("flipped");    
    }
    flippedCardsId = []; 
}