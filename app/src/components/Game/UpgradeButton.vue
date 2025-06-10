<template>
  <div class="flex flex-col items-center gap-2">
    <button
      @click="buyUpgrade"
      :disabled="money < upgradeCost"
      class="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 disabled:opacity-50 transition"
    >
      Buy Upgrade<br />
      <span class="text-sm">(Cost: {{ upgradeCost }})</span>
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useGameStore } from '@/stores/game.js'

const store = useGameStore()

onMounted(async () => {
  await store.loadFromSupabase()
})

const money = computed(() => store.money)
const multiplier = computed(() => store.multiplier)
const upgradeLevel = computed(() => store.upgradeLevel)

const upgradeCost = computed(() => Math.floor(100 * Math.pow(1.8, upgradeLevel.value)))

async function buyUpgrade() {
  if (money.value < upgradeCost.value) {
    console.log('Not enough money to buy upgrade')
    return
  }
  await store.buyUpgrade()
  window.location.reload()
}
</script>
