<template>
  <div>
    <NavBar/>
    <br>
  </div>
  <RouterView />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue';
</script>

<style scoped>

</style>