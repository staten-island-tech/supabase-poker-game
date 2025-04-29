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
import { computed } from 'vue'
import { supabase } from '@/plugins/supabase.js'

const props = defineProps({
  cart: Array
})

const totalChips = computed(() =>
  props.cart.reduce((sum, item) => sum + item.chips * (item.quantity || 1), 0)
)

const totalPrice = computed(() =>
  props.cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
)

const handlePurchase = async () => {
  if (props.cart.length === 0) {
    console.log('Your cart is empty!')
    return
  }

  const { data: { session } } = await supabase.auth.getSession()
  const user = session?.user

  if (!user) {
    console.log('You need to be logged in to make a purchase.')
    return
  }

  const { data: userData, error: userFetchError } = await supabase
    .from('users')
    .select('money')
    .eq('id', user.id)
    .single()

  if (userFetchError || !userData) {
    console.error('Failed to fetch user data:', userFetchError?.message)
    return
  }

  const chipsToAdd = props.cart.reduce((sum, item) => sum + item.chips * (item.quantity || 1), 0)
  const newBalance = userData.money + chipsToAdd

  const { error: updateError } = await supabase
    .from('users')
    .update({ money: newBalance })
    .eq('id', user.id)

  if (updateError) {
    console.error('Error updating chips:', updateError.message)
    return
  }

  props.cart.length = 0
  console.log('Purchase successful! Chips added.')
  refreshPage()
}

const refreshPage = () => {
  window.location.reload()
}
</script>

<style scoped>
</style>
