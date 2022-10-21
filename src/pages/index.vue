<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map'
import type { ATM } from '~/models/atm/atm'
import { atmToLatLngLiteral } from '~/models/atm/atm'
// import atmService from '~/services/atms/api/api-atm.service'
import { defaultATMService as atmService } from '~/services/atms/atm.service'
import { toLatLngLiteral } from '~/utils/geolocation'
import styles from '~/styles/map-style'

const center = ref<google.maps.LatLngLiteral>({
  lat: 19.43302471023951,
  lng: -99.13224809885025,
})
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const gmaps = ref<InstanceType<typeof GoogleMap>>()
const currentPosition = ref<GeolocationPosition>()
// let distanceService: google.maps.DistanceMatrixService

let directionsServices: google.maps.DirectionsService
let directionsRenderer: google.maps.DirectionsRenderer

// const distanceAPI = ref(0)
let atmLocations = ref<ATM[]>([])

// Modal dialog
let modalOpen = ref(false)
let selectedATM = ref<ATM>()

const positionCallback = (position: GeolocationPosition) => {
  currentPosition.value = position

  center.value = toLatLngLiteral(currentPosition.value)

  console.log('location has changed')
}

const init = () => {
  // Initialize all values when Google Maps API script is fully loaded
  directionsServices = new google.maps.DirectionsService()
  directionsRenderer = new google.maps.DirectionsRenderer()
  directionsRenderer.setMap(gmaps.value?.map || null)
}

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      positionCallback,
      (error) => alert(error),
      {
        enableHighAccuracy: true,
      }
    )
  }
}

const getNearATMs = async (location: google.maps.LatLngLiteral) => {
  const bounds = new google.maps.LatLngBounds()

  // Add user location
  bounds.extend(center.value)

  try {
    atmLocations.value = await atmService.getClosestATMs(location, 10)

    atmLocations.value.forEach((atm) => bounds.extend(atmToLatLngLiteral(atm)))
  } catch (error) {
    console.error(error)
  }

  gmaps.value?.map?.fitBounds(bounds)
  gmaps.value?.map?.panToBounds(bounds)
}

const getRoute = async () => {
  await directionsServices.route(
    {
      origin: center.value,
      destination: atmToLatLngLiteral(atmLocations.value[0]),
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
    },
    function (result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result)
      }
    }
  )
}

const showATMInfo = (atm: ATM) => {
  selectedATM.value = atm

  modalOpen.value = true
}

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      positionCallback,
      (error) => alert(error),
      {
        enableHighAccuracy: true,
      }
    )
  }
})

const closeATMInfo = () => (modalOpen.value = false)

watch(
  () => gmaps.value?.ready,
  (ready) => {
    if (ready) {
      init()
    }
  }
)
</script>

<template>
  <GoogleMap
    ref="gmaps"
    :api-key="API_KEY"
    class="absolute w-full h-full"
    :center="center"
    :zoom="15"
    :styles="styles"
    language="es-MX"
  >
    <!-- @load="onMapsLoaded" -->
    <Marker
      :options="{
        position: center,
      }"
    />
    <Marker
      v-for="(location, index) in atmLocations"
      :key="index"
      :options="{ position: atmToLatLngLiteral(location) }"
      @click="showATMInfo(location)"
    />

    <InfoDialog
      title="Cajero Automático"
      :show="modalOpen"
      @close="closeATMInfo"
    >
      <ATMInfo :atm="selectedATM!" />
    </InfoDialog>
  </GoogleMap>
  <div class="fixed bottom-0 w-full">
    <div class="flex-inline items-center m-auto justify-start">
      <div class="btn m-2" @click="getLocation">Actualizar ubicación</div>
      <div class="btn m-2" @click="getNearATMs(center)">Cajeros cercanos</div>
      <div class="btn m-2" @click="getRoute()">Mostrar ruta</div>
      <RouterLink to="/asistente" class="btn m-2">Asistente</RouterLink>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: map
</route>
