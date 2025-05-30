// upgrades.js
import { ref } from 'vue'

export const upgrades = ref([]) // you can expand this later with upgrade items

export const basePointsPerClick = 1

export const clickMultiplier = ref(1)
export const passiveMultiplier = ref(1)
export const temporaryMultiplier = ref(1)

export const totalPoints = ref(0)

function getTotalMultiplier() {
  return clickMultiplier.value * passiveMultiplier.value * temporaryMultiplier.value
}

export function clickCookie() {
  const pointsGained = basePointsPerClick * getTotalMultiplier()
  totalPoints.value += pointsGained
  console.log(
    `You earned ${pointsGained.toFixed(2)} points! Total: ${totalPoints.value.toFixed(2)}`,
  )
}

export function buyClickMultiplierUpgrade(cost, increase) {
  if (totalPoints.value >= cost) {
    totalPoints.value -= cost
    clickMultiplier.value += increase
    console.log(`Click multiplier increased to ${clickMultiplier.value.toFixed(2)}!`)
  } else {
    console.log('Not enough points for click multiplier upgrade.')
  }
}

export function buyPassiveMultiplierUpgrade(cost, increase) {
  if (totalPoints.value >= cost) {
    totalPoints.value -= cost
    passiveMultiplier.value += increase
    console.log(`Passive multiplier increased to ${passiveMultiplier.value.toFixed(2)}!`)
  } else {
    console.log('Not enough points for passive multiplier upgrade.')
  }
}

export function activateTemporaryMultiplier(multiplierValue, durationMs) {
  temporaryMultiplier.value = multiplierValue
  console.log(`Temporary multiplier activated: x${multiplierValue}`)

  setTimeout(() => {
    temporaryMultiplier.value = 1
    console.log('Temporary multiplier expired.')
  }, durationMs)
}
