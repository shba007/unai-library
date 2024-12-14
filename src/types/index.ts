export interface Message {
  role: 'system' | 'user'
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
  format?: string | object
  tools?: Tool[]
}

export interface PromptParams extends BaseParams {
  prompt: string // Only prompt is allowed
  messages?: never
}

export interface MessageParams extends BaseParams {
  messages: Message[] // Only messages are allowed
  prompt?: never
}

export type Params = PromptParams | MessageParams

export interface DistilledParams {
  stream: boolean
  messages: Message[]
  format: any
}
