import { $fetch } from 'ofetch'
import { env } from 'std-env'
import { DistilledParams } from '../types'
import mapStream from '../utils/map-stream'

interface OllamaResponse {
  model: string
  created_at: string
  message: {
    role: string
    content: string
  }
  done_reason: string
  done: boolean
  total_duration: number
  load_duration: number
  prompt_eval_count: number
  prompt_eval_duration: number
  eval_count: number
  eval_duration: number
}

export async function ollama(model: string, params: DistilledParams) {
  const res = $fetch<OllamaResponse | ReadableStream<Uint8Array>>('/api/chat', {
    baseURL: env.OLLAMA_BASE_URL ?? 'http://localhost:11434',
    method: 'POST',
    body: {
      model,
      stream: params.stream,
      ...(params.format
        ? {
            format: params.format,
          }
        : {}),
      messages: params.messages,
    },
    // @ts-ignore
    responseType: params.stream ? 'stream' : undefined,
  })

  return {
    content: await res.then((res) => {
      if (res instanceof ReadableStream) {
        let delta: string
        let total: string

        return mapStream<{ delta: string; total: string }>(res, (data: OllamaResponse) => {
          const value = data.message.content
          delta = value
          total = (total ?? '') + value

          return { delta, total }
        })
      } else {
        // consola.log({ input: params.messages, output: res.message })
        return res.message.content
      }
    }),
  }
}
