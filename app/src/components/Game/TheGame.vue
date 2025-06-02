<template>
    <div class="game-wrapper">
        <h1>💰 Money Clicker Game</h1>
        <p>
            You have: <strong>{{ money }}</strong> money
        </p>

        <button @click="onIncrementMoney" @mousedown="isClicked = true" @mouseup="isClicked = false"
            @mouseleave="isClicked = false" :class="{ 'scale-110': isClicked }"
            class="transition-transform duration-150 ease-out cookie-button">
            <img src="/images/cookie.png" alt="cookie" />
        </button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getStoredMoney, incrementMoney } from './game.js'

const isClicked = ref(false)
const money = ref(0)

onMounted(() => {
    money.value = getStoredMoney()
})

function onIncrementMoney() {
    money.value = incrementMoney()
}
</script>

<style scoped>
.game-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

p {
    font-size: 1.75rem;
    margin-bottom: 2rem;
}

.cookie-button {
    width: 150px;
    height: 150px;
    background: none;
    border: none;
    cursor: pointer;
    margin-bottom: 1rem;
}

.cookie-button img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>