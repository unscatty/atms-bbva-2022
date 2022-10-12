import { SessionsClient } from '@google-cloud/dialogflow-cx'

export default class DialogFlowCXService {
  sessionClient: SessionsClient
  sessionPath: ReturnType<
    InstanceType<typeof SessionsClient>['projectLocationAgentSessionPath']
  >

  constructor(
    ...args: Parameters<
      InstanceType<typeof SessionsClient>['projectLocationAgentSessionPath']
    >
  ) {
    this.sessionClient = new SessionsClient()
    this.sessionPath = this.sessionClient.projectLocationAgentSessionPath(
      ...args
    )
  }

  async detectIntentAudio(recordedAudio: Buffer) {
    try {
      const request: DialogFlowCX.IDetectIntentRequest = {
        session: this.sessionPath,
        queryInput: {
          // TODO: set this as a separate config object
          audio: {
            config: {
              audioEncoding: 'AUDIO_ENCODING_LINEAR_16',
              sampleRateHertz: import.meta.env.VITE_DIALOGFLOW_AUDIO_SAMPLE_RATE,
            },
            audio: recordedAudio,
          },
          languageCode: import.meta.env.VITE_DIALOGFLOW_LANGUAGE_CODE,
        },
      }

      const [response] = await this.sessionClient.detectIntent(request)

      return response
    } catch (error) {
      console.error(error)
    }
  }
}
