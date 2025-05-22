<template>
    <div class="flex flex-col gap-4 items-center">
      <button @click="incrementMoney" class="transition transform active:scale-90 duration-150">
        <img src="/images/cookie.png" alt="cookie" class="w-24 h-24" />
      </button>
  
      <div class="text-xl font-semibold">Money: {{ money }}</div>
      <div class="text-sm text-gray-600">Multiplier: x{{ multiplier }}</div>
  
      <button
        @click="buyUpgrade"
        class="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 disabled:opacity-50"
        :disabled="money < getUpgradeCost()"
      >
        Buy Upgrade (Cost: {{ getUpgradeCost() }})
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const money = ref(0)
  const multiplier = ref(1)
  const upgradeLevel = ref(0)
  
  const getUpgradeCost = () => {
    return Math.floor(100 * Math.pow(1.8, upgradeLevel.value))
  }
  
  const incrementMoney = () => {
    money.value += 1 * multiplier.value
  }
  
  const buyUpgrade = () => {
    const cost = getUpgradeCost()
    if (money.value >= cost) {
      money.value -= cost
      upgradeLevel.value++
      multiplier.value = 1 + upgradeLevel.value
    }
  }
  </script>
  