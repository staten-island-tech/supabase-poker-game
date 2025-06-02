// upgrades.js

export function getClickMultiplierLevel() {
  return parseInt(localStorage.getItem('clickMultiplierLevel')) || 1
}

export function setClickMultiplierLevel(level) {
  localStorage.setItem('clickMultiplierLevel', level)
}

export function getClickMultiplier() {
  return parseFloat(localStorage.getItem('clickMultiplier')) || 1
}

export function setClickMultiplier(multiplier) {
  localStorage.setItem('clickMultiplier', multiplier.toFixed(2))
}

export function getUpgradeCost() {
  const level = getClickMultiplierLevel()
  return 50 * level
}

export function getUpgradeIncrease() {
  const level = getClickMultiplierLevel()
  return 0.25 + (level - 1) * 0.05
}

export function getStoredMoney() {
  return parseInt(localStorage.getItem('money') || '0', 10)
}

export function setStoredMoney(amount) {
  localStorage.setItem('money', amount.toString())
}

export function tryBuyClickMultiplierUpgrade() {
  const money = getStoredMoney()
  const cost = getUpgradeCost()

  if (money >= cost) {
    const newMultiplier = getClickMultiplier() + getUpgradeIncrease()
    const newLevel = getClickMultiplierLevel() + 1
    const newMoney = money - cost

    setStoredMoney(newMoney)
    setClickMultiplier(newMultiplier)
    setClickMultiplierLevel(newLevel)

    return {
      success: true,
      newMultiplier,
      newLevel,
      newMoney,
    }
  }

  return { success: false, message: 'Not enough money' }
}
