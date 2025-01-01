import { initAI, readStream } from '../src'

const ai = initAI()

const result = await ai.run('@Google/gemini-1.5-flash-8b', {
  prompt: 'Write 1 to 100',
  stream: true,
})

readStream(result.content, ({ delta, total }) => {
  process.stdout.write(delta)
})
