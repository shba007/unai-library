import { $fetch } from 'ofetch'
import { env } from 'std-env'

import { DistilledParams } from '../types'
import mapStream from '../utils/map-stream'

const PERPLEXITY_BASE_URL = 'https://api.perplexity.ai'

export interface PerplexityResponse {
  id: string
  model: string
  created: number
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
  citations: string[]
  object: string
  choices: {
    index: number
    finish_reason: string
    message: Delta
    delta: Delta
  }[]
}

export interface Delta {
  role: string
  content: string
}

export async function perplexity(model: string, params: DistilledParams, debugCallback?: (body: object) => void) {
  const body = {
    model,
    stream: params.stream,
    messages: params.messages.map(({ role, content }) => ({ role, content: content.text })),
  }
  if (debugCallback) debugCallback(body)
  let status: { code: number; message: string }

  const res = $fetch<PerplexityResponse | ReadableStream<Uint8Array>>('/chat/completions', {
    baseURL: PERPLEXITY_BASE_URL,
    headers: {
      Authorization: `Bearer ${env.PERPLEXITY_API_KEY}`,
    },
    method: 'POST',
    body,
    // @ts-ignore
    responseType: params.stream ? 'stream' : undefined,
    onResponseError({ response }) {
      status = { code: response.status, message: response.statusText }
    },
  })

  return {
    content: await res
      .then((res) => {
        if (res instanceof ReadableStream) {
          let delta: string
          let total: string

          return mapStream<{ delta: string; total: string }>(res, (data: PerplexityResponse) => {
            // consola.log({ choices: data.choices.at(-1) })
            const value = data.choices.at(-1)!.delta?.content ?? ''
            // consola.log({ value })
            delta = value
            total = (total ?? '') + value

            return { delta, total }
          })
        } else {
          // consola.log({ input: params.messages, output: res.choices[0].message.content })
          return res.choices.at(-1)!.message.content
        }
      })
      .catch((error) => {
        throw new Error(`Perplexity Fetch Failed ${status.code} ${status.message} - ${JSON.stringify(error.data, undefined, 2)}`)
      }),
  }
}
