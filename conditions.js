// ===============================================
// ====== Winning conditions and check win =======
// ===============================================

let rankTally = {};
let suitTally = {};
let output;

// Helper function to tally ranks
const tallyRanks = () => {
  // Loop through the array of playerhand
  for (let i = 0; i < playerHand.length; i++) {
    // Define what the rank is
    const cardRank = playerHand[i].rank;
    // console.log("card rank:", cardRank);
    // Check if the cardRank is found in rankTally object
    rankTally[cardRank] = cardRank in rankTally ? rankTally[cardRank] + 1 : 1;
  }
};
// tallyRanks();
// Helper function to tally suits
const tallySuits = () => {
  for (let i = 0; i < playerHand.length; i++) {
    const cardSuits = playerHand[i].suit;
    // Check if suit is found in suitTally object
    suitTally[cardSuits] =
      cardSuits in suitTally ? suitTally[cardSuits] + 1 : 1;
  }
};
// tallySuits();
// console.log("suitTally obj", suitTally);
const isFourOfAKind = () => {
  if (
    Object.values(rankTally).length === 2 &&
    (Object.values(rankTally)[0] === 4 || Object.values(rankTally)[0] === 1) &&
    (Object.values(rankTally)[1] === 4 || Object.values(rankTally)[1] === 1)
  ) {
    console.log("It's four of a kind!");
    return "isFourOfAKind";
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
  // Check if biggest minus smallest value is 4 and total arr.length is 5
  if (
    sortedCards[4].rank - sortedCards[0].rank === 4 &&
    Object.values(rankTally).length === 5
  ) {
    console.log("Straight win!");
    return true;
  }
  return false;
};

const isThreeOfAKind = () => {
  // Get array of rank's values
  const values = Object.values(rankTally);
  // Find unique values in the object
  const uniqueValues = new Set(values);
  // Check if uniqueValues has size of 2, and if values arr includes values of 3 and 1
  if (uniqueValues.size === 2 && values.includes(3) && values.includes(1)) {
    return "isThreeOfAKind";
  }
  return false;
};

const isTwoPairs = () => {
  // Get array of rank's values
  const values = Object.values(rankTally);
  // Find unique values in the object
  const uniqueValues = new Set(values);
  // Check if uniqueValues has size of 3, and if values arr includes values of 2 and 1
  if (uniqueValues.size === 3 && values.includes(2) && values.includes(1)) {
    return "isTwoPairs";
  }
  return false;
};

const isOnePair = () => {
  // Get array of rank's values
  const values = Object.values(rankTally);
  // Find unique values in the object
  const uniqueValuesObj = new Set(values);
  // Check if uniqueValues has size of 3 and values arr includes value of 2
  if (uniqueValuesObj.size === 3 && values.includes(2)) {
    return "isOnePair";
  }
  return false;
};

// Check win conditions from first to last order
const checkWin = () => {
  // suitTally = {};
  // rankTally = {};
  // playerHand = [
  //   { name: "9", suit: "diamonds", rank: 9 },
  //   { name: "9", suit: "diamonds", rank: 9 },
  //   { name: "9", suit: "diamonds", rank: 9 },
  //   { name: "9", suit: "diamonds", rank: 9 },
  //   { name: "K", suit: "diamonds", rank: 13 },
  // ];
  tallyRanks(playerHand);
  tallySuits(playerHand);

  // Define winning states to corresponding functions
  const straightState = isStraight();
  const flushState = isFlush();
  const fourState = isFourOfAKind(rankTally);
  const threeState = isThreeOfAKind(rankTally);
  const twoPairsCount = isTwoPairs(rankTally);
  const onePairCount = isOnePair(rankTally);

  // console.log(straightState);
  // console.log(flushState);

  if (straightState && flushState) {
    output = `Congratulations on winning STRAIGHT FLUSH. You've earned ${
      handConditions["Straight Flush"] * bet
    } to your coins!`;
    coins += handConditions["Straight Flush"] * bet;
  } else if (fourState) {
    coins = `Congratulations on winning FOUR OF A KIND. You've earned ${
      handConditions["Four of a Kind"] * bet
    } to your coins!`;
    coins += handConditions["Four of a Kind"] * bet;
  } else if (threeState && twoPairsCount === 1) {
    output = `FULL HOUSE'. ＋ ${
      handConditions["Full House"] * bet
    } to your coins!`;
    coins += handConditions["Full House"] * bet;
  } else if (flushState) {
    output = `FLUSH. ＋ ${handConditions.Flush * bet} to your coins!`;
    coins += handConditions.Flush * bet;
  } else if (straightState) {
    output = `STRAIGHT. ＋ ${handConditions.Straight * bet} to your coins!`;
    coins += handConditions.Straight * bet;
  } else if (threeState) {
    output = `THREE OF A KIND. ＋ ${
      handConditions["Three of a Kind"] * bet
    } to your coins!`;
    coins += handConditions["Three of a Kind"] * bet;
  } else if (twoPairsCount) {
    output = `TWO PAIRS. ＋ ${
      handConditions["Two Pairs"] * bet
    } to your coins!`;
    coins += handConditions["Two Pairs"] * bet;
  } else if (onePairCount) {
    output = `Congratulations on winning ONE PAIR. You've earned ${
      handConditions["One Pair"] * bet
    } to your coins!`;
    coins += handConditions["One Pair"] * bet;
  } else {
    output = "Nice try!";
    coins -= bet;
  }
  output += "<br> Click DEAL to play again.";
  coinElement.innerHTML = `${coins} <br> COINS`;
  dealButton.disabled = false;
  incrementButton.disabled = false;
  decrementButton.disabled = false;
  playerHand = [];
  return output;
};

// // Create function to calculate hand conditions
// const setPointsWithMultiple = () => {
//   const payoutContainer = document.createElement("div");
//   payoutContainer.innerHTML = "";

//   Object.keys(handConditions).forEach((key) => {
//     const scoreContainer = document.createElement("div");
//     scoreContainer.className = "score-container";
//     const scoreKey = document.createElement("p");
//     const scoreValue = document.createElement("p");
//     scoreKey.innerHTML = key;
//     // scoreValue.innerHTML = handConditions[key] * bet;
//     scoreContainer.appendChild(scoreKey);
//     scoreContainer.appendChild(scoreValue);
//     payoutContainer.appendChild(scoreContainer);
//   });
// };
// setPointsWithMultiple();
