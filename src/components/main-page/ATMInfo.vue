<script setup lang="ts">
import { ATM, generateDescriptions } from '~/models/atm/atm'



defineProps<{ atm: ATM }>()



</script>

<template>
  <div class="flex flex-col heightWithoutNavbar gap-8">
    <div class="flex-[0_0_0]">
      <div class="">
        <div class="items-start justify-between">
          <div>
            <div class="relative h-40 sm:h-56 m:p-0">
              <img
                class="absolute h-full w-full object-fit"
                src="https://pr1.nicelocal.com.mx/MTxp7ucjC9wfA7uB3GpXvw/1280x720,q85/4px-BW84_n0QJGVPszge3NRBsKw-2VcOifrJIjPYFYkOtaCZxxXQ2ZQuIUACsUll0sz6N9tBE4x2xAUZ82C250mTSD4ma7Fn0Yoc3WwtQwga72mWVUaMfA"
                alt=""
              />
            </div>
            <!-- Title -->
            <!-- <h2 class="text-lg font-medium text-gray-900">
                          {{ title }}
                        </h2> -->
            <!-- <p class="text-sm font-medium text-gray-500">3.9 MB</p> -->
          </div>
        </div>
      </div>

      <div class="px-8 flex flex-col g-2 pt-8">
        <div class="flex-auto gap-4 grid">
          <div class="flex gap-2">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-600 text-white-800"
            >
              ACTIVO
            </span>
            <h3 class="font-medium text-gray-900">CAJERO {{ atm.sitio }}</h3>
          </div>
          <div class="flex gap-2 items-center">
            <div class="flex-none self-stretch">
              <svg
                class="w-6 h-full"
                fill="black"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-black">
                {{ atm.calle }}, Col. {{ atm.colonia }}, Num. {{ atm.numExt }},
                {{ atm.colonia }}, {{ atm.delMuni }}
              </p>
            </div>
          </div>

          <div class="flex gap-2">
            <div
              class="flex-1 text-black flex items-center rounded p-2 justify-center bg-light-blue-200"
            >
              <div class="i-mdi:walk"> 

              </div>
            </div>
            <div
              class="flex-1 text-black flex items-center rounded justify-center bg-light-blue-200"
            >
              <div class="i-mdi:car">

              </div>
            </div>
            <div
              class="flex-1 text-black flex items-center rounded justify-center bg-light-blue-200"
            >
              <div class="i-mdi:bus"></div>
            </div>
            <div
              class="flex-1 text-black flex items-center rounded justify-center bg-light-blue-200"
            >
              <div class="i-mdi:bicycle"></div>
            </div>
          </div>

          <div
            class="py-2 border-t border-b flex justify-between px-2 border-gray"
          >
            <p class="text-black">Alertas</p>
            <button class="text-black text-center">+</button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-y-scroll px-8 pb-4 grid gap-4 scrollbarHidden">
      <Alert />
    </div>

    <div class="flex flex-[0_0_0] h-30 pb-8">
      <button
        type="button"
        class="flex-auto rounded-md border border-transparent bg-indigo-600 py-2 mx-8 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        @click="$parent.$emit('close')"
      >
        OK
      </button>
    </div>
  </div>
</template>
