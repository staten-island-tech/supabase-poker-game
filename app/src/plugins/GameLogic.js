// Import deck and poker-hand-evaluator
import { deck } from './plugins/PokercardsArray.js'
import PokerHand from 'poker-hand-evaluator'

// --- Step 1: Shuffle the deck ---
const deckCopy = deck.slice()
deckCopy.sort(() => 0.5 - Math.random())

// --- Step 2: Deal hole cards (2 per player) ---
const player1Hole = [deckCopy[0].title, deckCopy[1].title]
const player2Hole = [deckCopy[2].title, deckCopy[3].title]

// --- Step 3: Deal community cards (5 total) ---
const community = [
  deckCopy[4].title, // Flop 1
  deckCopy[5].title, // Flop 2
  deckCopy[6].title, // Flop 3
  deckCopy[7].title, // Turn
  deckCopy[8].title, // River
]

// --- Step 4: Combine hole + community for each player ---
const player1Full = [...player1Hole, ...community]
const player2Full = [...player2Hole, ...community]

// --- Step 5: Evaluate best 5-card hand from 7 cards ---
function getBestPokerHand(cards) {
  const combinations = getCombinations(cards, 5)
  let best = null
  let bestScore = Infinity

  for (const combo of combinations) {
    const hand = new PokerHand(combo.join(' '))
    const score = hand.getScore()
    if (score < bestScore) {
      best = hand
      bestScore = score
    }
  }

  return best
}

// --- Helper: Generate all 5-card combinations ---
function getCombinations(arr, n) {
  const result = []

  function combine(start, combo) {
    if (combo.length === n) {
      result.push([...combo])
      return
    }
    for (let i = start; i < arr.length; i++) {
      combine(i + 1, combo.concat(arr[i]))
    }
  }

  combine(0, [])
  return result
}

// --- Step 6: Evaluate and compare players ---
const bestHand1 = getBestPokerHand(player1Full)
const bestHand2 = getBestPokerHand(player2Full)

const winner =
  bestHand1.getScore() < bestHand2.getScore()
    ? 'Player 1 Wins!'
    : bestHand1.getScore() > bestHand2.getScore()
      ? 'Player 2 Wins!'
      : 'It’s a Tie!'

// --- Step 7: Display Results ---
console.log('🃏 Community Cards:', community)
console.log('👤 Player 1 Hole Cards:', player1Hole, '| Best Hand:', bestHand1.describe())
console.log('👤 Player 2 Hole Cards:', player2Hole, '| Best Hand:', bestHand2.describe())
console.log('🏆', winner)

//poker-hand-evaluator
