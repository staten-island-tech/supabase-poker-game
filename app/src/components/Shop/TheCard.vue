<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-64">
    <img :src="item.image" alt="Item Image" class="w-full h-40 object-cover rounded-md mb-4" />
    <h3 class="text-lg font-semibold text-gray-800 dark:text-white">{{ item.name }}</h3>
    <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.chips }} chips</p>
    <p class="text-md font-bold text-blue-600 dark:text-blue-400">${{ item.price.toFixed(2) }}</p>
    <button
      @click="$emit('add-to-cart', item)"
      class="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg"
    >
      Add to Cart
    </button>
  </div>
</template>

<script setup>
defineProps({
  item: Object
})
defineEmits(['add-to-cart'])
</script>
