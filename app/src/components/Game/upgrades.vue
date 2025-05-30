<template>
    <div class="upgrades-wrapper">
        <h2>Upgrade Clicker</h2>
        <p>Total Points: {{ totalPoints.toFixed(2) }}</p>
        <p>Click Multiplier: x{{ clickMultiplier.toFixed(2) }}</p>
        <p>Passive Multiplier: x{{ passiveMultiplier.toFixed(2) }}</p>
        <p>Temporary Multiplier: x{{ temporaryMultiplier.toFixed(2) }}</p>

        <button @click="handleClickCookie">Click Cookie 🍪</button>

        <div class="upgrades-buttons">
            <button @click="handleBuyClickMultiplier">Buy Click Multiplier Upgrade (Cost: 50)</button>
            <button @click="handleBuyPassiveMultiplier">Buy Passive Multiplier Upgrade (Cost: 100)</button>
            <button @click="handleActivateTempMultiplier">Activate x5 Temp Multiplier (10s)</button>
        </div>
    </div>
</template>

<script setup>
import {
    totalPoints,
    clickMultiplier,
    passiveMultiplier,
    temporaryMultiplier,
    clickCookie,
    buyClickMultiplierUpgrade,
    buyPassiveMultiplierUpgrade,
    activateTemporaryMultiplier
} from './upgrades.js'

function handleClickCookie() {
    clickCookie()
}

function handleBuyClickMultiplier() {
    buyClickMultiplierUpgrade(50, 0.5) // cost 50 points, increase multiplier by 0.5
}

function handleBuyPassiveMultiplier() {
    buyPassiveMultiplierUpgrade(100, 0.25) // cost 100 points, increase multiplier by 0.25
}

function handleActivateTempMultiplier() {
    activateTemporaryMultiplier(5, 10000) // x5 multiplier for 10 seconds
}
</script>

<style scoped>
.upgrades-wrapper {
    max-width: 400px;
    margin: auto;
    text-align: center;
    font-family: Arial, sans-serif;
}

button {
    margin: 10px 0;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
}

.upgrades-buttons>button {
    display: block;
    width: 100%;
}
</style>