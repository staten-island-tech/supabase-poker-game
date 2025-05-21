<template>
    <div class="game-wrapper">
        <!-- Money Display Section -->
        <h1>💰 Money Clicker Game</h1>
        <p>You have: <strong>{{ money }}</strong> money</p>

        <!-- Button to Earn Money -->
        <button @click="incrementMoney" class="">
            <img src="/images/cookie.png" alt="cookie" class="w-100 h-100" />
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// State to track the money
const money = ref(0)

// Function to increment money when the user clicks the button
function incrementMoney() {
    money.value += 1
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

.click-button {
    padding: 1rem 2rem;
    font-size: 1.5rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.click-button:hover {
    background-color: #218838;
}
</style>