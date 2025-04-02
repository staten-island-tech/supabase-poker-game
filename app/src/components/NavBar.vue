<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <img class="h-8 w-auto" src="/images/poker.png" alt="Logo" />
        </div>
        <div class="flex space-x-4">
          <SignUp/>
          <RouterLink to="/" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
            >Home</RouterLink
          >
          <RouterLink
            to="/about"
            class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
            >About</RouterLink
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SignUp from './signup/SignUp.vue';
</script>

<style scoped></style>
