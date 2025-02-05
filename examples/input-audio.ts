import { initAI } from '../src'

const ai = initAI()

const result = await ai.run('audio-transcription', '@Google/gemini-1.5-flash-8b', {
  messages: [
    {
      role: 'user',
      content: {
        audios: ['file://test.mp3'],
      },
    },
  ],
})

console.log({ result: result.content })
