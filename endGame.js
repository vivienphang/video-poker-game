// ** end game **
// 2. Invoke a function reset game to reset card swap, playerhand, suit tally, rank tally.
// -- Enable buttons.
// -- Reset card swap, playerhand, suit tally, rank tally.
// -- game start = false

const endGame = () => {
  dealButton.removeEventListener("click", displaySwappedCards);

  // Reset the states for cardSwap, playerHand, rankTally and suitTally
  cardSwap = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  };
  playerHand = [];
  rankTally = {};
  suitTally = {};

  gameStart = false;
  if (!gameStart) return;
};

initGame();
startGame();
// swapCards();
// startGame();
