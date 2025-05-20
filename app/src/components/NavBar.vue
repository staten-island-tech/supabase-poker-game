<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 mq-sm:px-6 mq-lg:px-8">
      <div class="flex flex-wrap items-center justify-between gap-4 py-4">
        <!-- Logo + Money -->
        <div class="flex items-center gap-4 flex-shrink-0">
          <img class="h-8 w-auto" src="/images/poker.png" alt="Logo" />
          <MoneyDisplay />
        </div>

        <!-- Navigation buttons (wrap if needed) -->
        <div class="flex flex-wrap gap-2 justify-center mq-sm:justify-end">
          <SignIn />
          <RouterLink
            to="/"
            class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/Shop"
            class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
          >
            Shop
          </RouterLink>
          <RouterLink
            to="/PlayGame"
            class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
          >
            Play Game
          </RouterLink>
          <RouterLink
            to="/LeaderBoard"
            class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
          >
            Leader Board
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import SignIn from './signup/SignIn.vue'
import MoneyDisplay from './MoneyDisplay.vue'
</script>

<style scoped></style>
