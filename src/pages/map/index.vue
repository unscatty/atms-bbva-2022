<script setup lang="ts">
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'
import { toLatLngLiteral } from '~/utils/geolocation'
import styles from './style'

const center = ref<google.maps.LatLngLiteral>({
  lat: 19.43302471023951,
  lng: -99.13224809885025,
})
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
// const gmaps = ref<google.maps.Map>()
const gmaps = ref<InstanceType<typeof GoogleMap>>()
const currentPosition = ref<GeolocationPosition>()
let distanceService: google.maps.DistanceMatrixService

let directionsServices: google.maps.DirectionsService
let directionsRenderer: google.maps.DirectionsRenderer

const distanceAPI = ref(0)
let atmLocations = ref<any[]>([])

const infoWindow = ref<InstanceType<typeof InfoWindow>>()

const positionCallback = (position: GeolocationPosition) => {
  currentPosition.value = position

  center.value = toLatLngLiteral(currentPosition.value)

  console.log('location has changed')
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

const getNearATMs = async (position: google.maps.LatLngLiteral) => {
  const now = new Date()

  const bodyParams = {
    metodo: 'getPuntos',
    latitud: position.lat,
    longitud: position.lng,
    idOpcionCatalogo: 11,
    idOpcionAtributo: 14,
    dia: now.getDay(),
    hora: '0:0',
    ubicacion: 1,
    direccion: 0,
    // fecha: now.toString(),
  }

  const formBody = []
  for (var property in bodyParams) {
    var encodedKey = encodeURIComponent(property)
    var encodedValue = encodeURIComponent(bodyParams[property])
    formBody.push(encodedKey + '=' + encodedValue)
  }

  try {
    const apiResponse = await fetch(
      'https://www.strategis.mx/Glocator/common/services/Buscador.ashx',
      {
        body: formBody.join('&'),
        method: 'POST',

        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      }
    )

    const { Obj: data } = await apiResponse.json()
    console.log(data)

    const bounds = new google.maps.LatLngBounds()

    atmLocations.value = data.map((val: any) => {
      const latlng = {
        lat: parseFloat(val.Latitud),
        lng: parseFloat(val.Longitud),
      } as google.maps.LatLngLiteral

      bounds.extend(latlng)

      return {
        ...val,
        latlng,
      }
    })

    console.log(atmLocations.value)

    gmaps.value?.map?.fitBounds(bounds)
    gmaps.value?.map?.panToBounds(bounds)
  } catch (error) {
    console.error(error)
  }
}

const getRoute = async () => {
  await directionsServices.route(
    {
      origin: center.value,
      destination: atmLocations.value[0].latlng,
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

const setMarkerInfo = (location: any) => {
  infoWindow.value?.infoWindow?.setContent(
    `${Math.round(location.Distancia)} metros`
  )
  infoWindow.value?.infoWindow?.setPosition(location.latlng)
  infoWindow.value?.infoWindow?.open(gmaps.value?.map)
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

watch(
  () => gmaps.value?.ready,
  (ready) => {
    if (ready) {
      console.log(google.maps)
      directionsServices = new google.maps.DirectionsService()
      directionsRenderer = new google.maps.DirectionsRenderer()
      directionsRenderer.setMap(gmaps.value?.map || null)
      distanceService = new google.maps.DistanceMatrixService()

      // infoWindow.value?.infoWindow?.bindTo
    }
  }
)
</script>

<template>
  <GoogleMap
    ref="gmaps"
    :api-key="API_KEY"
    style="width: 100%; height: 800px"
    :center="center"
    :zoom="15"
    :styles="styles"
    language="es-MX"
  >
    <!-- @load="onMapsLoaded" -->
    <Marker
      :options="{
        position: center,
        // icon: 'https\:\/\/developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      }"
    />
    <Marker
      v-for="(location, index) in atmLocations"
      :key="index"
      :options="{ position: location.latlng }"
    >
      <!-- @mouseover="setMarkerInfo(location)" -->
      <InfoWindow ref="infoWindow">
        {{ Math.round(location.Distancia) }} metros
      </InfoWindow>
    </Marker>
  </GoogleMap>
  <div class="btn" @click="getLocation">Actualizar ubicación</div>
  <div class="btn" @click="getNearATMs(center)">Cajeros cercanos</div>
  <div class="btn" @click="getRoute()">Mostrar ruta</div>
  <!-- <div class="btn" @click="calculateDistance">Calculate distance</div> -->
</template>
