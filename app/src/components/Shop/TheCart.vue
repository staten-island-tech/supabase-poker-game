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
      <button
        @click="handlePurchase"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Checkout
      </button>
    </div>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue'
  import { supabase } from '@/plugins/supabase.js'  // Assuming you've already set up supabase.js
  
  // Props
  const props = defineProps({
    cart: Array
  })
  
  // Computed properties for total chips and total price
  const totalChips = computed(() =>
    props.cart.reduce((sum, item) => sum + item.chips, 0)
  )
  
  const totalPrice = computed(() =>
    props.cart.reduce((sum, item) => sum + item.price, 0)
  )
  
  // Handle purchase logic (adding chips to the user's account)
  const handlePurchase = async () => {
    if (props.cart.length === 0) {
      console.log('Your cart is empty!')
      return
    }
  
    const user = (await supabase.auth.getUser()).user  // Get the logged-in user
  
    if (!user) {
      console.log('You need to be logged in to make a purchase.')
      return
    }
  
    // Calculate the total chips from the cart
    const chipsToAdd = props.cart.reduce((sum, item) => sum + item.chips * item.quantity, 0)
  
    // Update the user's money column (assuming it's used to store chips) in Supabase
    const { error: updateChipsError } = await supabase
      .from('users')
      .update({ money: supabase.raw('money + ?', [chipsToAdd]) })  // Increment money (chips)
      .eq('id', user.id)
  
    if (updateChipsError) {
      console.error('Error adding chips:', updateChipsError.message)
      return
    }
  
    // Clear the cart after successful purchase
    props.cart.length = 0
    console.log('Chips added successfully!')
  }
  </script>
  
  <style scoped>
  /* You can add custom styles here */
  </style>
  