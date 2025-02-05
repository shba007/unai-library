import { exit } from 'node:process'
import { initAI, readStream } from '../src'

const ai = initAI()

const result = await ai.run('text-generation', '@OpenAI/o1-mini:2024-09-12', {
  prompt: 'Write 1 to 100',
  stream: true,
})

if (!(result.content instanceof ReadableStream)) exit(0)

readStream(result.content, ({ delta, total }) => {
  process.stdout.write(delta)
})
