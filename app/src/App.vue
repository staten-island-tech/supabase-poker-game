<template>
  <div class="w-full sticky top-0 bg-white z-10">
    <NavBar />
  </div>
  <RouterView />
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>

<style scoped></style>
