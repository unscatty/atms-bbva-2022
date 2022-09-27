<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map'

const center = ref({ lat: 40.689247, lng: -74.044502 })
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const gmaps = (ref(null) as unknown) as google.maps.Map

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const geoPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        center.value = geoPosition
        // gmaps.setCenter(center.value)
      },
      error => console.error(error),
    )
  }
}
</script>

<template>
  <GoogleMap ref="gmaps" :api-key="API_KEY" style="width: 100%; height: 500px" :center="center" :zoom="15">
    <Marker :options="{ position: center }" />
  </GoogleMap>
  <div class="btn" @click="getLocation">
    Get current location
  </div>
</template>

