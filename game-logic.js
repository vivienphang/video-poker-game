// ===============================================
// ====== Default settings and game logic ========
// ===============================================

// Message, score and game board
const scoreContainer = document.querySelector("#score-container");
const scoreBoard = document.querySelector("#score-board");
const messageContainer = document.querySelector("#message-container");
const messageBoard = document.querySelector("#message-board");
const gameContainer = document.querySelector("#game-container");

// Buttons board
const tableContainer = document.querySelector("#table-container");
const betButtonContainer = document.querySelector(".bet-btn-container");
const betDisplay = document.querySelector(".bet-display");
const remainingBetDisplay = document.querySelector(".remaining-bet-display");
const decrementButton = document.querySelector(".minus-btn");
const incrementButton = document.querySelector(".plus-btn");
const dealButtonContainer = document.querySelector(".deal-btn-container");
const dealButton = document.querySelector(".deal-btn");

// Set default message
messageBoard.innerHTML = `<p>Click DEAL to start a game</p>`;
messageContainer.appendChild(messageBoard);

// Set default buttons
dealButton.innerHTML = "<p>DEAL</p>";

// Game starts at 99 coins with default min. 1 coin bet
let bet = 1;
let coins = 100;
betDisplay.innerHTML = `${bet}`;

// Create list of possible win conditions and payouts
const handConditions = {
  "Straight Flush": 50, // === 5 same suit + 5 sequential order
  "Four of a Kind": 25, // === 4 same rank
  "Full House": 9, // ======== 3 same rank + 2 same other rank
  Flush: 6, // =============== 5 same suit
  Straight: 4, // ============ 5 sequential order
  "Three of a Kind": 3, // === 3 same rank
  "Two Pairs": 2, // ========= 2 same rank + 2 other same rank
  "One Pair": 1, // ========== 1 same rank + 1 other same rank
};

// Create default score table
const tableElementOne = document.createElement("table");
tableElementOne.classList.add("table-one");
const tableBodyOne = document.createElement("tbody");
const scoreTableHeaderOne = document.createElement("thead");
const tableElementTwo = document.createElement("table");
tableElementTwo.classList.add("table-two");
const tableBodyTwo = document.createElement("tbody");
const scoreTableHeaderTwo = document.createElement("thead");

const tableOneHeaderArr = Object.keys(handConditions).splice(0, 4);
// console.log(tableOneHeaderArr);
const tableTwoHeaderArr = Object.keys(handConditions).splice(4, 8);
let hands = [];
let handPoints = [];
for (const [key, value] of Object.entries(handConditions)) {
  hands.push(key);
  handPoints.push(value);
}

const setPointsWithMultiple = () => {
  // Create table one's rows and columns
  for (let i = 0; i < hands.length - 4; i++) {
    // New row element
    const rowElement = document.createElement("tr");
    // Create vertical header cell
    const headerCell = document.createElement("th");
    headerCell.textContent = hands[i];
    rowElement.appendChild(headerCell);

    // Create data cells for each column
    for (var j = 0; j < 5; j++) {
      var dataCell = document.createElement("td");
      const multiplier = 5 - j;
      const value = handPoints[i] * multiplier;
      dataCell.textContent = value;
      rowElement.appendChild(dataCell);
    }
    // Append the row to the table body
    tableBodyOne.appendChild(rowElement);
    // Append the table body to the table
    tableElementOne.appendChild(tableBodyOne);
  }
  // Create table two's rows and columns
  for (let i = 4; i < hands.length; i++) {
    // console.log("table 2:", hands[i]);
    // New row element
    const rowElement = document.createElement("tr");
    // Create vertical header cell
    const headerCell = document.createElement("th");
    headerCell.textContent = hands[i];
    rowElement.appendChild(headerCell);

    // Create data cells for each column
    for (var j = 0; j < 5; j++) {
      var dataCell = document.createElement("td");
      const multiplier = 5 - j;
      const value = handPoints[i] * multiplier;
      dataCell.textContent = value;
      rowElement.appendChild(dataCell);
    }
    // Append the row to the table body
    tableBodyTwo.appendChild(rowElement);
    // Append the table body to the table
    tableElementTwo.appendChild(tableBodyTwo);
  }
};
setPointsWithMultiple();

// Append the table to the table container
scoreBoard.append(tableElementOne, tableElementTwo);

// Update coin system
const coinsDisplay = document.querySelector(".coins-display");
coinsDisplay.innerHTML = `${coins} COINS`;

// Create bet increment anddecrement function
const betIncrement = () => {
  bet += 1;
  if (bet > 5) {
    bet = 1;
  }
  betDisplay.innerHTML = `${bet}`;
  coinsDisplay.innerHTML = `${coins - bet} COINS`;
  return coins;
};

// WIP: Not decremeting properly as it takes in coins = 100.
const betDecrement = () => {
  bet -= 1;
  if (bet < 1) {
    bet = 5;
  }
  betDisplay.innerHTML = `${bet}`;
  coinsDisplay.innerHTML = `${coins - bet} COINS`;
};

incrementButton.addEventListener("click", betIncrement);
decrementButton.addEventListener("click", betDecrement);

// Display 5 cards
const displayCards = () => {
  gameContainer.innerHTML = "";
  for (let i = 0; i < playerHand.length; i++) {
    const cardElement = document.createElement("div");
    // cardElement.classList.remove("card-front");
    cardElement.classList.add("card");
    const cardImg = document.createElement("img");
    cardImg.setAttribute(
      "src",
      `public/52-card-images/${playerHand[i].cardImg}`
    );
    cardElement.appendChild(cardImg);
    cardImg.addEventListener("click", () => {
      handleCardClick(cardElement, i);
    });
    messageBoard.innerHTML = "Choose cards to SWAP";
    gameContainer.appendChild(cardElement);
  }
  incrementButton.disabled = true;
  decrementButton.disabled = true;
  dealButton.disabled = false;
};
// WIP: Flip cards not functioning.
// const displayCards = () => {
//   for (let i = 0; i < playerHand.length; i++) {
//     const cardElement = document.querySelector(".card-element");
//     cardElement.classList.add("card-front");
//     const cardImg = document.createElement("img");
//     cardImg.setAttribute("src", `public/card-front.png`);
//     // cardImg.style.width = "100px";
//     // cardImg.style.height = "120px";
//     cardElement.appendChild(cardImg);
//     gameContainer.appendChild(cardElement);
//   }
//   incrementButton.disabled = true;
//   decrementButton.disabled = true;
//   dealButton.disabled = false;
// };
// displayCards();

dealButton.addEventListener("click", displayCards);

// Swap out clicked cards by making playerHand's card an object
const cardSwap = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
};

// Putting back the swapped cards
const displaySwappedCards = () => {
  dealButton.innerHTML = `<h2>DEAL</h2>`;
  dealButton.disabled = true;
  incrementButton.disabled = true;
  decrementButton.disabled = true;
  for (let i = 0; i < playerHand.length; i++) {
    if (cardSwap[i] === true) {
      playerHand.splice(i, 1, newDeck.pop());
    }
  }
  displayCards();
  messageBoard.innerHTML = checkWin();
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
    dealButton.innerHTML = "<p>SWAP</p>";
    incrementButton.disabled = false;
    decrementButton.disabled = false;
  } else {
    // Switch button to disable and draw button to enable
    incrementButton.disabled = false;
    decrementButton.disabled = false;
  }
  // Handle the swap button click
  dealButton.addEventListener("click", displaySwappedCards);
};
