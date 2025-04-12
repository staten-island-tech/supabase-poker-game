<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
    <h2 class="text-2xl font-semibold text-center mb-4 text-gray-900 dark:text-white">
      Create a Poker Room
    </h2>
    <form @submit.prevent="createRoom" class="flex flex-col gap-4">
      <input
        v-model="roomName"
        type="text"
        placeholder="Room Name (optional)"
        class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      />
      <button
        type="submit"
        class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        Create Room
      </button>
      <p v-if="roomCode" class="text-green-500 text-sm mt-2">
        Room created! Code: <strong>{{ roomCode }}</strong>
      </p>
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

const roomName = ref('')
const roomCode = ref('')
const error = ref('')
const authStore = useAuthStore()
const userStore = useUserStore()
const roomStore = useRoomStore()
const router = useRouter()

// Generate a random room code
const generateRoomCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const code = Array.from({ length: 6 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length)),
  ).join('')

  console.log('Generated Room Code:', code) // Debugging line to check the generated code

  return code
}

// Create a room and handle logic
const createRoom = async () => {
  error.value = ''
  roomCode.value = ''

  if (!authStore.user) {
    error.value = 'You must be logged in to create a room.'
    return
  }

  // Load user data
  await userStore.loadUserData(authStore.user.id)
  const { id, username, money } = userStore.userData || {}

  // Generate room code
  const code = generateRoomCode()
  console.log('Room Code to be inserted:', code) // Debugging line to ensure code is passed correctly

  try {
    // Create the room with the generated code
    const room = await roomStore.createRoom(id, roomName.value || `${username}'s Room`, code)
    if (!room) {
      error.value = 'Failed to create the room. Please try again.'
      return
    }

    // Insert the user into the room with the correct room code
    await roomStore.joinRoom(id, username, money, room.code)

    // Reload members
    await roomStore.loadMembers(room.id)

    roomCode.value = room.code

    // Redirect to the game room
    router.push('/PlayGame')
  } catch (err) {
    console.error(err)
    error.value = 'Something went wrong creating the room.'
  }
}
</script>
