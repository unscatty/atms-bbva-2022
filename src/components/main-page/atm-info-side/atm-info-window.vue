<script setup lang="ts">
import {
  Dialog as ModalDialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { ATM, generateDescriptions } from '~/models/atm/atm'

defineProps<{ atm: ATM; show: boolean }>()

const emit = defineEmits(['close'])

const close = () => emit('close')
</script>

<template>
  <TransitionRoot as="template" :show="show">
    <ModalDialog as="div" class="fixed inset-0 overflow-hidden" @close="close">
      <div class="absolute inset-0 overflow-hidden">
        <TransitionChild
          as="template"
          enter="ease-in-out duration-500"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in-out duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>
        <div
          class="pointer-events-none fixed flex max-w-full w-full bottom-0 md:inset-y-0 md:right-0 md:flex-row-reverse"
        >
          <TransitionChild
            as="template"
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enter-from="translate-y-full md:translate-x-full md:translate-y-0"
            enter-to="translate-y-0 md:translate-x-0 md:translate-y-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leave-from="translate-y-0 md:translate-x-0 md:translate-y-0"
            leave-to="translate-y-full md:translate-x-full md:translate-y-0"
          >
            <div class="pointer-events-auto relative w-full md:w-96">
              <div class="h-full overflow-y-auto bg-white p-8 rounded-t-5 md:rounded-none">
                <div class="space-y-6 pb-16">
                  <div>
                    <div class="mt-4 flex items-start justify-between">
                      <div>
                        <!-- Title -->
                        <h2 class="text-lg font-medium text-gray-900">
                          IMG_4985.HEIC
                        </h2>
                        <p class="text-sm font-medium text-gray-500">3.9 MB</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 class="font-medium text-gray-900">Information</h3>
                    <dl
                      class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200"
                    >
                      <div
                        v-for="(description, index) in generateDescriptions(
                          atm
                        )"
                        :key="index"
                        class="flex justify-between py-3 text-sm font-medium"
                      >
                        <dt class="text-gray-500">{{ description.name }}</dt>
                        <dd class="text-gray-900">{{ description.value }}</dd>
                      </div>
                    </dl>
                  </div>
                  <div class="flex">
                    <button
                      type="button"
                      class="flex-1 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      @click="close"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </ModalDialog>
  </TransitionRoot>
</template>
