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
    position: fixed;
    bottom: 60px;
    /* height of cashout button + some margin */
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;

    padding: 1rem;
    max-width: 400px;
    width: 100%;
    text-align: center;
    font-family: Arial, sans-serif;
}



/* Base button styling */
button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    background: #42a5f5;
    color: white;
    border: none;
    border-radius: 6px;
    margin-top: 1rem;
    cursor: pointer;
    width: 100%;
    max-width: 300px;
}

button:disabled {
    background: #aaa;
    cursor: not-allowed;
}

/* Small screens: smartphones */
@media (max-width: 600px) {
    .upgrade-wrapper {
        padding: 0.75rem;
        font-size: 0.9rem;
    }

    button {
        font-size: 0.9rem;
        padding: 0.6rem 1.2rem;
    }
}

/* Medium screens: tablets */
@media (min-width: 601px) and (max-width: 1024px) {
    .upgrade-wrapper {
        padding: 1rem 2rem;
    }

    button {
        font-size: 1rem;
        padding: 0.75rem 1.5rem;
    }
}

/* Large screens: desktops */
@media (min-width: 1025px) {
    .upgrade-wrapper {
        padding: 2rem;
    }

    button {
        font-size: 1.1rem;
        padding: 1rem 2rem;
    }
}
</style>
