import { exit } from 'node:process'
import { z } from 'zod'
import { initAI } from '../src'

const ai = initAI()

// NOTE: responseSchema should always be and z object
const responseSchema = z.object({
  timeline: z.array(
    z.object({
      time: z.string().datetime(),
      color: z.string(),
    })
  ),
})

const result = await ai.run<z.infer<typeof responseSchema>>('text-generate', '@Google/gemini-2.0-flash-lite', {
  prompt: 'What is the sky color in every 6 hour',
  stream: false,
  format: responseSchema,
})

if (result.content instanceof ReadableStream) exit(0)

console.log({ result: result.content.timeline })
