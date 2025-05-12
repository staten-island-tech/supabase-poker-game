import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/plugins/supabase'
import { deck as fullDeck } from '@/Logic/PokecardsArray'
import PokerHand from 'poker-hand-evaluator'

export function usePokerGame(roomId, playerId) {
  const players = ref([])
  const deck = ref([])
  const communityCards = ref([])
  const holeCards = ref({})
  const pot = ref(0)
  const gamePhase = ref('waiting') // 'waiting', 'deal', 'showdown'

  // Initialize shuffled deck
  function shuffleDeck() {
    const newDeck = [...fullDeck]
    newDeck.sort(() => Math.random() - 0.5)
    deck.value = newDeck
  }

  function dealCards() {
    shuffleDeck()
    communityCards.value = deck.value.slice(0, 5)

    const hole = {}
    players.value.forEach((player, i) => {
      hole[player.id] = [deck.value[5 + i * 2], deck.value[6 + i * 2]]
    })
    holeCards.value = hole
    gamePhase.value = 'deal'
  }

  function convertCard(card) {
    const rankMap = {
      2: '2', 3: '3', 4: '4', 5: '5', 6: '6',
      7: '7', 8: '8', 9: '9', 10: '10',
      Jack: 'J', Queen: 'Q', King: 'K', Ace: 'A',
    }
    const suitMap = {
      Hearts: 'H', Diamonds: 'D', Clubs: 'C', Spades: 'S',
    }
    return `${rankMap[card.value]}${suitMap[card.type]}`
  }

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

  function evaluateWinner() {
    const community = communityCards.value.map(convertCard)
    const hands = players.value.map((player) => {
      const hole = holeCards.value[player.id].map(convertCard)
      const fullHand = [...hole, ...community]
      const best = getBestPokerHand(fullHand)
      return { player, best, score: best.getScore() }
    })

    hands.sort((a, b) => a.score - b.score)
    const top = hands[0]
    const tied = hands.filter((h) => h.score === top.score)

    if (tied.length === 1) {
      return [top]
    } else {
      return tied
    }
  }

  async function loadPlayers() {
    const { data, error } = await supabase
      .from('room_players')
      .select('*')
      .eq('room_id', roomId)
    if (!error) players.value = data
  }

  onMounted(() => {
    loadPlayers()
  })

  return {
    players,
    communityCards,
    holeCards,
    pot,
    gamePhase,
    dealCards,
    evaluateWinner,
  }
}
