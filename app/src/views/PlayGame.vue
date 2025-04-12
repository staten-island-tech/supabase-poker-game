<template>
  <div>
    <br>
    <JoinTables />
    <br>
    <CreateTable/>
  </div>
  <RouterView />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import JoinTables from '@/components/Game/JoinTables.vue';
import CreateTable from '@/components/Game/CreateTable.vue';
</script>

<style scoped></style>