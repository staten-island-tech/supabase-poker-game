import { defineStore } from 'pinia'
import { supabase } from '@/plugins/supabase'

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: null
  }),
  actions: {
    async loadUserData(userId) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Failed to load user data:', error)
        throw error
      }

      this.userData = data
    }
  }
})
