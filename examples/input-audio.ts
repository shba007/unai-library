import fs from 'node:fs'
import { initAI } from '../src'

const ai = initAI()

const filePath = 'test.mp3'
const buffer = fs.readFileSync(filePath)

const result = await ai.run('audio-transcription', '@Google/gemini-1.5-flash-8b', {
  messages: [
    {
      role: 'user',
      content: {
        audios: ['file://test.mp3', buffer],
      },
    },
  ],
})

console.log({ result: result.content })
