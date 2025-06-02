import { getClickMultiplier } from './upgrades.js'

export function getStoredMoney() {
  const storedMoney = localStorage.getItem('money')
  return storedMoney ? parseFloat(storedMoney) : 0
}

export function incrementMoney() {
  const currentMoney = getStoredMoney()
  const multiplier = getClickMultiplier()
  const earned = 1 * multiplier
  const newMoney = Math.round(currentMoney + earned)

  localStorage.setItem('money', newMoney.toString())
  return newMoney
}
