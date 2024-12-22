import { $fetch } from 'ofetch'
import { env } from 'std-env'
import { DistilledParams } from '../types'

const CLAUDE_BASE_URL = 'https://api.openai.com/v1'

export async function anthropic(model: string, params: DistilledParams) {
  const res = $fetch('/', {
    baseURL: CLAUDE_BASE_URL,
    headers: {
      Authorization: `Bearer ${env.CLAUDE_API_KEY}`,
    },
    method: 'POST',
    body: {
      model,
      stream: params.stream,
      /* format: "json", */
      messages: params.messages,
    },
    responseType: params.stream ? 'stream' : undefined,
  })

  return { content: res as unknown as string | ReadableStream<{ delta: string; total: string }> }
}
