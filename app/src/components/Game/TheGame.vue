<template>
    <div class="game-wrapper">
        <h1>💰 Money Clicker Game</h1>
        <p>You have: <strong>{{ money }}</strong> money</p>

        <!-- Button to Earn Money -->
        <button @click="incrementMoney" class="cookie-button">
            <img src="/images/cookie.png" alt="cookie" class="w-100 h-100" />
        </button>

        <!-- Cashout Component -->
        <Cashout :onCashOut="cashOut" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Cashout from './Cashout.vue'



const money = ref(0)

function incrementMoney() {
    money.value += 1
}

function cashOut() {
    money.value = 0
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