import type { AudioTranscribeModel, TextGenerateModel } from './tasks'
import type { Params } from './types'
import { audioTranscribe, audioGenerate, textGenerate } from './tasks'

type Task = 'text-generate' | 'image-generate' | 'audio-generate' | 'video-generate' | 'image-caption' | 'audio-transcribe' | 'video-caption'

interface AIResponse<T> {
  content:
    | T
    | ReadableStream<{
        delta: string
        total: string
      }>
}

export function initAI() {
  async function run<T = string>(task: 'text-generate', model: TextGenerateModel, params: Params, debugCallback?: (body: object) => void): Promise<AIResponse<T>>

  async function run(task: 'audio-transcribe', model: AudioTranscribeModel, params: Params, debugCallback?: (body: object) => void): Promise<{ content: string }>

  async function run<T = string>(task: Task, model: TextGenerateModel | AudioTranscribeModel, params: Params, debugCallback?: (body: object) => void): Promise<AIResponse<T> | { content: string }> {
    switch (task) {
      case 'text-generate': {
        return textGenerate<T>(model as TextGenerateModel, params, debugCallback)
      }
      case 'audio-transcribe': {
        return audioTranscribe(model as AudioTranscribeModel, params, debugCallback)
      }
      default: {
        throw new Error(`Invalid task: ${task}`)
      }
    }
  }

  return { run }
}

export { default as readStream } from './utils/read-stream'
