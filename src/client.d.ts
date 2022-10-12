/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string
  // RecordRTC recorder
  readonly VITE_RECORDER_MIME_TYPE: string
  readonly VITE_RECORDER_SAMPLE_RATE: number
  readonly VITE_RECORDER_DESIRED_SAMPLE_RATE: number
  readonly VITE_RECORDER_AUDIO_CHANNELS: number
  // DialogFlow audio encoding
  readonly VITE_DIALOGFLOW_AUDIO_ENCODING: string
  readonly VITE_DIALOGFLOW_AUDIO_SAMPLE_RATE: number
  readonly VITE_DIALOGFLOW_LANGUAGE_CODE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
