<template>
    <button @click="onCashOutClick" class="cashout-button">
        💸 Cash Out
    </button>
</template>

<script setup>
import { useUserStore } from '@/stores/auth/user'
import { handleCashOut } from './cashout.js'


const props = defineProps({
    onCashOut: Function
})

const userStore = useUserStore()

async function onCashOutClick() {
    const result = await handleCashOut(userStore)

    if (result.success) {
        props.onCashOut?.()
        window.location.reload()
    } else {
        console.warn('Cash out failed:', result.message)
    }
}
</script>

<style scoped>
.cashout-button {
    padding: 1rem 2rem;
    font-size: 1.25rem;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s ease;
    margin-top: 1rem;
}

.cashout-button:hover {
    background-color: #c82333;
}
</style>