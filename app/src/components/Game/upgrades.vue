<template>
    <div class="upgrade-wrapper">
        <p>Click Multiplier: x{{ multiplier.toFixed(2) }}</p>
        <p>Level: {{ level }}</p>
        <p>Upgrade Cost: {{ cost }}</p>

        <button :disabled="money < cost" @click="buyUpgrade">
            Upgrade Click Multiplier
        </button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
    getClickMultiplier,
    getClickMultiplierLevel,
    getUpgradeCost,
    tryBuyClickMultiplierUpgrade,
    getStoredMoney
} from './upgrades.js'

const multiplier = ref(1)
const level = ref(1)
const cost = ref(50)
const money = ref(0)

function updateState() {
    multiplier.value = getClickMultiplier()
    level.value = getClickMultiplierLevel()
    cost.value = getUpgradeCost()
    money.value = getStoredMoney()
}

function buyUpgrade() {
    const result = tryBuyClickMultiplierUpgrade()
    if (result.success) {
        updateState()
        alert(`Upgraded! Multiplier is now x${result.newMultiplier.toFixed(2)}`)
    } else {
        alert(result.message)
    }
}

onMounted(() => {
    updateState()
    setInterval(updateState, 1000)
})
</script>

<style scoped>
.upgrade-wrapper {
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 8px;
    text-align: center;
    font-family: Arial, sans-serif;
}

button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    background: #42a5f5;
    color: white;
    border: none;
    border-radius: 6px;
    margin-top: 1rem;
    cursor: pointer;
}

button:disabled {
    background: #aaa;
    cursor: not-allowed;
}
</style>