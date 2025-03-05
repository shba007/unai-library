import { ollama } from './models/ollama'
import { google } from './models/google'
import { openAI } from './models/open-ai'
import { perplexity } from './models/perplexity'
import { anthropic } from './models/anthropic'

import { Params, DistilledParams, DetailedMessage, DistilledDetailedMessage } from './types'
import formatJSONSchema from './utils/format-json-schema'
import zodToJsonSchema from 'zod-to-json-schema'
import {} from 'zod'

type Task = 'text-generation' | 'image-generation' | 'audio-generation' | 'video-generation' | 'image-caption' | 'audio-transcription' | 'video-caption'

type OllamaModel =
  | '@Ollama/Meta/llama3.2:1b'
  | '@Ollama/Meta/llama3.2:3b'
  | '@Ollama/Meta/llama3.2-vision'
  | '@Ollama/Meta/llama3.2-vision:90b'
  | '@Ollama/Meta/llama3.3'
  | '@Ollama/Meta/artifish/llama3.2-uncensored:latest'
type GoogleModel = '@Google/gemini-1.0-pro' | '@Google/gemini-1.5-flash-8b' | '@Google/gemini-1.5-flash' | '@Google/gemini-1.5-pro'
type OpenAILLMModel =
  | '@OpenAI/gpt-3.5-turbo:instruct'
  | '@OpenAI/gpt-3.5-turbo:1106'
  | '@OpenAI/gpt-3.5-turbo:0125'
  | '@OpenAI/gpt-3.5-turbo:latest'
  | '@OpenAI/gpt-4:0314'
  | '@OpenAI/gpt-4:0613'
  | '@OpenAI/gpt-4:latest'
  | '@OpenAI/gpt-4-turbo:1106-preview'
  | '@OpenAI/gpt-4-turbo:0125-preview'
  | '@OpenAI/gpt-4-turbo:preview'
  | '@OpenAI/gpt-4-turbo:2024-04-09'
  | '@OpenAI/gpt-4-turbo:latest'
  | '@OpenAI/gpt-4o-mini:2024-07-18'
  | '@OpenAI/gpt-4o-mini:latest'
  | '@OpenAI/gpt-4o:2024-05-13'
  | '@OpenAI/gpt-4o:2024-08-06'
  | '@OpenAI/gpt-4o:2024-11-20'
  | '@OpenAI/gpt-4o:latest'
  | '@OpenAI/o1-mini:2024-09-12'
  | '@OpenAI/o1-mini:latest'
  | '@OpenAI/o1-preview:2024-09-12'
  | '@OpenAI/o1-preview:latest'
  | '@OpenAI/o1:2024-12-17'
  | '@OpenAI/o1:latest'
  | '@OpenAI/o3-mini:2025-01-31'
  | '@OpenAI/o3-mini:latest'
type OpenAIVoiceModel = '@OpenAI/whisper'

type PerplexityModel =
  | '@Perplexity/llama-3.1-sonar-small-128k-online'
  | '@Perplexity/llama-3.1-sonar-large-128k-online'
  | '@Perplexity/llama-3.1-sonar-huge-128k-online'
  | '@Perplexity/sonar'
  | '@Perplexity/sonar-pro'
  | '@Perplexity/sonar-reasoning'
  | '@Perplexity/sonar-reasoning-pro'
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
    run: async <T = string>(task: Task, model: Model, params: Params) => {
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

        params.messages =
          'prompt' in params
            ? ([{ role: 'user', content: { text: params.prompt, images: [], audios: [] } }] as DetailedMessage[])
            : params.messages.map<DetailedMessage>(({ role, content }) =>
                typeof content === 'string'
                  ? {
                      role,
                      content: { text: content, images: [], audios: [] },
                    }
                  : { role, content }
              )

        const distilledParams: DistilledParams = {
          stream: params.stream ?? false,
          messages: params.messages as DistilledDetailedMessage[],
          format: params.format ? zodToJsonSchema(params.format as Zod.AnyZodObject) : undefined,
        }

        if (distilledParams.messages.length <= 0) throw new Error('Messages should at least be one')

        function debugCallback(body: object) {
          // fs.writeFileSync('./dump-body.json', JSON.stringify(body, undefined, 2))
        }

        switch (model) {
          case '@Ollama/Meta/llama3.2:1b':
          case '@Ollama/Meta/llama3.2:3b':
          case '@Ollama/Meta/llama3.2-vision':
          case '@Ollama/Meta/llama3.2-vision:90b':
          case '@Ollama/Meta/llama3.3':
          case '@Ollama/Meta/artifish/llama3.2-uncensored:latest': {
            distilledParams.format = formatJSONSchema('Ollama', distilledParams.format)
            result = ollama(model.split('/').slice(2).join('/'), distilledParams, debugCallback)
            break
          }
          case '@Google/gemini-1.0-pro':
          case '@Google/gemini-1.5-flash-8b':
          case '@Google/gemini-1.5-flash':
          case '@Google/gemini-1.5-pro': {
            distilledParams.format = formatJSONSchema('Google', distilledParams.format)
            result = google(model.split('/').slice(-1).join('/'), distilledParams, debugCallback)
            break
          }
          case '@OpenAI/gpt-3.5-turbo:instruct':
          case '@OpenAI/gpt-3.5-turbo:1106':
          case '@OpenAI/gpt-3.5-turbo:0125':
          case '@OpenAI/gpt-3.5-turbo:latest':
          case '@OpenAI/gpt-4:0314':
          case '@OpenAI/gpt-4:0613':
          case '@OpenAI/gpt-4:latest':
          case '@OpenAI/gpt-4-turbo:1106-preview':
          case '@OpenAI/gpt-4-turbo:0125-preview':
          case '@OpenAI/gpt-4-turbo:preview':
          case '@OpenAI/gpt-4-turbo:2024-04-09':
          case '@OpenAI/gpt-4-turbo:latest':
          case '@OpenAI/gpt-4o-mini:2024-07-18':
          case '@OpenAI/gpt-4o-mini:latest':
          case '@OpenAI/gpt-4o:2024-05-13':
          case '@OpenAI/gpt-4o:2024-08-06':
          case '@OpenAI/gpt-4o:2024-11-20':
          case '@OpenAI/gpt-4o:latest':
          case '@OpenAI/o1-mini:2024-09-12':
          case '@OpenAI/o1-mini:latest':
          case '@OpenAI/o1-preview:2024-09-12':
          case '@OpenAI/o1-preview:latest':
          case '@OpenAI/o1:2024-12-17':
          case '@OpenAI/o1:latest':
          case '@OpenAI/o3-mini:2025-01-31':
          case '@OpenAI/o3-mini:latest': {
            distilledParams.format = formatJSONSchema('OpenAI', distilledParams.format)
            const modelName = model.split('/').slice(1).join('/').replace(':latest', '').replace(':', '-')
            result = openAI(modelName, distilledParams, debugCallback)
            break
          }
          case '@Perplexity/llama-3.1-sonar-small-128k-online':
          case '@Perplexity/llama-3.1-sonar-large-128k-online':
          case '@Perplexity/llama-3.1-sonar-huge-128k-online':
          case '@Perplexity/sonar':
          case '@Perplexity/sonar-pro':
          case '@Perplexity/sonar-reasoning':
          case '@Perplexity/sonar-reasoning-pro': {
            // distilledParams.format = formatJSONSchema('OpenAI', distilledParams.format)
            result = perplexity(model.split('/').slice(1).join('/'), distilledParams, debugCallback)
            break
          }
          case '@Anthropic/claude-3-haiku-20240307': {
            distilledParams.format = formatJSONSchema('OpenAI', distilledParams.format)
            result = anthropic(model.split('/').slice(1).join('/'), distilledParams, debugCallback)
            break
          }

          default: {
            throw new Error('Enter a valid model name')
          }
        }

        if (!result) throw new Error('result is undefined')

        const finalResult = await result
        const content = (params.format && !(finalResult.content instanceof ReadableStream) ? JSON.parse(finalResult.content) : finalResult.content) as T

        return finalResult.content instanceof ReadableStream
          ? ({
              content,
            } as {
              content: ReadableStream<{
                delta: string
                total: string
              }>
            })
          : ({
              content,
            } as { content: T })
      }
    },
  }
}

export { default as readStream } from './utils/read-stream'
