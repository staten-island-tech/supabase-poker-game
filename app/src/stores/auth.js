import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser()
    user.value = data?.user ?? null
  }

  const signIn = async ({ email, password }) => {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    user.value = data.user
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  const isAuthenticated = () => !!user.value

  return { user, fetchUser, signIn, signOut, isAuthenticated }
})
