import { ref, watch } from 'vue'

// Load total points from localStorage or start at 0
export const totalPoints = ref(parseFloat(localStorage.getItem('money')) || 0)

// Base points per click (always 1 here)
export const basePointsPerClick = 1

// Click multiplier starts at 1 (no multiplier)
export const clickMultiplier = ref(1)

// Track current click multiplier upgrade level (starts at 1)
export const clickMultiplierLevel = ref(parseInt(localStorage.getItem('clickMultiplierLevel')) || 1)

// Save totalPoints and clickMultiplierLevel to localStorage on changes
watch(totalPoints, (val) => {
  localStorage.setItem('money', val.toFixed(2))
})
watch(clickMultiplierLevel, (val) => {
  localStorage.setItem('clickMultiplierLevel', val)
})

// Calculate cost for next click multiplier upgrade (e.g., linear scaling)
export function getClickMultiplierUpgradeCost() {
  return 50 * clickMultiplierLevel.value
}

// Calculate how much the click multiplier increases on each upgrade
export function getClickMultiplierIncrease() {
  return 0.25 + (clickMultiplierLevel.value - 1) * 0.05
}

// Function to handle clicking cookie: adds points based on multiplier
export function clickCookie() {
  const pointsGained = basePointsPerClick * clickMultiplier.value
  totalPoints.value += pointsGained
  console.log(`Clicked! +${pointsGained.toFixed(2)} points, Total: ${totalPoints.value.toFixed(2)}`)
}

// Function to buy click multiplier upgrade if enough points
export function buyClickMultiplierUpgrade() {
  const cost = getClickMultiplierUpgradeCost()
  if (totalPoints.value >= cost) {
    totalPoints.value -= cost
    const increase = getClickMultiplierIncrease()
    clickMultiplier.value += increase
    clickMultiplierLevel.value += 1
    console.log(`Upgrade bought! Click multiplier is now x${clickMultiplier.value.toFixed(2)}.`)
  } else {
    console.log(`Not enough points! Need ${cost.toFixed(2)} points.`)
  }
}
