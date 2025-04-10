<template>
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 class="text-2xl font-semibold text-center mb-4 text-gray-900 dark:text-white">Join a Poker Room</h2>
      <form @submit.prevent="joinRoom" class="flex flex-col gap-4">
        <input
          v-model="roomCode"
          type="text"
          placeholder="Enter Room Code"
          class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          required
        />
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Join Room
        </button>
        <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { useUserStore } from '@/stores/user'
  import { useRoomStore } from '@/stores/room'
  import { useRouter } from 'vue-router'
  
  const roomCode = ref('')
  const error = ref('')
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const roomStore = useRoomStore()
  const router = useRouter()
  
  const joinRoom = async () => {
    error.value = ''
  
    if (!authStore.user) {
      error.value = 'You must be logged in to join a room.'
      return
    }
  
    await userStore.loadUserData(authStore.user.id)
    const { id, username, money } = userStore.userData || {}
  
    try {
      await roomStore.joinRoom(id, username, money, roomCode.value.toUpperCase())
      await roomStore.loadMembers(roomStore.currentRoom.id)
      router.push('/PlayGame')
    } catch (err) {
      console.error(err)
      error.value = 'Invalid room code or unable to join room.'
    }
  }
  </script>
  