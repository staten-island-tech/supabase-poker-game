<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">🃏 Poker Game Room</h1>
  
      <div v-if="gamePhase === 'waiting'" class="mb-4">
        <p>Waiting for players...</p>
        <button @click="startGame" class="btn-primary mt-2">Start Game</button>
      </div>
  
      <div v-else class="space-y-6">
        <!-- Community Cards -->
        <div>
          <h2 class="text-xl font-semibold mb-2">Community Cards</h2>
          <div class="flex gap-3">
            <div
              v-for="(card, index) in communityCards"
              :key="index"
              class="p-2 border rounded shadow bg-white"
            >
              {{ card.title }}
            </div>
          </div>
        </div>
  
        <!-- Player Hole Cards -->
        <div>
          <h2 class="text-xl font-semibold mb-2">Players</h2>
          <div v-for="player in players" :key="player.id" class="mb-4 p-3 border rounded bg-gray-50">
            <p class="font-bold">👤 {{ player.username }}</p>
            <div class="flex gap-2 mt-1">
              <div
                v-for="card in holeCards[player.id]"
                :key="card.title"
                class="p-2 border rounded bg-white"
              >
                {{ card.title }}
              </div>
            </div>
          </div>
        </div>
  
        <!-- Winner -->
        <div v-if="winners.length">
          <h2 class="text-xl font-bold text-green-600">🏆 Winner</h2>
          <div v-for="winner in winners" :key="winner.player.id">
            {{ winner.player.username }} with {{ winner.best.describe().name }}
          </div>
        </div>
  
        <button @click="startGame" class="btn-secondary">Deal Again</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { usePokerGame } from '@/Logic/GameLogic.js'
  
  // You should pass these from route params or Pinia store
  const roomId = 'example-room-id'
  const playerId = 'example-player-id'
  
  const {
    players,
    communityCards,
    holeCards,
    pot,
    gamePhase,
    dealCards,
    evaluateWinner,
  } = usePokerGame(roomId, playerId)
  
  const winners = ref([])
  
  function startGame() {
    dealCards()
    setTimeout(() => {
      winners.value = evaluateWinner()
    }, 300) // small delay to ensure cards are dealt first
  }
  </script>
  
  <style scoped>
  </style>
  