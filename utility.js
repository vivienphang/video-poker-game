// ===============================================
// ====== Create and shuffle deck of card  =======
// ===============================================

const createDeck = () => {
  const deck = [];
  const suits = ["hearts", "spades", "clubs", "diamonds"];
  const suitsSymbol = ["♥️", "♠️", "♣️", "♦️"];
  const suitsColour = ["red", "black", "black", "red"];

  for (let i = 0; i < suits.length; i++) {
    // setting the suit, symbol and colour
    const currentSuit = suits[i];
    const currentSymbol = suitsSymbol[i];
    const currentColour = suitsColour[i];
    // setting the rank of the cards
    for (let j = 1; j <= 13; j++) {
      let cardName = `${j}`;
      if (cardName === "11") cardName = "J";
      if (cardName === "12") cardName = "Q";
      if (cardName === "13") cardName = "K";
      if (cardName === "1") cardName = "A";
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: j,
        suitsSymbol: currentSymbol,
        suitsColour: currentColour,
        cardImg: `${cardName}_of_${currentSuit}.png`,
      };
      deck.push(card);
    }
  }
  console.log("deck:", deck);
  return deck;
};

createDeck();
