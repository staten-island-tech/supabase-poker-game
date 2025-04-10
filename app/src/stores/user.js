import { defineStore } from 'pinia'
import { supabase } from '@/plugins/supabase'

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: null
  }),
  actions: {
    async loadUserData(userId) {
      const { data } = await supabase.from('users').select('*').eq('id', userId).single()
      this.userData = data
    }
  }
})
