<script setup lang="ts">
import { ATM, generateDescriptions } from '~/models/atm/atm'

defineProps<{ atm: ATM }>()
</script>

<template>
  <div>
    <h3 class="font-medium text-gray-900">Información</h3>
    <dl class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
      <div
        v-for="(description, index) in generateDescriptions(atm)"
        :key="index"
        class="flex justify-between py-3 text-sm font-medium"
      >
        <dt class="text-gray-500">{{ description.name }}</dt>
        <dd class="text-gray-900">{{ description.value }}</dd>
      </div>
    </dl>
  </div>
</template>
