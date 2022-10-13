<script setup lang="ts">
import RecordService, {
  recordRTCDefaultOptions,
} from '~/services/record.service'

import { io, Socket } from 'socket.io-client'

let recorder: RecordService
const recordDataURL = ref('')
const transcript = ref('')
let socket: Socket

const startRecording = async () => {
  const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })

  recorder = new RecordService(mediaStream, recordRTCDefaultOptions)
  await recorder.startRecording()
}

const stopRecording = async () => {
  recordDataURL.value = await recorder.stopAndGetDataURL()
}

onMounted(() => {
  socket = io(import.meta.env.VITE_SERVER_SOCKET_ENDPOINT)

  socket.on('connected', () => console.log('connected'))
  socket.on('detected-intent', (response) => {
    console.log(response)
  })
})

const detectIntent = async () => {
  socket.emit('detect-intent', transcript.value)
}
</script>

<template>
  <div>
    <audio :src="recordDataURL" controls></audio>
    <input v-model="transcript" type="text" />
    <button class="btn" @click="startRecording">Start recording</button>
    <button class="btn" @click="stopRecording">Stop recording</button>
    <button class="btn" @click="detectIntent">Detect Intent</button>
  </div>
</template>

<style scoped></style>
