<template>
  <div>
    <button
      @click="showModal = true"
      class="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
    >
      Sign Up
    </button>

    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
    >
      <div class="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg w-96">
        <form @submit.prevent="logUser" class="max-w-sm mx-auto">
          <div class="mb-5">
            <label
              for="username"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your username
            </label>
            <input
              v-model="formData.username"
              type="text"
              id="username"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="mb-5">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              v-model="formData.password"
              type="password"
              id="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div class="flex justify-between">
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Submit
            </button>
            <button
              type="button"
              @click="showModal = false"
              class="text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Close
            </button>
          </div>
        </form>
        <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
        <p v-if="successMessage" class="text-green-500 text-sm mt-2">{{ successMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/plugins/supabase.js'

const showModal = ref(false)
const formData = ref({ username: '', password: '' })
const errorMessage = ref('')
const successMessage = ref('')

const logUser = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  const { data, error } = await supabase.auth.signUp({
    email: formData.value.username,
    password: formData.value.password,
  })

  if (error) {
    errorMessage.value = error.message
    return
  }

  if (data.user) {
    successMessage.value = 'Sign-up successful! Check your email for confirmation.'
    formData.value.username = ''
    formData.value.password = ''
    showModal.value = false
  }
}
</script>

<style scoped></style>
