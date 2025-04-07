<template>
    <button
      @click="logOut"
      class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700"
    >
      Log Out
    </button>
  </template>
  
  <script setup>
  import { supabase } from '@/plugins/supabase.js'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const logOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Logout error:', error.message)
    } else {
      router.push('/')
    }
  }
  </script>
  
  <style scoped></style>
  