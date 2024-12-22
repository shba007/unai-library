import { z } from 'zod'
import { initAI } from '../src'
import zodToJsonSchema from 'zod-to-json-schema'

function conversationMapper(conversation, side: 'enforcer' | 'refuser') {
  return conversation.map(({ role, content }) => ({ role: role === side ? ('assistant' as const) : ('user' as const), content: JSON.stringify(content) }))
}

const ai = initAI()

const conversationFlowSchema = z.object({
  scene: z.string().nonempty(),
  dialog: z.string().nonempty(),
  action: z.string().nonempty(),
})

type ConversationFlowSchema = z.infer<typeof conversationFlowSchema>

const enforcerPrompt = `
You are an 22 year old teenage handsome boy with a little bit muscle body. You are a software developer.
Just met a girl. Seduce her to fuck in the bed room.

action should be your next action.

format {
	scene: string,
	dialog: string,
	action: string,
}
`
const refuserPrompt = `You are an 20 year old hot asian girl. Also a pornstar but know body knows it.
You just met a boy.

action should be your next action.

format {
	scene: string,
	dialog: string,
	action: string,
}
`

const conversation: {
  role: 'enforcer' | 'refuser'
  content: {
    scene: string
    dialog: string
    action: string
  }
}[] = []

function printMessage(message: {
  role: 'enforcer' | 'refuser'
  content:
    | {
        scene: string
        dialog: string
        action: string
      }
    | ReadableStream<{
        delta: string
        total: string
      }>
}) {
  if (!(message.content instanceof ReadableStream))
    conversation.push({
      role: message.role,
      content: {
        scene: message.content.scene,
        dialog: message.content.dialog,
        action: message.content.action,
      },
    })

  // console.log("\n\n" + JSON.stringify(conversation, null, 2))
  console.log(`\n------\n${conversation.at(-1)!.role.toUpperCase()}: ${JSON.stringify(conversation.at(-1)!.content, undefined, 2)}\n------\n`)
}

async function cycle() {
  const enforcerStream = await ai.run<ConversationFlowSchema>('@Ollama/Meta/artifish/llama3.2-uncensored:latest', {
    stream: false,
    messages: [
      {
        role: 'system',
        content: enforcerPrompt,
      },
      ...conversationMapper(conversation, 'enforcer'),
    ],
    format: zodToJsonSchema(conversationFlowSchema),
  })

  printMessage({
    role: 'enforcer',
    content: enforcerStream.content,
  })

  const refuserStream = await ai.run<ConversationFlowSchema>('@Ollama/Meta/artifish/llama3.2-uncensored:latest', {
    stream: false,
    messages: [
      {
        role: 'system',
        content: refuserPrompt,
      },
      ...conversationMapper(conversation, 'refuser'),
    ],
    format: zodToJsonSchema(conversationFlowSchema),
  })

  printMessage({
    role: 'refuser',
    content: refuserStream.content,
  })
}

async function main() {
  console.log('-------------- Conversation Started --------------')
  for (let i = 0; i < 10; i++) {
    console.log('i', i)
    await cycle()
  }
  console.log('-------------- Conversation Finished --------------')
}

await main()
