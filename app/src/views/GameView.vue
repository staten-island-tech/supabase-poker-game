<template>
    <div>
        <TheGame :money="money" @increment="incrementMoney" />
        <Cashout @cash-out="cashOut" />
        <TheUpgrade/>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import TheGame from '@/components/Game/TheGame.vue'
import Cashout from '@/components/Game/Cashout.vue'
import TheUpgrade from '@/components/Game/TheUpgrade.vue'

const money = ref(0)

function incrementMoney() {
    money.value += 1
}

function cashOut() {
    money.value = 0
}
</script>