export default class AudioContextRecorderService {
  context: AudioContext
  workletProcessorURL: string
  stream?: MediaStream

  input?: MediaStreamAudioSourceNode
  processor?: AudioWorkletNode

  constructor(
    contextOptions: AudioContextOptions,
    workletProcessorURL: string
  ) {
    this.context = new AudioContext(contextOptions)

    this.workletProcessorURL = workletProcessorURL
  }

  async startStreaming(
    onAudioConnected: () => void,
    onMessage: InstanceType<typeof MessagePort>['onmessage']
  ) {
    // Ask for permission to use audio
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    if (!this.stream) {
      throw 'You must allow audio to be recorded'
    }

    onAudioConnected()

    // Load processor worklet
    await this.context.audioWorklet.addModule(this.workletProcessorURL)
    this.context.resume()

    this.input = this.context.createMediaStreamSource(this.stream)
    this.processor = new AudioWorkletNode(this.context, 'recorder.worklet')

    this.processor.connect(this.context.destination)
    this.context.resume()

    this.input.connect(this.processor)

    this.processor.port.onmessage = onMessage
  }

  async stopRecording(onAudioDisonnected: () => void) {
    const track = this.stream?.getTracks()[0]
    track?.stop()

    if (this.processor) {
      this.input?.disconnect(this.processor)
      this.processor?.disconnect(this.context.destination)
    }

    await this.context.close()

    // Unset variables
    this.input = undefined
    this.processor = undefined

    onAudioDisonnected()
  }
}

export const defaultAudioContextRecorderService =
  new AudioContextRecorderService(
    {
      latencyHint: 'interactive',
      sampleRate: import.meta.env.VITE_DIALOGFLOW_AUDIO_SAMPLE_RATE,
    },
    '/js/recorderWorkletProcessor.js'
  )
