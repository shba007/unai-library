import { ollama } from './models/ollama'
import { google } from './models/google'
import { openAI } from './models/open-ai'
import { perplexity } from './models/perplexity'
import { anthropic } from './models/anthropic'

import { Params, Message, DistilledParams } from './types'
import formatJSONSchema from './utils/format-json-schema'

type OllamaModel =
  | '@Ollama/Meta/llama3.2:1b'
  | '@Ollama/Meta/llama3.2:3b'
  | '@Ollama/Meta/llama3.2-vision'
  | '@Ollama/Meta/llama3.2-vision:90b'
  | '@Ollama/Meta/llama3.3'
  | '@Ollama/Meta/artifish/llama3.2-uncensored:latest'
type GoogleModel = '@Google/gemini-1.0-pro' | '@Google/gemini-1.5-flash-8b' | '@Google/gemini-1.5-flash' | '@Google/gemini-1.5-pro'
type OpenAILLMModel = '@OpenAI/gpt-3.5-turbo' | '@OpenAI/gpt-4-turbo' | '@OpenAI/gpt-4' | '@OpenAI/gpt-4o-mini' | '@OpenAI/gpt-4o' | '@OpenAI/o1-mini' | '@OpenAI/o1-preview'
type OpenAIVoiceModel = '@OpenAI/whisper'
type PerplexityModel = '@Perplexity/Meta/llama-3.1-sonar-small-128k-online' | '@Perplexity/Meta/llama-3.1-sonar-large-128k-online' | '@Perplexity/Meta/llama-3.1-sonar-huge-128k-online'
type AnthropicModel = '@Anthropic/claude-3-haiku-20240307' | '@Anthropic/claude-3-haiku-20240307'

type Model = OllamaModel | GoogleModel | OpenAILLMModel | OpenAIVoiceModel | PerplexityModel | AnthropicModel

interface AIResponse<T> {
  content:
    | T
    | ReadableStream<{
        delta: string
        total: string
      }>
}

export function initAI() {
  return {
    run: async <T = string>(model: Model, params: Params): Promise<AIResponse<T>> => {
      {
        let result:
          | Promise<{
              content:
                | string
                | ReadableStream<{
                    delta: string
                    total: string
                  }>
            }>
          | undefined = undefined

        params.messages = 'prompt' in params ? ([{ role: 'user', content: params.prompt }] as Message[]) : (params.messages as Message[])

        const distilledParams: DistilledParams = {
          stream: params.stream ?? false,
          messages: params.messages,
          format: params.format,
        }

        if (distilledParams.messages.length <= 0) throw new Error('Messages should at least be one')

        switch (model) {
          case '@Ollama/Meta/llama3.2:1b':
          case '@Ollama/Meta/llama3.2:3b':
          case '@Ollama/Meta/llama3.2-vision':
          case '@Ollama/Meta/llama3.2-vision:90b':
          case '@Ollama/Meta/llama3.3':
          case '@Ollama/Meta/artifish/llama3.2-uncensored:latest': {
            distilledParams.format = formatJSONSchema('Ollama', distilledParams.format)
            result = ollama(model.split('/').slice(2).join('/'), distilledParams)
            break
          }
          case '@Google/gemini-1.0-pro':
          case '@Google/gemini-1.5-flash-8b':
          case '@Google/gemini-1.5-flash':
          case '@Google/gemini-1.5-pro': {
            distilledParams.format = formatJSONSchema('Google', distilledParams.format)
            result = google(model.split('/').slice(2).join('/'), distilledParams)
            break
          }
          case '@OpenAI/gpt-3.5-turbo':
          case '@OpenAI/gpt-4-turbo':
          case '@OpenAI/gpt-4':
          case '@OpenAI/gpt-4o-mini':
          case '@OpenAI/gpt-4o':
          case '@OpenAI/o1-mini':
          case '@OpenAI/o1-preview': {
            distilledParams.format = formatJSONSchema('OpenAI', distilledParams.format)
            result = openAI(model.split('/').slice(1).join('/'), distilledParams)
            break
          }
          case '@OpenAI/whisper': {
            break
          }
          case '@Perplexity/Meta/llama-3.1-sonar-small-128k-online':
          case '@Perplexity/Meta/llama-3.1-sonar-large-128k-online':
          case '@Perplexity/Meta/llama-3.1-sonar-huge-128k-online': {
            distilledParams.format = formatJSONSchema('OpenAI', distilledParams.format)
            result = perplexity(model.split('/').slice(1).join('/'), distilledParams)
            break
          }
          case '@Anthropic/claude-3-haiku-20240307': {
            distilledParams.format = formatJSONSchema('OpenAI', distilledParams.format)
            result = anthropic(model.split('/').slice(1).join('/'), distilledParams)
            break
          }

          default: {
            throw new Error('Enter a valid model name')
          }
        }

        if (!result) throw new Error('result is undefined')

        const finalResult = await result
        const content = (params.format && !(finalResult.content instanceof ReadableStream) ? JSON.parse(finalResult.content) : finalResult.content) as T

        return {
          content,
        }
      }
    },
  }
}
