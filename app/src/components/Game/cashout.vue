<!-- src/components/Cashout.vue -->
<template>
    <button @click="cashOut" class="cashout-button">
        💸 Cash Out
    </button>
</template>

<script setup>
const props = defineProps({
    onCashOut: {
        type: Function,
        required: true,
    },
})

function cashOut() {
    props.onCashOut()
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