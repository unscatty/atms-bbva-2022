<script setup lang="ts">
import RecordService, {
  recordRTCDefaultOptions,
} from '~/services/record.service'
import { defaultChatbotService as chatbotService } from '~/services/chatbot.service'

// import { io, Socket } from 'socket.io-client'

let recorder: RecordService
const recordDataURL = ref('')
const transcript = ref('')
const echoURL = ref('')
// let socket: Socket

const startRecording = async () => {
  const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })

  recorder = new RecordService(mediaStream, recordRTCDefaultOptions)
  await recorder.startRecording()
}

const stopRecording = async () => {
  recordDataURL.value = await recorder.stopAndGetDataURL()
}

onMounted(() => {
  chatbotService.onConnect(() => console.log('connected'))
  // socket = io(import.meta.env.VITE_SERVER_SOCKET_ENDPOINT)

  // socket.on('connected', () => console.log('connected'))
  // socket.on('detected-intent', (response) => {
  //   console.log(response)
  // })
})

const detectIntent = async () => {
  // socket.emit('detect-intent', transcript.value)
  const response = await chatbotService.emitText(
    'detect-intent',
    transcript.value
  )
  console.log(response)
}

const detectIntentAudio = async () => {
  const response = await chatbotService.emitAudio('detect-intent-audio', await recorder.getBlob())

  console.log(response)
}

const detectIntentAudioSynthesize = async () => {
  const response = await chatbotService.emitAudio('detect-intent-audio-synth', await recorder.getBlob())

  console.log(response)

  echoURL.value = URL.createObjectURL(new Blob([new Uint8Array(response.outputAudio as ArrayBuffer)]))
}

const echoAudio = async () => {
  const response = await chatbotService.echoAudio('detect-intent-audio-echo', await recorder.getBlob())
  console.log(response)
  echoURL.value = URL.createObjectURL(new Blob([new Uint8Array(response)]))
}
</script>

<template>
  <div>
    <audio :src="recordDataURL" controls></audio>
    <audio :src="echoURL" controls></audio>
    <input v-model="transcript" type="text" />
    <button class="btn" @click="startRecording">Start recording</button>
    <button class="btn" @click="stopRecording">Stop recording</button>
    <button class="btn" @click="detectIntent">Detect Intent</button>
    <button class="btn" @click="detectIntentAudio">Detect Intent Audio</button>
    <button class="btn" @click="detectIntentAudioSynthesize">Detect Intent Audio Synth</button>
    <button class="btn" @click="echoAudio">Echo Audio</button>
  </div>
</template>

<style scoped></style>
