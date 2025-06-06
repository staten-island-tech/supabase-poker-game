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
    position: sticky;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
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

/* Cookie button styling */
.cookie-button {
    position: sticky;
    width: 150px;
    height: 150px;
    background: none;
    border: none;
    cursor: pointer;
    margin-bottom: 1rem;
    transition: transform 0.15s ease-out;
}

.scale-110 {
    transform: scale(1.1);
}

.cookie-button img {
    position: sticky;
    width: 100%;
    height: 100%;
    object-fit: contain;
}

/* Small screens: phones */
@media (max-width: 600px) {
    h1 {
        font-size: 1.75rem;
    }

    p {
        font-size: 1.25rem;
    }

    .cookie-button {
        width: 100px;
        height: 100px;
    }
}

/* Medium screens: tablets */
@media (min-width: 601px) and (max-width: 1024px) {
    h1 {
        font-size: 2.25rem;
    }

    p {
        font-size: 1.5rem;
    }

    .cookie-button {
        width: 130px;
        height: 130px;
    }
}

/* Large screens: desktops */
@media (min-width: 1025px) {
    h1 {
        font-size: 3rem;
    }

    p {
        font-size: 2rem;
    }

    .cookie-button {
        width: 180px;
        height: 180px;
    }
}
</style>
