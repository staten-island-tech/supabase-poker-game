<template>
    <button @click="handleCashOut" class="cashout-button">
        💸 Cash Out
    </button>
</template>

<script setup>
import { useUserStore } from '@/stores/auth/user'
import { supabase } from '@/plugins/supabase.js'
import { ref } from 'vue'

const props = defineProps({
    onCashOut: Function
})

const userStore = useUserStore()

async function handleCashOut() {
    try {
        const localMoney = localStorage.getItem('money') || 0

        if (localMoney === '0' || !localMoney) {
            return
        }

        const updatedMoney = userStore.userData.money + parseInt(localMoney)

        const { data, error } = await supabase
            .from('users')
            .update({ money: updatedMoney })
            .eq('id', userStore.userData.id)

        if (error) {
            return
        }

        localStorage.setItem('money', 0)

        userStore.userData.money = updatedMoney

        props.onCashOut?.()

        window.location.reload()

    } catch (error) {
        console.error('Error during cashout:', error)
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
