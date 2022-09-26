<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map'
const center = { lat: 40.689247, lng: -74.044502 }
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
</script>

<template>
  <GoogleMap :api-key="API_KEY" style="width: 100%; height: 500px" :center="center" :zoom="15">
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

