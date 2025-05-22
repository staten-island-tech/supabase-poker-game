import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'

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