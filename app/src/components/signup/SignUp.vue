<template>
  <div>
    <SignUpButton @open-modal="openModal" />
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
    >
      <div ref="modalRef" class="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg w-96 cursor-move">
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
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your username"
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
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div class="flex justify-between">
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import SignUpButton from './SignUpButton.vue';
import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';

gsap.registerPlugin(Draggable);

const showModal = ref(false);
const modalRef = ref(null);
const userLogs = ref([]);
const formData = ref({ username: '', password: '' });

const openModal = async () => {
  showModal.value = true;
  await nextTick();
  if (modalRef.value) {
    Draggable.create(modalRef.value, {
      type: 'x,y',
      edgeResistance: 0.65,
      bounds: window,
      inertia: true
    });
  }
};

const logUser = () => {
  userLogs.value.push({ ...formData.value });
  console.log(userLogs.value);
  formData.value.username = '';
  formData.value.password = '';
  showModal.value = false;
};
</script>

<style scoped>
.cursor-move {
  cursor: move;
}
</style>