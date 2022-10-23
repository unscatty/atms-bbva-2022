<!-- eslint-disable no-unused-vars -->
<script setup lang="ts">
import { ATM, generateDescriptions } from '~/models/atm/atm'
import { ref } from 'vue'

defineProps<{ atm: ATM }>()

<<<<<<< Updated upstream
const emit = defineEmits<{
  (e: 'close'): void
  (
    e: 'select-travel-mode',
    travelMode: keyof typeof google.maps.TravelMode
  ): void
}>()

const travelButtons: Array<{
  mode: keyof typeof google.maps.TravelMode
  icon: string
}> = [
  {
    mode: 'WALKING',
    icon: 'i-mdi:walk',
  },
  {
    mode: 'DRIVING',
    icon: 'i-mdi:car',
  },
  {
    mode: 'TRANSIT',
    icon: 'i-mdi:bus',
  },
  {
    mode: 'BICYCLING',
    icon: 'i-mdi:bicycle',
  },
]
=======
const emit = defineEmits(['close'])
const alert = ref(false)

const createAlert = () => {
  alert.value = true
}

const closeAlert = () => {
  alert.value = false
}
>>>>>>> Stashed changes
</script>

<template>
  <div
    v-show="alert"
    class="fixed top-0 left-0 w-100vw h-100vh bg-[#c9c4c4c4] z-100000 rounded p-4"
  >
    <div
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-auto bg-neutral-100 z-100000 rounded p-4"
    >
      <h1 class="text-1xl pb-2 border-b-2 mb-2">Nueva alerta</h1>
      <div class="pb-4">
        <label for="location" class="block text-sm font-medium text-gray-700"
          >Cajero</label
        >
        <select
          id="location"
          name="location"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option selected="">{{ atm.sitio }}</option>
        </select>
      </div>
      <div class="pb-4">
        <label for="location" class="block text-sm font-medium text-gray-700"
          >Tipo</label
        >
        <select
          id="location"
          name="location"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option selected="" value="Sugerencia" class="text-black">
            Sugerencia
          </option>
          <option selected="" value="Advertencia" class="text-black">
            Advertencia
          </option>
        </select>
      </div>
      <div pb-4>
        <label for="comment" class="block text-sm font-medium text-gray-700"
          >Agrega tu alerta</label
        >
        <div class="mt-1">
          <textarea
            rows="4"
            name="comment"
            id="comment"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
      <div class="flex justify-end gap-4">
        <button
          @click="closeAlert"
          type="button"
          class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancelar
        </button>
        <button
          type="button"
          class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Crear Alerta
        </button>
      </div>
    </div>
  </div>

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
              class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-600 text-light"
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

          <div class="py-1 border-y flex justify-between px-2 border-gray">
            <p class="text-black">Rutas</p>
          </div>
          <div class="flex justify-between w-full">
            <button
              v-for="travelButton in travelButtons"
              :key="travelButton.mode"
              type="button"
              class="inline-flex items-center px-6 py-1 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-blue-600"
              @click="emit('select-travel-mode', travelButton.mode)"
            >
              <div :class="travelButton.icon"></div>
            </button>
          </div>

          <div
            class="py-2 border-t border-b flex justify-between px-2 border-gray"
          >
            <p class="text-black">Alertas</p>
            <div
              class="i-heroicons-plus-circle-20-solid"
              :onClick="createAlert"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col flex-1 overflow-y-scroll px-8 pb-4 grid gap-4 scrollbarHidden">
      <Alert />
    </div>

    <div class="flex flex-[0_0_0] h-30 pb-8">
      <button
        type="button"
        class="flex-auto rounded-md border border-transparent bg-indigo-600 py-2 mx-8 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        @click="emit('close')"
      >
        OK
      </button>
    </div>
  </div>
</template>

function ref(arg0: boolean) { throw new Error('Function not implemented.') }
