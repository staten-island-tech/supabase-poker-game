<template>
  <div class="flex items-center gap-2 px-4 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
    <span class="text-m font-medium text-gray-800 dark:text-white"
      >Multiplier: x{{ multiplier }}</span
    >
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useGameStore } from '@/stores/game.js'

const store = useGameStore()

onMounted(async () => {
  await store.loadFromSupabase()
})

const multiplier = computed(() => store.multiplier)
</script>
