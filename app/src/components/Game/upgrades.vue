<template>
    <div class="upgrades-wrapper">
        <h2>Click Upgrade</h2>

        <p>Total Points: {{ totalPoints.toFixed(2) }}</p>
        <p>Click Multiplier: x{{ clickMultiplier.toFixed(2) }}</p>
        <p>Click Strength: +{{ (basePointsPerClick * clickMultiplier).toFixed(2) }}</p>

        <button class="click-button" @click="handleClickCookie">
            Click Me 🍪
        </button>

        <button class="upgrade-button" :disabled="!canBuyUpgrade" @click="handleBuyClickMultiplier">
            Buy Click Multiplier Upgrade (Cost: {{ clickMultiplierCost }})
        </button>
    </div>
</template>

<script setup>
import {
    totalPoints,
    clickMultiplier,
    basePointsPerClick,
    clickCookie,
    buyClickMultiplierUpgrade,
    getClickMultiplierUpgradeCost,
} from './upgrades.js'

import { computed } from 'vue'

// Compute upgrade cost dynamically
const clickMultiplierCost = computed(() => getClickMultiplierUpgradeCost())

// Can buy upgrade only if enough points
const canBuyUpgrade = computed(() => totalPoints.value >= clickMultiplierCost.value)

// Handler functions
function handleClickCookie() {
    clickCookie()
}

function handleBuyClickMultiplier() {
    buyClickMultiplierUpgrade()
}
</script>

<style scoped>
.upgrades-wrapper {
    max-width: 360px;
    margin: 2rem auto;
    text-align: center;
    font-family: Arial, sans-serif;
    background: #f0f0f0;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

button {
    width: 100%;
    margin-top: 1rem;
    padding: 0.75rem 0;
    font-size: 1.2rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.click-button {
    background-color: #ffb74d;
    color: #fff;
    font-weight: bold;
    box-shadow: 0 4px #d6892c;
}

.click-button:hover {
    background-color: #ffa726;
}

.upgrade-button {
    background-color: #64b5f6;
    color: #fff;
    box-shadow: 0 4px #357ae8;
}

.upgrade-button:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
    box-shadow: none;
}

.upgrade-button:hover:enabled {
    background-color: #42a5f5;
}
</style>