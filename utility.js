// ===============================================
// ====== Create and shuffle deck of card  =======
// ===============================================

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
  // console.log("deck:", deck);
  return deck;
};

const newDeck = createDeck();

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
  // console.log("shuffled cards:", cards);
  return cards;
};
shuffleDeck(newDeck);

// ===============================================
// ========= Deal 5 cards to playerhand  =========
// ===============================================

let playerHand = [];

// Set the max length of playerHand to 5 as we only deal 5 cards
playerHand = newDeck.splice(0, 5);
// console.log(playerHand);
