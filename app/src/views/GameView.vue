<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-50 p-6">
    <div class="w-full max-w-lg flex justify-center gap-6 mb-8">
      <div class="flex-1 max-w-xs">
        <UpgradeButton />
      </div>
      <div class="flex-1 max-w-xs">
        <Cashout />
      </div>
    </div>
    <div class="w-full max-w-md flex justify-center">
      <TheGame />
    </div>
  </div>
</template>

<script setup>
import TheGame from '@/components/Game/TheGame.vue'
import Cashout from '@/components/Game/cashout.vue'
import UpgradeButton from '@/components/Game/UpgradeButton.vue'
</script>
