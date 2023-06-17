// ** init game **
// 1. Build deck, score board, message board, and buttons.
// 2. Bet is set to 1 by default.
// 3. Player can increment and decrement bet.

// Score, message, coin and game board
const scoreContainer = document.querySelector("#score-container");
const scoreBoard = document.querySelector("#score-board");
const messageContainer = document.querySelector("#message-container");
const messageBoard = document.querySelector("#message-board");
const gameContainer = document.querySelector("#game-container");
const coinsDisplay = document.querySelector(".coins-display");

// Buttons board
const tableContainer = document.querySelector("#table-container");
const betButtonContainer = document.querySelector(".bet-btn-container");
const betDisplay = document.querySelector(".bet-display");
const remainingBetDisplay = document.querySelector(".remaining-bet-display");
const decrementButton = document.querySelector(".minus-btn");
const incrementButton = document.querySelector(".plus-btn");
const dealButtonContainer = document.querySelector(".deal-btn-container");
const dealButton = document.querySelector(".deal-btn");

// 1. Create deck of cards
const createDeck = () => {
  const deck = [];
  const suits = ["hearts", "spades", "clubs", "diamonds"];

  for (let i = 0; i < suits.length; i++) {
    // setting the suit
    const currentSuit = suits[i];
    // setting the rank of the cards
    for (let j = 1; j <= 13; j++) {
      let cardName = `${j}`;
      if (cardName === "11") cardName = "jack";
      if (cardName === "12") cardName = "queen";
      if (cardName === "13") cardName = "king";
      if (cardName === "1") cardName = "ace";
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: j,
        cardImg: `${cardName}_of_${currentSuit}.png`,
      };
      deck.push(card);
    }
  }
  return deck;
};

const newDeck = createDeck();

// Create default table element
const tableElementOne = document.createElement("table");
tableElementOne.classList.add("table-one");
const tableBodyOne = document.createElement("tbody");
const scoreTableHeaderOne = document.createElement("thead");
const tableElementTwo = document.createElement("table");
tableElementTwo.classList.add("table-two");
const tableBodyTwo = document.createElement("tbody");
const scoreTableHeaderTwo = document.createElement("thead");

const setPointsWithMultiple = () => {
  // const tableOneHeaderArr = Object.keys(handConditions).splice(0, 4);
  // const tableTwoHeaderArr = Object.keys(handConditions).splice(4, 8);
  let hands = [];
  let handPoints = [];
  for (const [key, value] of Object.entries(handConditions)) {
    hands.push(key);
    handPoints.push(value);
  }
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
    // New row element
    const rowElement = document.createElement("tr");
    // New vertical header cell
    const headerCell = document.createElement("th");
    headerCell.textContent = hands[i];
    rowElement.appendChild(headerCell);

    // New data cells for each column
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

const betIncrement = () => {
  bet += 1;
  if (bet > 5) {
    bet = 1;
  }
  betDisplay.innerHTML = `${bet}`;
  coinsDisplay.innerHTML = `${coins - bet} COINS`;
};

const betDecrement = () => {
  bet -= 1;
  if (bet < 1) {
    bet = 5;
  }
  betDisplay.innerHTML = `${bet}`;
  coinsDisplay.innerHTML = `${coins - bet} COINS`;
};

const initGame = () => {
  createDeck();
  setPointsWithMultiple();
  scoreBoard.append(tableElementOne, tableElementTwo);

  // Set default message
  messageBoard.innerHTML = `<p>Click DEAL to start a game</p>`;
  messageContainer.appendChild(messageBoard);

  // Set default buttons and displays
  dealButton.innerHTML = "<p>DEAL</p>";
  betDisplay.innerHTML = `${bet}`;
  coinsDisplay.innerHTML = `${coins} COINS`;
  incrementButton.addEventListener("click", betIncrement);
  decrementButton.addEventListener("click", betDecrement);
};
