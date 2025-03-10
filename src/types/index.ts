export type Role = 'system' | 'user' | 'developer' | 'assistant'

export interface DetailedMessage {
  role: Role
  content: { audios?: (string | Buffer<ArrayBufferLike>)[]; text?: string; images?: string[] }
}

export interface BasicMessage {
  role: Role
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
  messages: (BasicMessage | DetailedMessage)[] // Only messages are allowed
}

export type Params = PromptParams | MessageParams

export interface DistilledDetailedMessage {
  role: Role
  content: { audios: Buffer<ArrayBufferLike>[]; text: string; images: string[] }
}

export interface DistilledParams {
  stream: boolean
  messages: DistilledDetailedMessage[]
  format: any
}
