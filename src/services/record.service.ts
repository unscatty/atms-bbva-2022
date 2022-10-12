import RecordRTC from 'recordrtc'

export default class RecordService {
  recorder: RecordRTC

  constructor(...args: ConstructorParameters<typeof RecordRTC>) {
    this.recorder = new RecordRTC(...args)
  }

  startRecording() {
    this.recorder.startRecording()
  }

  async stopRecording() {
    return new Promise<Buffer>((resolve, reject) => {
      try {
        this.recorder.stopRecording(() => {
          const buffer = Buffer.from(this.recorder.getDataURL(), 'base64')
          // Reset recorder data
          this.recorder.reset()

          resolve(buffer)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}

const ENV = import.meta.env

export const recordRTCDefaultOptions: RecordRTC.Options = {
  type: 'audio',
  mimeType: 'audio/webm',
  sampleRate: ENV.VITE_RECORDER_SAMPLE_RATE,
  desiredSampRate: ENV.VITE_RECORDER_DESIRED_SAMPLE_RATE,
  recorderType: RecordRTC.StereoAudioRecorder,
  numberOfAudioChannels: 1,
}
