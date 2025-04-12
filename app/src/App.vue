<template>
  <div class="w-full sticky top-0 bg-white z-10">
    <NavBar />
  </div>
  <RouterView />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue';
import JoinTables from './components/Game/JoinTables.vue';
</script>

<style scoped></style>