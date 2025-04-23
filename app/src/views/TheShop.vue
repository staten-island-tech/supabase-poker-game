<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
    <TheCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      @add-to-cart="handleAddToCart"
    />
    <TheCart :cart="cart" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TheCard from '@/components/Shop/TheCard.vue'
import TheCart from '@/components/Shop/TheCart.vue'
import { items } from '@/components/Shop/Items'

const cart = ref([])

const handleAddToCart = (item) => {
  cart.value.push(item)
}
</script>