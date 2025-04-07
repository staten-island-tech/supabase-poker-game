<template>
  <div>
    <SignInButton @open-signin="showModal = true" />
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
    >
      <div class="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg w-96">
        <form @submit.prevent="signInUser" class="max-w-sm mx-auto">
          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              v-model="formData.email"
              type="email"
              id="email"
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
              Sign In
            </button>
            <SignUp/>
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
import SignInButton from './SignInButton.vue'
import { supabase } from '@/plugins/supabase.js'
import SignUp from './SignUp.vue'

const showModal = ref(false)
const formData = ref({ email: '', password: '' })
const errorMessage = ref('')
const successMessage = ref('')

const signInUser = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.value.email,
    password: formData.value.password,
  })

  if (error) {
    errorMessage.value = error.message
  } else {
    successMessage.value = 'Signed in successfully!'
    formData.value.email = ''
    formData.value.password = ''
    showModal.value = false
  }
}
</script>
