<template>
  <div>
    <NavBar />
  </div>
  <RouterView />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue';
import JoinTables from './components/JoinTables.vue';
</script>

<style scoped></style>