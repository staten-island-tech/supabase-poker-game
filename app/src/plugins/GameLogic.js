import { deck } from './path/to/deck-file' // Update the path accordingly

// Make a copy of the deck
const deckCopy = deck.slice()

// Shuffle the deck
deckCopy.sort(() => 0.5 - Math.random())

// Deal cards
const player1Card1 = deckCopy[0].title
const player1Card2 = deckCopy[1].title

const player2Card1 = deckCopy[2].title
const player2Card2 = deckCopy[3].title

const flopCard1 = deckCopy[4].title
const flopCard2 = deckCopy[5].title
const flopCard3 = deckCopy[6].title

const turnCard = deckCopy[7].title
const riverCard = deckCopy[8].title

// Construct player hands (full 7-card hands)
const playerHand1 = [
  deckCopy[0],
  deckCopy[1], // hole cards
  deckCopy[4],
  deckCopy[5],
  deckCopy[6], // flop
  deckCopy[7], // turn
  deckCopy[8], // river
]

const playerHand2 = [
  deckCopy[2],
  deckCopy[3], // hole cards
  deckCopy[4],
  deckCopy[5],
  deckCopy[6], // flop
  deckCopy[7], // turn
  deckCopy[8], // river
]

// Optional: clone to keep original hands intact if you want to sort or analyze
const orderedPlayerHand1 = [...playerHand1]
const orderedPlayerHand2 = [...playerHand2]

// Output to console
console.log(
  'Player 1 Hand:',
  orderedPlayerHand1.map((card) => card.title),
)
console.log(
  'Player 2 Hand:',
  orderedPlayerHand2.map((card) => card.title),
)
