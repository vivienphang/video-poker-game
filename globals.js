// ** Global var **
// 1. playerhand
// 2. suit tally
// 3. rank tally
// 4. card swap
// 5. game start = true
// 6. bet
// 7. coins
// 8. output
// 9. handConditions

let playerHand = [];
let bet = 1;
let coins = 100;
let suitTally = {};
let rankTally = {};
let cardSwap = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
};

// List of possible win conditions and payouts
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

let gameStart = true;
