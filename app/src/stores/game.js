import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { supabase } from '@/plugins/supabase'

export const useGameStore = defineStore('game', () => {
  // State variables
  const gameState = ref('waiting')  // 'waiting', 'playing', 'finished'
  const deck = ref([])  // Shuffled deck
  const communityCards = ref([])  // Flop, Turn, River
  const pot = ref(0)  // Pot amount
  const currentTurn = ref(null)  // ID of current player

  const players = reactive({})  // Dictionary of players' state

  // Reset game state
  const resetGame = () => {
    deck.value = []
    communityCards.value = []
    pot.value = 0
    gameState.value = 'waiting'
    currentTurn.value = null
    Object.keys(players).forEach(id => {
      players[id] = {
        hand: [],
        bet: 0,
        chips: players[id]?.chips ?? 1000,
        folded: false,
      }
    })
  }

  // Sync room state to the Supabase database
  const updateRoomState = async (roomId) => {
    const { error } = await supabase
      .from('room_state')
      .upsert({
        room_id: roomId,
        game_state: gameState.value,
        deck: deck.value,
        community_cards: communityCards.value,
        pot: pot.value,
        current_turn: currentTurn.value,
        updated_at: new Date(),
      })

    if (error) {
      console.error('Failed to update room state:', error)
    }
  }

  // Load game data from Supabase (for existing game)
  const loadGameData = async (gameId) => {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('id', gameId)
      .single()

    if (error) {
      console.error('Error loading game data:', error)
      return
    }

    // Set the data into the store
    gameState.value = data.status
    deck.value = data.deck || []
    communityCards.value = data.community_cards || []
    pot.value = data.pot
    currentTurn.value = data.current_turn
  }

  // Load players data from Supabase (for existing game)
  const loadPlayersData = async (gameId) => {
    const { data, error } = await supabase
      .from('game_players')
      .select('*')
      .eq('game_id', gameId)

    if (error) {
      console.error('Error loading players data:', error)
      return
    }

    data.forEach(player => {
      players[player.user_id] = {
        hand: player.hole_cards,
        bet: player.bet,
        chips: player.chips,
        folded: player.folded,
        username: player.username,
        seatNumber: player.seat_number,
      }
    })
  }

  // Real-time listener for game updates
  const listenToGameChanges = (gameId) => {
    const gameChannel = supabase
      .channel(`game:${gameId}`)
      .on('UPDATE', { table: 'games' }, (payload) => {
        console.log('Game data updated:', payload)
        loadGameData(gameId)
      })
      .on('UPDATE', { table: 'game_players' }, (payload) => {
        console.log('Players data updated:', payload)
        loadPlayersData(gameId)
      })
      .subscribe()
  }

  // Handle player action (bet, fold, call, raise)
  const playerAction = async (action, amount = 0) => {
    const currentPlayer = players[currentTurn.value]
    
    // Check if the player has sufficient chips or valid action
    if (action === 'bet' || action === 'raise') {
      if (currentPlayer.chips < amount) {
        console.error('Not enough chips to perform this action.')
        return
      }
    }
    
    // Perform the action and update game state
    const { error } = await supabase
      .from('game_actions')
      .insert([
        {
          game_id: currentPlayer.game_id,
          player_id: currentPlayer.id,
          action,
          amount,
        },
      ])

    if (error) {
      console.error('Failed to insert action:', error)
      return
    }

    // Update game state based on action
    if (action === 'bet' || action === 'raise') {
      pot.value += amount
      currentPlayer.chips -= amount
    } else if (action === 'fold') {
      currentPlayer.folded = true
    }

    // Move to next player
    const nextPlayer = getNextPlayer(currentTurn.value)
    currentTurn.value = nextPlayer
  }

  // Get the next player’s ID in the sequence
  const getNextPlayer = (currentPlayerId) => {
    const playerIds = Object.keys(players)
    const currentPlayerIndex = playerIds.indexOf(currentPlayerId)
    const nextPlayerIndex = (currentPlayerIndex + 1) % playerIds.length
    return playerIds[nextPlayerIndex]
  }

  return {
    gameState,
    deck,
    communityCards,
    pot,
    currentTurn,
    players,
    resetGame,
    updateRoomState,
    loadGameData,
    loadPlayersData,
    listenToGameChanges,
    playerAction,
  }
})
