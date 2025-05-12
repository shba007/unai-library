import { exit } from 'node:process'
import fs from 'node:fs'
import { initAI, readStream } from '../src'

const ai = initAI()

const result = await ai.run(
  'text-generate',
  '@X/grok-2:1212',
  {
    prompt: 'Write 1 to 101',
    stream: true,
  },
  function debugCallback(body: object) {
    fs.writeFileSync('./dump-body.json', JSON.stringify(body, undefined, 2))
  }
)

if (!(result.content instanceof ReadableStream)) exit(0)

readStream(result.content, ({ delta, total }) => {
  process.stdout.write(delta)
})
