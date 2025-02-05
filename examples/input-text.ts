import { initAI } from '../src'

const ai = initAI()

const result = await ai.run('text-generation', '@OpenAI/o1-mini:2024-09-12', {
  messages: [
    {
      role: 'user',
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
