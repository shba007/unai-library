import { audioTranscribe, AudioTranscribeModel, textGenerate, TextGenerateModel } from './tasks'

type Task = 'text-generate' | 'image-generate' | 'audio-generate' | 'video-generate' | 'image-caption' | 'audio-transcribe' | 'video-caption'

interface AIResponse<T> {
  content:
    | T
    | ReadableStream<{
        delta: string
        total: string
      }>
}

// Overloaded run function:
export function initAI() {
  // Overload #1: text-generate
  async function run(task: 'text-generate', model: TextGenerateModel, ...args: any[]): Promise<any>

  // Overload #2: audio-transcribe
  async function run(task: 'audio-transcribe', model: AudioTranscribeModel, ...args: any[]): Promise<any>

  // Implementation signature
  async function run(task: Task, model: TextGenerateModel | AudioTranscribeModel, ...args: any[]): Promise<any> {
    switch (task) {
      case 'text-generate': {
        return textGenerate(model, ...args)
      }
      case 'audio-transcribe': {
        return audioTranscribe(model, ...args)
      }
      default: {
        throw new Error(`Invalid task: ${task}`)
      }
    }
  }

  return { run }
}

export { default as readStream } from './utils/read-stream'
