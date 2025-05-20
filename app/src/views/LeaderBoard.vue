<template>
  <div class="max-w-2xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 mq-medium-padding">
    <h2 class="text-3xl font-bold text-center text-gray-800 mb-6 mq-large-heading mq-small-text">
      🏆 Leaderboard
    </h2>

    <div v-if="leaderboard.length > 0" class="overflow-x-auto rounded-lg shadow-md bg-white">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
          <tr>
            <th class="px-6 py-3 text-left">Rank</th>
            <th class="px-6 py-3 text-left">Username</th>
            <th class="px-6 py-3 text-left mq-hide-on-mobile">Chips</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 text-gray-800">
          <tr v-for="(player, index) in leaderboard" :key="player.username">
            <td class="px-6 py-4 font-medium">
              <span v-if="index === 0">🥇</span>
              <span v-else-if="index === 1">🥈</span>
              <span v-else-if="index === 2">🥉</span>
              <span v-else>#{{ index + 1 }}</span>
            </td>
            <td class="px-6 py-4">{{ player.username }}</td>
            <td class="px-6 py-4 text-green-600 font-semibold mq-hide-on-mobile">
              {{ player.money }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center text-gray-500 mt-6 mq-small-text">
      No players found on the leaderboard.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/plugins/supabase'

const leaderboard = ref([])

onMounted(async () => {
  const { data, error } = await supabase
    .from('users')
    .select('username, money')
    .order('money', { ascending: false })
    .limit(10)

  if (error) {
    console.error('Failed to load leaderboard:', error)
    return
  }

  leaderboard.value = data
})
</script>

<style scoped></style>
