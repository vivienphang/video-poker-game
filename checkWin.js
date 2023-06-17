// ** check win **
// 1. Once swapping is done, the game checks for win condition.
// -- tally rank
// -- tally suit
// -- check whether player's hand fulfil any winning state.
// -- generate message depending on winning state
// -- show message (manipulate dom here)
// -- invoke function to adjust coins

// Helper function to tally ranks
const tallyRanks = () => {
  // Loop through the array of playerhand
  for (let i = 0; i < playerHand.length; i++) {
    // Define what the rank is
    const cardRank = playerHand[i].rank;
    // Check if the cardRank is found in rankTally object
    rankTally[cardRank] = cardRank in rankTally ? rankTally[cardRank] + 1 : 1;
  }
};
console.log("rank tally OBJ:", rankTally);

// Helper function to tally suits
const tallySuits = () => {
  for (let i = 0; i < playerHand.length; i++) {
    const cardSuits = playerHand[i].suit;
    // Check if suit is found in suitTally object
    suitTally[cardSuits] =
      cardSuits in suitTally ? suitTally[cardSuits] + 1 : 1;
  }
};
console.log("suit tally OBJ:", suitTally);

// 4 same rank
const isFourOfAKind = () => {
  if (
    Object.values(rankTally).length === 2 &&
    (Object.values(rankTally)[0] === 4 || Object.values(rankTally)[0] === 1) &&
    (Object.values(rankTally)[1] === 4 || Object.values(rankTally)[1] === 1)
  ) {
    console.log("It's four of a kind!");
    return true;
  }
  return false;
};

// 5 same suits
const isFlush = () => {
  if (Object.values(suitTally)[0] === 5) {
    return true;
  }
  return false;
};

// 5 sequential rank order
const isStraight = () => {
  // Sort the rank of cards first
  const sortedCards = playerHand.sort((a, b) => a.rank - b.rank);
  // Check if the difference between highest and lowest rank is 4
  if (sortedCards[4].rank - sortedCards[0].rank === 4) {
    // Check if unique ranks (key) are 5
    const uniqueRanks = new Set(sortedCards.map((card) => card.rank));
    if (uniqueRanks.size === 5) {
      console.log("Straight win!");
      return true;
    }
  }
  return false;
};

// 3 same rank
const isThreeOfAKind = () => {
  // Get array of rank's values
  const values = Object.values(rankTally);
  // Find unique values in the object
  const uniqueValues = new Set(values);
  // Check if uniqueValues has size of 2, and if values arr includes values of 3 and 1
  if (uniqueValues.size === 2 && values.includes(3) && values.includes(1)) {
    return true;
  }
  return false;
};

const isTwoPairs = () => {
  // Get array of rank's values
  const values = Object.values(rankTally);
  // Find unique values in the object
  const uniqueValues = new Set(values);
  // Check if uniqueValues' value has size of 2, and if values arr includes values of 2 and 1
  if (
    values.length === 3 &&
    uniqueValues.size === 2 &&
    values.includes(2) &&
    values.includes(1)
  ) {
    return true;
  }
  return false;
};

const isOnePair = () => {
  // Get array of rank's values
  const values = Object.values(rankTally);
  // Find unique values in the object
  const uniqueValues = new Set(values);
  // Check if uniqueValues has size of 4 and values arr includes value of 2
  if (values.length === 4 && uniqueValues.size === 2 && values.includes(2)) {
    return true;
  }
  return false;
};

// check whether player's hand fulfil any winning state.
const getWinningStates = () => {
  const straightState = isStraight();
  const flushState = isFlush();
  const fourState = isFourOfAKind(rankTally);
  const threeState = isThreeOfAKind(rankTally);
  const twoPairsCount = isTwoPairs(rankTally);
  const onePairCount = isOnePair(rankTally);

  return {
    straightState,
    flushState,
    fourState,
    threeState,
    twoPairsCount,
    onePairCount,
  };
};

// -- generate message depending on winning state
// -- show message (manipulate dom here)
const generateMessage = (winningState) => {
  let output = "";
  const {
    straightState,
    flushState,
    fourState,
    threeState,
    twoPairsCount,
    onePairCount,
  } = winningState; // object destructuring

  if (playerHand.length !== 0) {
    console.log("winning state:", getWinningStates);

    if (straightState && flushState) {
      output = `Congratulations on winning A STRAIGHT FLUSH. You've earned ${
        handConditions["Straight Flush"] * bet
      } to your coins!`;
    } else if (fourState) {
      output = `Congratulations on winning A FOUR OF A KIND. You've earned ${
        handConditions["Four of a Kind"] * bet
      } to your coins!`;
    } else if (threeState && twoPairsCount) {
      output = `Congratulations on winning A FULL HOUSE'. You've earned ${
        handConditions["Full House"] * bet
      } to your coins!`;
    } else if (flushState) {
      output = `Congratulations on winning A FLUSH. You've earned ${
        handConditions.Flush * bet
      } to your coins!`;
    } else if (straightState) {
      output = `Congratulations on winning A STRAIGHT. You've earned ${
        handConditions.Straight * bet
      } to your coins!`;
    } else if (threeState) {
      output = `Congratulations on winning A THREE OF A KIND. You've earned ${
        handConditions["Three of a Kind"] * bet
      } to your coins!`;
    } else if (twoPairsCount) {
      output = `Congratulations on winning A TWO PAIRS. You've earned ${
        handConditions["Two Pairs"] * bet
      } to your coins!`;
    } else if (onePairCount) {
      output = `Congratulations on winning A ONE PAIR. You've earned ${
        handConditions["One Pair"] * bet
      } to your coins!`;
    } else {
      output = "Nice try! Click DEAL to replay or refresh to restart game.";
    }
  }
  return output;
};

const updateCoinValue = (winningState) => {
  let hand = "";
  const {
    straightState,
    flushState,
    fourState,
    threeState,
    twoPairsCount,
    onePairCount,
  } = winningState;
  if (straightState && flushState) {
    coins += handConditions["Straight Flush"] * bet;
  } else if (fourState) {
    coins += handConditions["Four of a Kind"] * bet;
  } else if (threeState && twoPairsCount) {
    coins += handConditions["Flush House"] * bet;
  } else if (flushState) {
    coins += handConditions.Flush * bet;
  } else if (straightState) {
    coins += handConditions.Straight * bet;
  } else if (threeState) {
    coins += handConditions["Three of a Kind"] * bet;
  } else if (twoPairsCount) {
    coins += handConditions["Two Pairs"] * bet;
  } else if (onePairCount) {
    coins += handConditions["One Pair"] * bet;
  } else {
    coins -= bet;
  }
};

// get current key
const checkWin = () => {
  tallyRanks();
  tallySuits();
  const returnObj = getWinningStates();
  const outputMsg = generateMessage(returnObj);
  console.log("outputMsg:", outputMsg);
  console.log(typeof outputMsg);
  messageBoard.textContent = outputMsg;

  updateCoinValue(returnObj);
  endGame();
  startGame();
};
