<script setup lang="ts">
import {
  ATMUserReport,
  generateDescriptionTitle,
} from '~/models/atm-user-report'

defineProps<{ alert: ATMUserReport }>()
</script>

<template>
  <div class="rounded-md bg-yellow-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <div
          class="i-heroicons-exclamation-triangle text-yellow-400"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-yellow-800">
          {{ generateDescriptionTitle(alert.kind) }}
        </h3>
        <div class="mt-2 text-sm text-yellow-700">
          <p>{{ alert.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
