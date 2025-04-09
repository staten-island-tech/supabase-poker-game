<template>
  <div>
    <JoinTables />
  </div>
  <RouterView />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import JoinTables from '@/components/JoinTables.vue';
</script>

<style scoped></style>