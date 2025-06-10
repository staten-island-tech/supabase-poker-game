import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'

export const useGameStore = defineStore('game', () => {
  const money = ref(0)
  const multiplier = ref(1)
  const upgradeLevel = ref(0)
  const userId = ref(null)

  const setUserId = (id) => {
    userId.value = id
  }

  const incrementMoney = async () => {
    money.value += 1 * multiplier.value
    await syncToSupabase()
  }

  const buyUpgrade = async () => {
    const cost = Math.floor(100 * Math.pow(1.8, upgradeLevel.value))
    if (money.value >= cost) {
      money.value -= cost
      upgradeLevel.value++
      multiplier.value = 1 + upgradeLevel.value
      await syncToSupabase()
      console.log('Upgrade purchased:', {
        money: money.value,
        upgradeLevel: upgradeLevel.value,
        multiplier: multiplier.value,
      })
    } else {
      console.log('Not enough money for upgrade')
    }
  }

  const syncToSupabase = async () => {
    if (!userId.value) {
      console.warn('No user ID set; skipping sync')
      return
    }
    const { error } = await supabase
      .from('users')
      .update({
        money: money.value,
        multiplier: multiplier.value,
        upgrade_level: upgradeLevel.value,
      })
      .eq('id', userId.value)

    if (error) {
      console.error('Error syncing game data:', error)
    } else {
      console.log('Game data synced successfully')
    }
  }

  const loadFromSupabase = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      console.warn('No logged-in user found')
      return
    }
    userId.value = user.id

    const { data, error } = await supabase
      .from('users')
      .select('money, multiplier, upgrade_level')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Error loading game data:', error)
      return
    }

    money.value = data?.money ?? 0
    multiplier.value = data?.multiplier ?? 1
    upgradeLevel.value = data?.upgrade_level ?? 0

    console.log('Loaded game data from Supabase:', {
      money: money.value,
      multiplier: multiplier.value,
      upgradeLevel: upgradeLevel.value,
    })
  }

  return {
    money,
    multiplier,
    upgradeLevel,
    incrementMoney,
    buyUpgrade,
    syncToSupabase,
    loadFromSupabase,
    setUserId,
  }
})
