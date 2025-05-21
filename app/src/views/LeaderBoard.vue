<template>
  <div class="max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 mq-medium-padding">
    <h2 class="text-4xl font-bold text-center text-gray-800 mb-8 mq-large-heading mq-small-text">
      🏆 Leaderboard
    </h2>

    <div
      v-if="leaderboard.length > 0"
      class="overflow-x-auto rounded-lg shadow-md bg-white"
      style="overflow-y: hidden; scrollbar-width: none;"
    >
      <table class="min-w-full divide-y divide-gray-200 table-auto">
        <thead class="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
          <tr>
            <th class="px-6 py-3 text-left">Rank</th>
            <th class="px-6 py-3 text-left">Username</th>
            <th class="px-6 py-3 text-left mq-hide-on-mobile">Chips</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 text-gray-800">
          <tr
            v-for="(player, index) in leaderboard"
            :key="player.username"
            :class="{ 'first-place': index === 0 }"
            class="leaderboard-entry"
          >
            <td class="px-6 py-4 font-medium">
              <span v-if="index === 0">🥇</span>
              <span v-else-if="index === 1">🥈</span>
              <span v-else-if="index === 2">🥉</span>
              <span v-else>#{{ index + 1 }}</span>
            </td>
            <td class="px-6 py-4 truncate max-w-[200px]">{{ player.username }}</td>
            <td
              class="px-6 py-4 text-green-600 font-semibold mq-hide-on-mobile"
              :id="'score-' + index"
            >
              {{ animatedScores[index] }}
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
import { ref, onMounted, nextTick } from 'vue'
import { supabase } from '@/plugins/supabase'
import { gsap } from 'gsap'

const leaderboard = ref([])
const animatedScores = ref([])

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
  animatedScores.value = data.map(() => 0)

  await nextTick()

  gsap.from('.leaderboard-entry', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
  })

  data.forEach((player, index) => {
    const obj = { val: 0 }
    gsap.to(obj, {
      val: player.money,
      duration: 1.5,
      ease: 'power1.out',
      onUpdate: () => {
        animatedScores.value[index] = Math.floor(obj.val)
      },
    })
  })

  gsap.to('.first-place', {
    scale: 1.05,
    repeat: -1,
    yoyo: true,
    duration: 0.8,
    ease: 'sine.inOut',
  })
})
</script>

<style scoped>
/* Hide horizontal scrollbar completely */
::-webkit-scrollbar {
  height: 0px;
}
</style>
