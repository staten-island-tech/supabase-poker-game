<template>
    <div class="p-4 bg-gray-100 min-h-screen">
      <h1 class="text-3xl font-bold text-center text-gray-700 mb-4">Game Room: {{ roomStore.currentRoom?.room_name }}</h1>
      
      <!-- Waiting for players -->
      <div v-if="gameStore.gameState === 'waiting'" class="text-center text-xl text-gray-600">
        <p>Waiting for players...</p>
      </div>
      
      <!-- Playing the game -->
      <div v-if="gameStore.gameState === 'playing'" class="space-y-6">
        <div class="text-center text-lg text-gray-600">
          <p>Pot: <span class="font-semibold text-xl text-green-600">{{ gameStore.pot }}</span></p>
          <p>Current Turn: <span class="font-semibold text-xl text-blue-600">{{ gameStore.players[gameStore.currentTurn]?.username }}</span></p>
        </div>
        
        <!-- Player's Hand -->
        <div class="text-center">
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Your Hand:</h3>
          <p class="text-lg text-gray-800">{{ gameStore.players[roomStore.userId]?.hand }}</p>
          
          <!-- Bet/Fold options -->
          <div v-if="gameStore.currentTurn === roomStore.userId && !gameStore.players[roomStore.userId]?.folded" class="mt-4 flex justify-center gap-4">
            <button @click="onBet(100)" class="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600">Bet 100</button>
            <button @click="onFold" class="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600">Fold</button>
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
  
  // Subscribe to game state changes
  onMounted(() => {
    if (!roomStore.currentRoom?.id) return
  
    // Set up real-time subscription to room state
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
  
    // Listen for player data updates
    gameStore.listenToGameChanges(roomStore.currentRoom.id)
  })
  
  onBeforeUnmount(() => {
    if (channel) supabase.removeChannel(channel)
  })
  
  // Trigger bet action (example)
  const onBet = async (amount) => {
    if (gameStore.players[roomStore.userId].chips < amount) {
      alert('Not enough chips!')
      return
    }
  
    // Perform the betting action
    await gameStore.playerAction('bet', amount)
  
    // Sync room state after action
    await gameStore.updateRoomState(roomStore.currentRoom.id)
  }
  
  // Trigger fold action
  const onFold = async () => {
    // Perform fold action
    await gameStore.playerAction('fold')
  
    // Sync room state after action
    await gameStore.updateRoomState(roomStore.currentRoom.id)
  }
  </script>
  
  <style scoped>
  </style>
  