const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
const RANKS = [
  '2', '3', '4', '5', '6', '7', '8', '9', '10',
  'J', 'Q', 'K', 'A'
];

export function createDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ rank, suit });
    }
  }
  return deck;
}

export function shuffle(deck) {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}

export function dealHoleCards(deck, players) {
  const newPlayers = [...players];
  for (let i = 0; i < newPlayers.length; i++) {
    newPlayers[i].hole_cards = [deck.pop(), deck.pop()];
  }
  return { updatedPlayers: newPlayers, remainingDeck: deck };
}
