import { $fetch } from 'ofetch'
import { env } from 'std-env'
import { DistilledParams } from '../types'

const PERPLEXITY_BASE_URL = 'https://api.openai.com/v1'

export async function perplexity(model: string, params: DistilledParams) {
  const res = $fetch('/', {
    baseURL: PERPLEXITY_BASE_URL,
    headers: {
      Authorization: `Bearer ${env.PERPLEXITY_API_KEY}`,
    },
    method: 'POST',
    body: {
      model,
      stream: params.stream,
      messages: params.messages,
    },
    responseType: params.stream ? 'stream' : undefined,
  })

  return { content: res as Promise<string | ReadableStream<Uint8Array>> }
}
