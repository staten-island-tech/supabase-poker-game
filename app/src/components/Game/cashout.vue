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
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    background-color: #dc3545;
    color: white;
    padding: 1rem 2rem;
    font-size: 1.25rem;
    border: none;
    border-radius: 0;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.15);
}


/* Hover effect */
.cashout-button:hover {
    background-color: #c82333;
}

/* Small screens: phones */
@media (max-width: 600px) {
    .cashout-button {
        font-size: 1rem;
        padding: 0.75rem 1.5rem;
        margin-top: 1rem;
    }
}

/* Medium screens: tablets */
@media (min-width: 601px) and (max-width: 1024px) {
    .cashout-button {
        font-size: 1.15rem;
        padding: 0.9rem 1.75rem;
        margin-top: 2rem;
    }
}

/* Large screens: desktops */
@media (min-width: 1025px) {
    .cashout-button {
        font-size: 1.25rem;
        padding: 1rem 2rem;
        margin-top: 3rem;
    }
}
</style>
