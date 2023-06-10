// ===============================================
// ====== Creating buttons for game start ========
// ===============================================

// 1. Before starting the game, click bets "+" / "-" button.
// 2. Then, click "Deal" button to start game.
// 3. Player can choose which card to keep -> the selected card classname will be changed in CSS.
// 4. Click button "Redraw" to redraw the cards -> change innerHTML.

// Initialise all global queries
const messageContainer = document.querySelector("#message-container");
const gameContainer = document.querySelector("#game-container");
const tableContainer = document.querySelector("#table-container");
const messageBoard = document.querySelector("#message-board");
const betButton = document.querySelector(".bet-btn");
const dealButton = document.querySelector(".deal-btn");
const drawButton = document.querySelector(".draw-btn");
betButton.innerHTML = "<h2>BET</h2>";
dealButton.innerHTML = "<h2>DEAL</h2>";
drawButton.innerHTML = "<h2>DRAW</h2>";
drawButton.disabled = true;

// Set default message
messageBoard.innerHTML = `<p>Click DEAL to start a game</p>`;
messageContainer.appendChild(messageBoard);

// Display 5 cards
const displayCards = () => {
  gameContainer.innerHTML = "";
  console.log(playerHand);
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.innerHTML = `${playerHand[i].name}${playerHand[i].suitsSymbol}`;
    cardElement.addEventListener("click", () => {
      console.log(cardElement);
      handleCardClick(cardElement, i);
    });
    messageBoard.innerHTML = "Select cards to SWAP or click DRAW";
    gameContainer.appendChild(cardElement);
  }
  betButton.disabled = true;
  dealButton.innerHTML = "<h2>SWAP</h2>";
  dealButton.disabled = true;
  drawButton.disabled = false;
};

// Event listeners
betButton.addEventListener("click", () => {
  console.log("bet button clicked"); // WIP: To create bet setting function.
});

dealButton.addEventListener("click", displayCards);

// Swap out clicked cards by making playerHand's card an object
const cardSwap = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
};

const handleCardClick = (cardElement, i) => {
  if (cardSwap[i] === false) {
    // Add "selected" class here
    cardElement.classList.add("selected");
    cardSwap[i] = true;
  } else {
    // Remove "selected" class here
    cardElement.classList.remove("selected");
    cardSwap[i] = false;
  }
  // Switch button to enable when user selected a card
  if (cardElement.classList.contains("selected")) {
    console.log("card element:", cardElement);
    dealButton.disabled = false;
    betButton.disabled = false;
    drawButton.disabled = true;
  } else {
    // Switch button to disable and draw button to enable
    dealButton.disabled = true;
    betButton.disabled = false;
    drawButton.disabled = false;
  }
  // Handle the swap button click
  dealButton.addEventListener("click", () => {
    console.log("Check win");
    dealButton.innerHTML = `<h2>DEAL</h2>`;
    dealButton.disabled = true;
    drawButton.disabled = true;
    betButton.disabled = true;
  });
};
