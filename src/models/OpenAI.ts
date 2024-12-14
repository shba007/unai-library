import { $fetch } from 'ofetch'
import { env } from 'std-env'
import type { DistilledParams } from '../types'
import pipeStream from '../utils/pipe-stream'

interface OpenAIResponse {
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

export async function openAI(model: string, params: DistilledParams) {
  // console.log(JSON.stringify(params.format))
  const res = $fetch<OpenAIResponse | ReadableStream<Uint8Array>>('/chat/completions', {
    baseURL: OPENAI_BASE_URL,
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    method: 'POST',
    body: {
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

        return pipeStream<{ delta: string; total: string }>(res, (data: OpenAIResponse) => {
          // console.log({ choices: data.choices.at(-1) })
          const value = data.choices.at(-1)!.delta?.content ?? ''
          // console.log({ value })
          delta = value
          total = (total ?? '') + value

          return { delta, total }
        })
      } else {
        // console.log({ input: params.messages, output: res.choices[0].message.content })
        return res.choices.at(-1)!.message.content
      }
    }),
  }
}
