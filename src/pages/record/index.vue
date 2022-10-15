<script setup lang="ts">
import RecordService, {
  recordRTCDefaultOptions,
} from '~/services/record.service'
import { defaultIOService as ioService } from '~/services/io.service'
import { defaultAudioContextRecorderService as contextRecorder } from '~/services/audio-context-recorder.service'
import { io } from 'socket.io-client'

// import recorderWorkletURL from '../../worklets/recorderWorkletProcessor.js?url'
// import AudioContextRecorderService from '~/services/audio-context-recorder.service'

// import { Socket } from 'socket.io-client'

// import { io, Socket } from 'socket.io-client'

let recorder: RecordService
const recordDataURL = ref('')
const transcript = ref('')
const echoURL = ref('')

// const contextRecorder = new AudioContextRecorderService(
//   { latencyHint: 'interactive' },
//   // '~/worklets/recorderWorkletProcessor.js'
//   'recorderWorkletURL'
// )
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
  ioService.onConnect(() => console.log('connected'))
  // socket = ioService.socketInstance

  // socket.on()

  // socket.on('connected', () => console.log('connected'))
  // socket.on('detected-intent', (response) => {
  //   console.log(response)
  // })
})

const detectIntent = async () => {
  // socket.emit('detect-intent', transcript.value)
  const response = await ioService.emitText('detect-intent', transcript.value)
  console.log(response)
}

const detectIntentAudio = async () => {
  const response = await ioService.emitAudio(
    'detect-intent-audio',
    await recorder.getBlob()
  )

  console.log(response)
}

const detectIntentAudioSynthesize = async () => {
  const response = await ioService.emitAudio(
    'detect-intent-audio-synth',
    await recorder.getBlob()
  )

  console.log(response)

  echoURL.value = URL.createObjectURL(
    new Blob([new Uint8Array(response.outputAudio as ArrayBuffer)])
  )
}

const echoAudio = async () => {
  const response = await ioService.echoAudio(
    'detect-intent-audio-echo',
    await recorder.getBlob()
  )
  console.log(response)
  echoURL.value = URL.createObjectURL(new Blob([new Uint8Array(response)]))
}

const startStreamingAudio = async () => {
  ioService.socketInstance.on('intent-matched', (data: DialogFlowCX.IStreamingDetectIntentResponse) => {
    const audio = data.detectIntentResponse?.outputAudio;

    echoURL.value = URL.createObjectURL(
    new Blob([new Uint8Array(audio as ArrayBuffer)])
  )
  })

  await contextRecorder.startStreaming(
    () => {
      console.log('audio connected')
      ioService.emitBinaryStream('start-streaming-audio', new Blob())
    },
    (event) => {
      const audioData = event.data
      ioService.emitBinaryStream('on-stream-data', audioData)
    }
  )
}

const stopStreamingAudio = async () => {
  // await re

  await contextRecorder.stopRecording(() => {
    ioService.socketInstance.emit('on-stream-stop')
  })
}

const streamAudioRTC = async () => {
  const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })

  ioService.socketInstance.on(
    'intent-matched',
    (data: DialogFlowCX.IStreamingDetectIntentResponse) => {
      const audio = data.detectIntentResponse?.outputAudio

      echoURL.value = URL.createObjectURL(
        new Blob([new Uint8Array(audio as ArrayBuffer)])
      )
    }
  )

  ioService.emitBinaryStream('start-streaming-audio', new Blob())

  recorder = RecordService.stream(mediaStream, {
    ...recordRTCDefaultOptions,
    // timeSlice: 5000,
    ondataavailable(data) {
      ioService.emitBinaryStream('on-stream-data', data)
    },
  })

  await recorder.startRecording()
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
    <button class="btn" @click="detectIntentAudioSynthesize">
      Detect Intent Audio Synth
    </button>
    <button class="btn" @click="startStreamingAudio">Stream Audio</button>
    <!-- <button class="btn" @click="streamAudioRTC">Stream Audio</button> -->
    <button class="btn" @click="stopStreamingAudio">Stop Stream Audio</button>
    <button class="btn" @click="echoAudio">Echo Audio</button>
  </div>
</template>

<style scoped></style>
