interface TextContent {
  type: 'text'
  text: string
}
interface ImageContent {
  type: 'image_url'
  image_url: string
}

export interface DetailedMessage {
  role: 'assistant' | 'user'
  content: (TextContent | ImageContent)[]
}

export interface Message {
  role: 'assistant' | 'user'
  content: string
}

export interface Tool {
  type: string
  function: {
    name: string
    description: string
    parameters: {
      type: string
      required: string[]
      properties: {
        [key: string]: {
          type: string
          description: string
          enum?: string[]
        }
      }
    }
  }
}

export interface BaseParams {
  stream?: boolean
  format?: object
  tools?: Tool[]
}

export interface PromptParams extends BaseParams {
  prompt: string // Only prompt is allowed
  messages?: never
}

export interface MessageParams extends BaseParams {
  prompt?: never
  messages: (Message | DetailedMessage)[] // Only messages are allowed
}

export type Params = PromptParams | MessageParams

export interface DistilledParams {
  stream: boolean
  messages: DetailedMessage[]
  format: any
}
