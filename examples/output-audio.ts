import { initAI } from '../src'

const ai = initAI()

const result = await ai.run('audio-generation', '@Google/gemini-1.5-flash-8b', {
  prompt: 'Sound of river',
})

console.log({ result: result.content })
