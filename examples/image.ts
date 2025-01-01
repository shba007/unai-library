import { initAI } from '../src'

const ai = initAI()

const result = await ai.run('@Google/gemini-1.5-flash-8b', {
  messages: [
    {
      role: 'user',
      content: {
        text: 'What is the sky color in this image',
        images: ['https://t4.ftcdn.net/jpg/01/62/69/25/360_F_162692511_SidIKVCDnt5UKHPNqpCb2MSKvfBlx1lG.jpg'],
      },
    },
  ],
})

console.log({ result: result.content })
