import { initAI } from '../src'

const ai = initAI()

const result = await ai.run('@Google/gemini-1.5-flash-8b', {
  messages: [
    {
      role: 'user',
      content: 'What is the sky color',
    },
    {
      role: 'assistant',
      content: 'It is Blue',
    },
    {
      role: 'user',
      content: 'What is the sea color',
    },
  ],
})

console.log({ result: result.content })
