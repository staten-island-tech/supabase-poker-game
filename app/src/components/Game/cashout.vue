<template>
  <button
    @click="handleCashOut"
    class="mt-4 px-8 py-4 text-xl bg-red-600 text-white rounded-lg cursor-pointer transition-colors duration-300 hover:bg-red-700 border-none"
  >
    💸 Cash Out
  </button>
</template>

<script setup>
import { useUserStore } from '@/stores/auth/user'
import { supabase } from '@/plugins/supabase.js'
import { ref } from 'vue'

const props = defineProps({
  onCashOut: Function,
})

const userStore = useUserStore()

async function handleCashOut() {
  try {
    const localMoneyRaw = localStorage.getItem('money') || '0'
    const localMoney = parseInt(localMoneyRaw, 10)

    if (localMoney === 0) {
      return
    }

    const multiplier = userStore.userData.multiplier ?? 1

    const multipliedMoney = Math.floor(localMoney * multiplier)

    const updatedMoney = userStore.userData.money + multipliedMoney

    const { data, error } = await supabase
      .from('users')
      .update({ money: updatedMoney })
      .eq('id', userStore.userData.id)

    if (error) {
      console.error('Supabase update error:', error)
      return
    }

    localStorage.setItem('money', '0')
    userStore.userData.money = updatedMoney

    props.onCashOut?.()

    window.location.reload()
  } catch (error) {
    console.error('Error during cashout:', error)
  }
}
</script>
