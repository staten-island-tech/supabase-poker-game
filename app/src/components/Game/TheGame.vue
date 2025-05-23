<template>
  <div class="flex flex-col items-center justify-center h-screen font-sans text-center px-4">
    <h1 class="text-4xl sm:text-5xl mb-2">💰 Money Clicker Game</h1>
    <p class="text-xl sm:text-2xl mb-4">
      You have: <strong>{{ money }}</strong> money
    </p>
    <button
      @click="incrementMoney"
      @mousedown="isClicked = true"
      @mouseup="isClicked = false"
      @mouseleave="isClicked = false"
      :class="{ 'scale-110': isClicked }"
      class="transition-transform duration-150 ease-out mb-4 w-40 h-40 sm:w-[500px] sm:h-[500px] bg-none border-none cursor-pointer"
    >
      <img src="/images/cookie.png" alt="cookie" class="w-full h-full object-contain" />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isClicked = ref(false)
const money = ref(0)

onMounted(() => {
  const storedMoney = localStorage.getItem('money')
  if (storedMoney) {
    money.value = parseInt(storedMoney, 10)
  }
})

function incrementMoney() {
  money.value += 1
  localStorage.setItem('money', money.value)
}
</script>
