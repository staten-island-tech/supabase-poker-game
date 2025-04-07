<template>
  <button
    @click="$emit('open-modal')"
    class="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
  >
    Sign Up
  </button>
</template>

<script setup>
defineEmits(['open-modal'])
</script>

<style scoped></style>
