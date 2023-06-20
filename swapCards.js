// ** swap cards **
// 1. remove event listener for startgame
// 2. Add event listener to display swapped cards
// 2. Player select card(s) they want to swap.
// 4. Display cards() to display swapped cards

// Putting back the swapped cards
const displaySwappedCards = () => {
  dealButton.innerHTML = `<p>DEAL</p>`;
  dealButton.disabled = true;
  for (let i = 0; i < playerHand.length; i++) {
    if (cardSwap[i] === true) {
      playerHand.splice(i, 1, newDeck.pop());
    }
  }
  console.log("swapCards.js:", playerHand);
  displayCards(false);
  checkWin();
  dealButton.removeEventListener("click", displaySwappedCards);
};

const handleCardClick = (cardElement, i) => {
  if (!gameStart) return;
  if (cardSwap[i] === false) {
    // Add "selected" class here
    cardElement.classList.add("selected");
    cardSwap[i] = true;
  } else {
    // Remove "selected" class here
    cardElement.classList.remove("selected");
    cardSwap[i] = false;
  }
  console.log("card element:", cardElement)
  // Switch button to enable when user selected a card
  if (cardElement.classList.contains("selected") >= 1) {
    // Handle the swap button click
    dealButton.innerHTML = "<p>SWAP</p>";
    dealButton.addEventListener("click", displaySwappedCards);
    dealButton.removeEventListener("click", displayCards);
    incrementButton.disabled = false;
    decrementButton.disabled = false;
  } else {
    // Switch button to disable and draw button to enable
    dealButton.innerHTML = "<p>DEAL</p>";
    incrementButton.disabled = false;
    decrementButton.disabled = false;
  }
};

const swapCards = () => {
  dealButton.removeEventListener("click", displayCards);
  dealButton.addEventListener("click", displaySwappedCards);
};
