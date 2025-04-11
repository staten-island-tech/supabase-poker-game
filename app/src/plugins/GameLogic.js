import { deck } from './plugins/PokercardsArray.js'

// Create a copy of the deck
const deckCopy = deck.slice()

// Shuffle the deck
deckCopy.sort(() => 0.5 - Math.random())

// Deal hole cards
const player1Card1 = deckCopy[0].title
const player1Card2 = deckCopy[1].title

const player2Card1 = deckCopy[2].title
const player2Card2 = deckCopy[3].title

// Deal community cards
const flopCard1 = deckCopy[4].title
const flopCard2 = deckCopy[5].title
const flopCard3 = deckCopy[6].title

const turnCard = deckCopy[7].title
const riverCard = deckCopy[8].title

// Create full 7-card hands for each player
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

// Optional: copy for sorting/analysis
const orderedPlayerHand1 = [...playerHand1]
const orderedPlayerHand2 = [...playerHand2]

// Display result in console
console.log(
  'Player 1 Hand:',
  orderedPlayerHand1.map((card) => card.title),
)
console.log(
  'Player 2 Hand:',
  orderedPlayerHand2.map((card) => card.title),
)

//poker-hand-evaluator
