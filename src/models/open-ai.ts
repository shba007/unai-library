import { $fetch } from 'ofetch'
import { env } from 'std-env'
import { fileTypeFromBuffer } from 'file-type'

import type { DistilledParams, Params } from '../types'
import mapStream from '../utils/map-stream'
import convertToBase64 from '../utils/convert-to-base64'

interface OpenAITextResponse {
  id: string
  object: string
  created: number
  model: string
  choices: {
    index: number
    delta: { role: string; content: string; refusal: null }
    message: { role: string; content: string; refusal: null }
    logprobs: null
    finish_reason: string
  }[]
  system_fingerprint: string
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
    prompt_tokens_details: {
      cached_tokens: number
      audio_tokens: number
    }
    completion_tokens_details: {
      reasoning_tokens: number
      audio_tokens: number
      accepted_prediction_tokens: number
      rejected_prediction_tokens: number
    }
  }
}

const OPENAI_BASE_URL = 'https://api.openai.com/v1'

/* [
  { "type": "text", "text": "What's in this image?" },
  {
    "type": "image_url",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
  },
] */

async function text(model: string, params: DistilledParams, debugCallback?: (body: object) => void) {
  const messages = await Promise.all(
    params.messages.map(async ({ role, content }) => ({
      role,
      content: await Promise.all([
        { type: 'text', text: content.text },
        ...content.images.map(async (url) => {
          return {
            type: 'image_url',
            image_url: { url: await convertToBase64(url) },
          }
        }),
      ]),
    }))
  )
  const body = {
    model,
    stream: params.stream,
    ...(params.format
      ? {
          response_format: {
            type: 'json_schema',
            json_schema: {
              name: 'unique_response',
              strict: true,
              schema: params.format,
            },
          },
        }
      : {}),
    messages,
  }
  if (debugCallback) debugCallback(body)

  const res = $fetch<OpenAITextResponse | ReadableStream<Uint8Array>>('/chat/completions', {
    baseURL: OPENAI_BASE_URL,
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    method: 'POST',
    body,
    // @ts-ignore
    responseType: params.stream ? 'stream' : undefined,
    onResponseError({ response, error }) {
      throw new Error(`OpenAI Fetch Failed ${response.status} ${response.statusText}`)
    },
  })

  return {
    content: await res.then((res) => {
      if (res instanceof ReadableStream) {
        let delta: string
        let total: string

        return mapStream<{ delta: string; total: string }>(res, (data: OpenAITextResponse) => {
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
    }),
  }
}

interface OpenAIAudioResponse {
  text: string
}

async function audio(model: string, params: DistilledParams, debugCallback?: (body: object) => void) {
  const buffer = Buffer.from(params.messages.at(-1)!.content.audios.at(-1)!)
  const fileType = await fileTypeFromBuffer(buffer)
  const blob = new Blob([buffer], { type: fileType?.mime })

  const body = new FormData()
  body.append('file', blob)
  body.append('model', model)

  if (debugCallback) debugCallback(body)

  const res = $fetch<OpenAIAudioResponse>('/audio/transcriptions', {
    baseURL: OPENAI_BASE_URL,
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    method: 'POST',
    body,
    onResponseError({ response, error }) {
      throw new Error(`OpenAI Fetch Failed ${response.status} ${response.statusText}`)
    },
  })

  return {
    content: await res.then((res) => {
      // consola.log({ input: params.messages, output: res.choices[0].message.content })
      return res.text
    }),
  }
}

export { text, audio }
