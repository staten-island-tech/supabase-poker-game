<template>
  <div class="p-4 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold text-center text-gray-700 mb-4">
      Game Room: {{ roomStore.currentRoom?.room_name }}
    </h1>

    <!-- Waiting for players -->
    <div v-if="gameStore.gameState === 'waiting'" class="text-center text-xl text-gray-600">
      <p class="mb-4">Waiting for players...</p>
      <button
        @click="startGame"
        class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded"
      >
        Start Game
      </button>
    </div>

    <!-- Playing the game -->
    <div v-if="gameStore.gameState === 'playing'" class="space-y-6">
      <div class="text-center text-lg text-gray-600">
        <p>Pot: <span class="font-semibold text-xl text-green-600">{{ gameStore.pot }}</span></p>
        <p>
          Current Turn:
          <span class="font-semibold text-xl text-blue-600">
            {{ gameStore.players[gameStore.currentTurn]?.username || '...' }}
          </span>
        </p>
      </div>

      <!-- Player's Hand -->
      <div class="text-center">
        <h3 class="text-xl font-semibold text-gray-700 mb-2">Your Hand:</h3>
        <p class="text-lg text-gray-800">{{ gameStore.players[roomStore.userId]?.hand }}</p>

        <!-- Bet/Fold options -->
        <div
          v-if="gameStore.currentTurn === roomStore.userId && !gameStore.players[roomStore.userId]?.folded"
          class="mt-4 flex justify-center gap-4"
        >
          <button
            @click="onBet(100)"
            class="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
          >
            Bet 100
          </button>
          <button
            @click="onFold"
            class="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600"
          >
            Fold
          </button>
        </div>
      </div>

      <!-- Community Cards -->
      <div class="text-center">
        <h3 class="text-xl font-semibold text-gray-700 mb-2">Community Cards:</h3>
        <p class="text-lg text-gray-800">{{ gameStore.communityCards }}</p>
      </div>
    </div>

    <!-- Finished Game -->
    <div v-if="gameStore.gameState === 'finished'" class="text-center text-xl text-gray-600">
      <p>The game has ended.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { supabase } from '@/plugins/supabase'
import { useGameStore } from '@/stores/game'
import { useRoomStore } from '@/stores/auth/room'

const gameStore = useGameStore()
const roomStore = useRoomStore()

let channel

// Utility function to generate a deck of cards
const generateDeck = () => {
  const suits = ['♠', '♥', '♦', '♣']
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
  return suits.flatMap(suit => ranks.map(rank => `${rank}${suit}`))
}

// Subscribe to game state changes
onMounted(() => {
  if (!roomStore.currentRoom?.id) return

  channel = supabase
    .channel(`room_state:${roomStore.currentRoom.id}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'room_state',
        filter: `room_id=eq.${roomStore.currentRoom.id}`,
      },
      payload => {
        const state = payload.new
        console.log('Room state updated:', state)

        gameStore.gameState = state.game_state
        gameStore.deck = state.deck
        gameStore.communityCards = state.community_cards
        gameStore.pot = state.pot
        gameStore.currentTurn = state.current_turn
      }
    )
    .subscribe()

  gameStore.listenToGameChanges(roomStore.currentRoom.id)
})

onBeforeUnmount(() => {
  if (channel) supabase.removeChannel(channel)
})

// Start the game by setting up players and the deck
const startGame = async () => {
  if (!roomStore.currentRoom || !roomStore.currentRoom.id) {
    console.error('Room is not available or not properly initialized.')
    alert('Room not available. Please check the room and try again.')
    return
  }

  try {
    // 1. Get room data
    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .select('id, code')
      .eq('id', roomStore.currentRoom.id)
      .single() // Expecting a single row
    if (roomError) throw roomError
    if (!room) {
      alert('Room not found.')
      return
    }

    // 2. Check if a game already exists for the room
    const { data: existingGame, error: existingGameError } = await supabase
      .from('games')
      .select('id')
      .eq('room_code', room.code)
      .single() // Expecting a single row
    if (existingGameError) throw existingGameError
    if (existingGame) {
      alert('A game has already been started for this room.')
      return
    }

    // 3. Get members in the room
    const { data: members, error: membersError } = await supabase
      .from('room_members')
      .select('user_id, username')
      .eq('room_id', room.id)

    if (membersError) throw membersError
    if (!members || members.length < 2) {
      alert('Need at least 2 players to start.')
      return
    }

    // 4. Shuffle the deck
    const fullDeck = generateDeck()
    const shuffled = fullDeck.sort(() => 0.5 - Math.random())
    const holeCards = {}
    members.forEach(p => {
      holeCards[p.user_id] = [shuffled.pop(), shuffled.pop()]
    })

    const communityCards = []

    // 5. Create the game record
    const { data: game, error: gameError } = await supabase
      .from('games')
      .insert({
        room_code: room.code,
        status: 'playing',
        deck: shuffled,
        community_cards: communityCards,
        current_turn: members[0].user_id
      })
      .select()
      .single() // Expecting a single row
    if (gameError) throw gameError
    if (!game) {
      alert('Failed to create game.')
      return
    }

    // 6. Insert players into the game
    const gamePlayers = members.map((p, i) => ({
      game_id: game.id,
      user_id: p.user_id,
      username: p.username,
      chips: 1000,
      hole_cards: holeCards[p.user_id],
      seat_number: i
    }))

    const { error: insertPlayersError } = await supabase
      .from('game_players')
      .insert(gamePlayers)

    if (insertPlayersError) throw insertPlayersError

    // 7. Update the room state
    const { error: updateStateError } = await supabase
      .from('room_state')
      .update({
        game_state: 'playing',
        deck: shuffled,
        community_cards: [],
        pot: 0,
        current_turn: members[0].user_id
      })
      .eq('room_id', room.id)

    if (updateStateError) throw updateStateError

    console.log('Game started successfully.')
  } catch (err) {
    console.error('Error starting game:', err)
    alert('Failed to start game. Check console for details.')
  }
}



// Trigger bet action
const onBet = async (amount) => {
  if (gameStore.players[roomStore.userId].chips < amount) {
    alert('Not enough chips!')
    return
  }

  await gameStore.playerAction('bet', amount)
  await gameStore.updateRoomState(roomStore.currentRoom.id)
}

// Trigger fold action
const onFold = async () => {
  await gameStore.playerAction('fold')
  await gameStore.updateRoomState(roomStore.currentRoom.id)
}
</script>

<style scoped></style>
