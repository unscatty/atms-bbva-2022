import { io, Socket } from 'socket.io-client'

export default class ChatbotService {
  socket: Socket

  constructor(...args: Parameters<typeof io>) {
    this.socket = io(...args)
  }

  onConnect(listener: () => void) {
    this.socket.on('connect', listener)

    // this.socket.on('detected-intent', (data) => console.log(data))
  }

  async emitAsync<T>(...args: Parameters<InstanceType<typeof Socket>['emit']>) {
    return new Promise<T>((resolve, reject) => {
      try {
        this.socket.emit(args[0], ...args.slice(1), (response: T) => {
          resolve(response)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  async emitText(event: string, text: string) {
    return this.emitAsync(event, text)
  }

  async emitAudio(event: string, audioData: Blob) {
    return this.emitAsync<DialogFlowCX.IDetectIntentResponse>(event, audioData)
  }

  async echoAudio(event: string, audio: Blob) {
    return this.emitAsync<ArrayBuffer>(event, audio)
  }
}

export const defaultChatbotService = new ChatbotService(
  import.meta.env.VITE_SERVER_SOCKET_ENDPOINT
)
