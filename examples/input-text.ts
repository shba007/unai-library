import { initAI } from '../src'

const ai = initAI()

const result = await ai.run('text-generation', '@Google/gemini-1.5-pro', {
  messages: [
    {
      role: 'system',
      content: 'reply in one word',
    },
    {
      role: 'user',
      content: 'What is the sky color',
    },
    {
      role: 'assistant',
      content: 'Blue',
    },
    {
      role: 'user',
      content: 'What is the sea color',
    },
  ],
})

console.log({ result: result.content })
