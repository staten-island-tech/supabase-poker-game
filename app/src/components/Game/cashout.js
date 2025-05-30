import { supabase } from '@/plugins/supabase.js'

export async function handleCashOut(userStore) {
  try {
    const localMoney = localStorage.getItem('money') || '0'

    if (localMoney === '0' || !localMoney) {
      return { success: false, message: 'No money to cash out' }
    }

    const updatedMoney = userStore.userData.money + parseInt(localMoney)

    const { error } = await supabase
      .from('users')
      .update({ money: updatedMoney })
      .eq('id', userStore.userData.id)

    if (error) {
      return { success: false, message: error.message }
    }

    localStorage.setItem('money', '0')
    userStore.userData.money = updatedMoney

    return { success: true }
  } catch (error) {
    console.error('Error during cashout:', error)
    return { success: false, message: error.message }
  }
}
