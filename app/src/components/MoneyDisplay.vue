<template>
  <div
    v-if="userStore.userData"
    class="flex items-center gap-2 px-4 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm"
  >
    <span class="text-m text-gray-600 dark:text-gray-300">💰</span>
    <span class="text-m font-medium text-gray-800 dark:text-white">${{ formattedMoney }}</span>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth/auth'
import { useUserStore } from '@/stores/auth/user'

const authStore = useAuthStore()
const userStore = useUserStore()

const formattedMoney = computed(() => {
  const money = userStore.userData?.money || 0
  return parseFloat(money).toFixed(2)
})

onMounted(async () => {
  await authStore.fetchUser()
  if (authStore.user) {
    await userStore.loadUserData(authStore.user.id)
  }
})
</script>
