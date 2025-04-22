import { deck } from './plugins/PokercardsArray.js'
import PokerHand from 'poker-hand-evaluator'

// --- Convert card to evaluator format ---
function convertCard(card) {
  const rankMap = {
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '10',
    Jack: 'J',
    Queen: 'Q',
    King: 'K',
    Ace: 'A',
  }

  const suitMap = {
    Hearts: 'H',
    Diamonds: 'D',
    Clubs: 'C',
    Spades: 'S',
  }

  const rank = rankMap[card.value]
  const suit = suitMap[card.type]
  return `${rank}${suit}`
}

// --- Shuffle deck ---
const deckCopy = [...deck]
deckCopy.sort(() => 0.5 - Math.random())

// --- Deal cards ---
const player1Hole = [deckCopy[0], deckCopy[1]]
const player2Hole = [deckCopy[2], deckCopy[3]]
const communityCards = [deckCopy[4], deckCopy[5], deckCopy[6], deckCopy[7], deckCopy[8]]

// --- Convert to evaluator format ---
const p1 = [...player1Hole, ...communityCards].map(convertCard)
const p2 = [...player2Hole, ...communityCards].map(convertCard)
const community = communityCards.map(convertCard)

// --- Evaluate best 5-card poker hands ---
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

// --- Evaluate hands ---
const bestHand1 = getBestPokerHand(p1)
const bestHand2 = getBestPokerHand(p2)

// --- Prize logic ---
let player1Chips = 1000
let player2Chips = 1000
const player1Bet = 100
const player2Bet = 100

player1Chips -= player1Bet
player2Chips -= player2Bet

const pot = player1Bet + player2Bet

if (bestHand1.getScore() < bestHand2.getScore()) {
  player1Chips += pot
  console.log('🏆 Player 1 wins the pot of', pot)
} else if (bestHand2.getScore() < bestHand1.getScore()) {
  player2Chips += pot
  console.log('🏆 Player 2 wins the pot of', pot)
} else {
  player1Chips += pot / 2
  player2Chips += pot / 2
  console.log("🤝 It's a tie. Pot split:", pot / 2, 'each')
}

// --- Log game state ---
console.log('\n--- Game Summary ---')
console.log('Community Cards:', community.join(' '))
console.log('Player 1 Hole:', player1Hole.map((c) => c.title).join(', '))
console.log('  → Best Hand:', bestHand1.describe())
console.log('Player 2 Hole:', player2Hole.map((c) => c.title).join(', '))
console.log('  → Best Hand:', bestHand2.describe())
console.log('Chips: Player 1 =', player1Chips, '| Player 2 =', player2Chips)
