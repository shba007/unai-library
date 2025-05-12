import { $fetch } from 'ofetch'
import { env } from 'std-env'

import { DistilledParams } from '../types'
import mapStream from '../utils/map-stream'

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string
      }[]
      role: string
    }
    finishReason: string
    avgLogprobs: number
  }[]
  usageMetadata: {
    promptTokenCount: number
    candidatesTokenCount: number
    totalTokenCount: number
  }
  modelVersion: string
}

const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models'

export async function google(model: string, params: DistilledParams, debugCallback?: (body: object) => void) {
  const body = {
    ...(params.format
      ? {
          generationConfig: {
            response_mime_type: 'application/json',
            response_schema: params.format,
          },
        }
      : {}),
    contents: [
      {
        parts: params.messages.map(({ content }) => ({ text: content.text })),
      },
    ],
  }
  if (debugCallback) debugCallback(body)
  let status: { code: number; message: string }

  const res = $fetch<GeminiResponse | ReadableStream<Uint8Array>>(`/${model}:${params.stream ? 'streamGenerateContent' : 'generateContent'}`, {
    baseURL: GEMINI_BASE_URL,
    method: 'POST',
    query: {
      key: env.GEMINI_API_KEY,
      ...(params.stream ? { alt: 'sse' } : {}),
    },
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

          return mapStream<{ delta: string; total: string }>(res, (data: GeminiResponse) => {
            const value = data.candidates.map(({ content }) => content.parts[0].text).at(-1)!
            delta = value
            total = (total ?? '') + value

            return { delta, total }
          })
        } else {
          // consola.log({ input: params.messages, output: res.candidates[0].content.parts[0].text })
          return res.candidates.map(({ content }) => content.parts[0].text).at(-1)!
        }
      })
      .catch((error) => {
        throw new Error(`Google Fetch Failed ${status.code} ${status.message} - ${JSON.stringify(error.data, undefined, 2)}`)
      }),
  }
}
