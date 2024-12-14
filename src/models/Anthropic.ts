import { $fetch } from 'ofetch'
import { env } from 'std-env'
import { DistilledParams } from '../types'

interface AnthropicResponse {}

export async function anthropic(model: string, params: DistilledParams) {
  const res = $fetch('/', {
    baseURL: env.OLLAMA_BASE_URL ?? 'http://localhost:11434',
    method: 'POST',
    body: {
      model,
      stream: params.stream,
      /* format: "json", */
      messages: params.messages,
    },
    responseType: params.stream ? 'stream' : undefined,
  })

  return { content: res as Promise<string | ReadableStream<Uint8Array>> }
}
