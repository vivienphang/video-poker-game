// ===============================================
// ====== Winning conditions and check win =======
// ===============================================

// FLUSH -> 5 same suit
playerHand = [
  {
    name: "ace",
    rank: 1,
    suit: "spades",
  },
  {
    name: "ace",
    rank: 1,
    suit: "diamonds",
  },
  {
    name: "3",
    rank: 3,
    suit: "clubs",
  },
  {
    name: "3",
    rank: 3,
    suit: "spades",
  },
  {
    name: "5",
    rank: 5,
    suit: "hearts",
  },
];

let rankTally = {};
let suitTally = {};
let output;
console.log("playerhand:", playerHand);
// Helper function to tally ranks
const tallyRanks = () => {
  // Loop through the array of playerhand
  for (let i = 0; i < playerHand.length; i++) {
    // Define what the rank is
    const cardRank = playerHand[i].rank;
    // console.log("card rank:", cardRank);
    // Check if the cardRank is found in rankTally object
    // rankTally[cardRank] = cardRank in rankTally ? rankTally[cardRank] + 1 : 1;
    rankTally[cardRank] = (rankTally[cardRank] || 0) + 1;
  }
};
// tallyRanks();
// console.log("rank tally OBJ:", rankTally);

// Helper function to tally suits
const tallySuits = () => {
  for (let i = 0; i < playerHand.length; i++) {
    const cardSuits = playerHand[i].suit;
    // Check if suit is found in suitTally object
    // suitTally[cardSuits] = cardSuits in suitTally ? suitTally[cardSuits] + 1 : 1;
    suitTally[cardSuits] = (suitTally[cardSuits] || 0) + 1;
  }
};
// tallySuits();
// console.log("suit tally OBJ:", suitTally);

// 4 same rank
// const isFourOfAKind = () => {
//   if (
//     Object.values(rankTally).length === 2 &&
//     (Object.values(rankTally)[0] === 4 || Object.values(rankTally)[0] === 1) &&
//     (Object.values(rankTally)[1] === 4 || Object.values(rankTally)[1] === 1)
//   ) {
//     console.log("It's four of a kind!");
//     return true;
//   }
//   return false;
// };

// 5 same suits >>> CHECKED
// const isFlush = () => {
//   const sameSuits = Object.values(suitTally)[0];
//   console.log("is flush:", sameSuits);
//   if (Object.values(suitTally)[0] === 5) {
//     return true;
//   }
//   return false;
// };

// 5 sequential rank order
// const isStraight = () => {
//   // Sort the rank of cards first
//   const sortedCards = playerHand.sort((a, b) => a.rank - b.rank);
//   // console.log("sortedcards", sortedCards);
//   console.log("subtraction", sortedCards[4].rank - sortedCards[0].rank === 4);
//   // Check if the difference between highest and lowest rank is 4
//   if (sortedCards[4].rank - sortedCards[0].rank === 4) {
//     // Check if unique ranks (key) are 5
//     const uniqueRanks = new Set(sortedCards.map((card) => card.rank));
//     console.log("unique ranks:", uniqueRanks);
//     if (uniqueRanks.size === 5) {
//       console.log("Straight win!");
//       return true;
//     }
//   }
//   return false;
// };

// const isThreeOfAKind = () => {
//   // Get array of rank's values
//   const values = Object.values(rankTally);
//   // Find unique values in the object
//   const uniqueValues = new Set(values);
//   // Check if uniqueValues has size of 2, and if values arr includes values of 3 and 1
//   if (uniqueValues.size === 2 && values.includes(3) && values.includes(1)) {
//     return "isThreeOfAKind";
//   }
//   return false;
// };

const isTwoPairs = () => {
  // Get array of rank's values
  const values = Object.values(rankTally);
  console.log("values", values);
  // Find unique values in the object
  const uniqueValues = new Set(values);
  console.log(uniqueValues);
  // Check if uniqueValues has size of 3, and if values arr includes values of 2 and 1
  if (uniqueValues.size === 2 && values.includes(2) && values.includes(1)) {
    return true;
  }
  return false;
};

// const isOnePair = () => {
//   // Get array of rank's values
//   const values = Object.values(rankTally);
//   console.log(rankTally);
//   console.log("values:", values);
//   // Find unique values in the object
//   const uniqueValues = new Set(values);
//   console.log("unique val:", uniqueValues);
//   // Check if uniqueValues has size of 4 and values arr includes value of 2
//   if (uniqueValues.size === 2 && values.includes(2)) {
//     return "isOnePair";
//   }
//   return false;
// };

// WIP: checkWinLogic worked for individual conditions, but sometimes the condition detected when player wins.

// Check win conditions from first to last order
const checkWin = () => {
  // console.log("checking win...", playerHand);
  tallyRanks();
  tallySuits();

  // Define winning states to corresponding functions
  // const straightState = isStraight();
  // const flushState = isFlush();
  // const fourState = isFourOfAKind(rankTally);
  // const threeState = isThreeOfAKind(rankTally);
  // const twoPairsCount = isTwoPairs(rankTally);
  const onePairCount = isOnePair(rankTally);

  // if (straightState && flushState) {
  //   output = `Congratulations on winning A STRAIGHT FLUSH. You've earned ${
  //     handConditions["Straight Flush"] * bet
  //   } to your coins!`;
  //   coins += handConditions["Straight Flush"] * bet;
  // } else if (fourState) {
  //   output = `Congratulations on winning A FOUR OF A KIND. You've earned ${
  //     handConditions["Four of a Kind"] * bet
  //   } to your coins!`;
  //   coins += handConditions["Four of a Kind"] * bet;
  // } else if (threeState && twoPairsCount === 1) {
  //   output = `Congratulations on winning A FULL HOUSE'. You've earned ${
  //     handConditions["Full House"] * bet
  //   } to your coins!`;
  //   coins += handConditions["Full House"] * bet;
  // } else if (flushState) {
  //   output = `Congratulations on winning A FLUSH. You've earned ${
  //     handConditions.Flush * bet
  //   } to your coins!`;
  //   coins += handConditions.Flush * bet;
  // } else if (straightState) {
  //   output = `Congratulations on winning A STRAIGHT. You've earned ${
  //     handConditions.Straight * bet
  //   } to your coins!`;
  //   coins += handConditions.Straight * bet;
  // } else if (threeState) {
  //   output = `Congratulations on winning A THREE OF A KIND. You've earned ${
  //     handConditions["Three of a Kind"] * bet
  //   } to your coins!`;
  //   coins += handConditions["Three of a Kind"] * bet;
  // } else if (twoPairsCount) {
  //   output = `Congratulations on winning A TWO PAIRS. You've earned ${
  //     handConditions["Two Pairs"] * bet
  //   } to your coins!`;
  //   coins += handConditions["Two Pairs"] * bet;
  // } else if (onePairCount) {
  //   output = `Congratulations on winning A ONE PAIR. You've earned ${
  //     handConditions["One Pair"] * bet
  //   } to your coins!`;
  //   coins += handConditions["One Pair"] * bet;
  // } else {
  //   output = "Nice try!";
  //   coins -= bet;
  // }
  console.log("onePairCount", onePairCount);
  if (onePairCount) {
    output = `Congratulations on winning A ONE PAIR`;
    console.log("OUTPUT:", output);
  }

  // output += "<br> Click DEAL to play again.";
  // coinsDisplay.innerHTML = `${coins} <br> COINS`;
  // dealButton.disabled = false;
  // incrementButton.disabled = false;
  // decrementButton.disabled = false;
  // playerHand = [];
  // rankTally = {};
  // suitTally = {};
  // // WIP: Replay. To re-display card event listener not working.
  // // dealButton.removeEventListener("click", checkWin);
  // dealButton.addEventListener("click", displayCards);
  // return output;
};

checkWin();
