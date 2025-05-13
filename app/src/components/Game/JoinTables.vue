<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
    <h2 class="text-2xl font-semibold text-center mb-4 text-gray-900 dark:text-white">
      Join a Poker Room
    </h2>
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
import { useAuthStore } from '@/stores/auth/auth'
import { useUserStore } from '@/stores/auth/user'
import { useRoomStore } from '@/stores/auth/room'
import { useRouter } from 'vue-router'

const roomCode = ref('')
const error = ref('')
const authStore = useAuthStore()
const userStore = useUserStore()
const roomStore = useRoomStore()
const router = useRouter()

// Handle joining an existing room
const joinRoom = async () => {
  error.value = ''
  
  // Fetch the logged-in user
  await authStore.fetchUser()
  const user = authStore.user

  if (!user) {
    error.value = 'You must be logged in to join a room.'
    return
  }

  // Load user data
  await userStore.loadUserData(user.id)
  const { id, username, money } = userStore.userData || {}

  try {
    // Try to join the room using the room code
    await roomStore.joinRoom(id, username, money, roomCode.value.toUpperCase())
    await roomStore.loadMembers(roomStore.currentRoom.id)  // Load room members
    
    // Route to the correct room's game view
    router.push(`/PlayGame/${roomStore.currentRoom.code}`)
  } catch (err) {
    console.error(err)
    error.value = 'Invalid room code or unable to join room.'
  }
}
</script>
