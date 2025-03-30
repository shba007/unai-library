import fs from 'node:fs'
import { initAI } from '../src'

const ai = initAI()

const filePath = './examples/prompt1.wav'
const audioBuffer = fs.readFileSync(filePath)

const result = await ai.run('audio-transcribe', '@OpenAI/whisper-v2', {
  messages: [
    {
      role: 'user',
      content: {
        // audios: ['file://test.mp3],
        audios: [audioBuffer],
      },
    },
  ],
})

console.log({ result: result.content })
