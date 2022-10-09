<script setup lang="ts">
import type { Ref } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'
import { haversine_distance } from '~/utils/distance'

const center: Ref<google.maps.LatLngLiteral> = ref({ lat: 19.43302471023951, lng: -99.13224809885025 })
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const gmaps = (ref(null) as unknown) as google.maps.Map
const currentPosition: Ref<GeolocationPosition> = ref({}) as unknown as Ref<GeolocationPosition>
const locations: Ref<GeolocationPosition[]> = ref([])
const remoteLocation = ref(center.value)
const distanceCalculated = ref(0)
const distanceAPI = ref(0)
let distanceService: google.maps.DistanceMatrixService

// const remoteMarker = ref(null) as unknown as Ref<{ marker: google.maps.Marker }>
const remoteMarker = ref<{ marker: google.maps.Marker }>() as unknown as Ref<{ marker: google.maps.Marker }>

const positionCallback = (position: GeolocationPosition) => {
  const geoPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  }

  // center.value = geoPosition
  currentPosition.value = position
  remoteLocation.value = { lat: geoPosition.lat + 0.005, lng: geoPosition.lng + 0.005 }
  locations.value.push(position)
  // gmaps.setCenter(center.value)
  console.log('location has changed')
}

const calculateDistance = () => {
  // remoteMarker.value.
  console.log(`remote marker position: ${remoteMarker.value.marker.getPosition()}`)
  distanceCalculated.value = haversine_distance(new google.maps.LatLng(center.value), remoteMarker.value.marker.getPosition()!)
  distanceService.getDistanceMatrix({
    origins: [center.value],
    destinations: [remoteMarker.value.marker.getPosition()!],
    travelMode: google.maps.TravelMode.WALKING,
    unitSystem: google.maps.UnitSystem.METRIC,
  }, (response, status) => {
    console.debug(response)
    distanceAPI.value = response?.rows[0].elements[0].distance.value || 0
  })
}

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      positionCallback,
      error => alert(error),
      {
        enableHighAccuracy: true,
      },
    )
  }
  // else {
  //   alert('no geolocation')
  // }
}

onMounted(() => {
  distanceService = new google.maps.DistanceMatrixService()
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      positionCallback,
      error => alert(error),
      {
        enableHighAccuracy: true,
      },
    )
  }
  // else {
  //   alert('no geolocation')
  // }
})
</script>

<template>
  <GoogleMap ref="gmaps" :api-key="API_KEY" style="width: 100%; height: 500px" :center="center" :zoom="15">
    <Marker :options="{ position: center }" />
    <Marker ref="remoteMarker" :options="{ position: remoteLocation, draggable: true }" />
  </GoogleMap>
  <div class="btn" @click="getLocation">
    Get current location
  </div>
  <div class="btn" @click="calculateDistance">
    Calculate distance
  </div>
  <div class="text-dark-50">
    Distance calculated: {{ distanceCalculated }}
    <br>
    Distance google service: {{ distanceAPI }}
  </div>
  <ul>
    <li v-for="location in locations" :key="location.timestamp">
      Location Lat: {{ location.coords.latitude }}, Long: {{ location.coords.longitude }}
      Heading: {{ location.coords.heading }}
      timestamp: {{ location.timestamp }}
    </li>
  </ul>
</template>

