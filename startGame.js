// ** start game **
// 1. game start = true
// 2. Shuffle the new deck
// 3. Deal 5 cards to playerhand
// 2. Player clicks deal button to display 5 cards -> event listener for deal button
// 3. Increment and decrement buttons are disabled.

// Shuffle the cards
const shuffleDeck = (cards) => {
  // loop over the cards array
  for (let i = 0; i < cards.length; i++) {
    // select a random index in the cards
    const randomIndex = Math.floor(Math.random() * cards.length);
    const temp = cards[i];
    cards[i] = cards[randomIndex];
    cards[randomIndex] = temp;
  }
  return cards;
};

// Display 5 cards
const displayCards = (firstTime = true) => {
  gameStart = true;
  gameContainer.innerHTML = "";
  for (let i = 0; i < playerHand.length; i++) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    const cardImg = document.createElement("img");
    cardImg.setAttribute(
      "src",
      `public/52-card-images/${playerHand[i].cardImg}`
    );
    cardElement.appendChild(cardImg);
    if (firstTime) {
      cardImg.addEventListener("click", () => {
        handleCardClick(cardElement, i);
      });
      messageBoard.innerHTML = "<p>Choose cards to SWAP</p>";
    }
    gameContainer.appendChild(cardElement);
  }
  incrementButton.disabled = true;
  decrementButton.disabled = true;
  dealButton.disabled = false;
};

const startGame = () => {
  gameStart = true;
  dealButton.disabled = false;
  incrementButton.disabled = false;
  decrementButton.disabled = false;
  shuffleDeck(newDeck);
  playerHand = newDeck.splice(0, 5);
  dealButton.removeEventListener("click", startGame);
  dealButton.addEventListener("click", displayCards);
};
