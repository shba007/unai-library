import fs from 'node:fs'
import { initAI } from '../src'

const ai = initAI()

const result = await ai.run(
  'text-generate',
  '@Google/gemini-2.0-flash-lite',
  {
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
  },
  function debugCallback(body: object) {
    fs.writeFileSync('./dump-body.json', JSON.stringify(body, undefined, 2))
  }
)

console.log({ result: result.content })
