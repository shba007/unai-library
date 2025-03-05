import { exit } from 'node:process'
import { initAI, readStream } from '../src'

const ai = initAI()

const result = await ai.run('text-generation', '@OpenAI/o3-mini:latest', {
  prompt: 'Write 1 to 101',
  stream: true,
})

if (!(result.content instanceof ReadableStream)) exit(0)

readStream(result.content, ({ delta, total }) => {
  process.stdout.write(delta)
})
