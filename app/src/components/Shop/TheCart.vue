<template>
    <div class="col-span-full mt-10 bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
      <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-white">Shopping Cart</h2>
      <ul class="mb-4">
        <li v-for="(item, index) in cart" :key="index" class="text-gray-800 dark:text-white">
          {{ item.name }} - {{ item.chips }} chips - ${{ item.price.toFixed(2) }}
        </li>
      </ul>
      <p class="font-semibold text-gray-900 dark:text-white">Total Chips: {{ totalChips }}</p>
      <p class="font-semibold text-gray-900 dark:text-white mb-4">Total Price: ${{ totalPrice.toFixed(2) }}</p>
      <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
        Checkout
      </button>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  const props = defineProps({
    cart: Array
  })
  
  const totalChips = computed(() =>
    props.cart.reduce((sum, item) => sum + item.chips, 0)
  )
  
  const totalPrice = computed(() =>
    props.cart.reduce((sum, item) => sum + item.price, 0)
  )
  </script>
  