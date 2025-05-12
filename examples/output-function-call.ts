import fs from 'node:fs'
import { initAI } from '../src'
import { Tool } from '../src/types'

const ai = initAI()

const tools: Record<string, Tool> = {
  getWeather: {
    definition: {
      description: 'Get current temperature for provided coordinates in celsius.',
      parameters: {
        latitude: { type: 'number', required: true },
        longitude: { type: 'number', required: true },
      },
      strict: true,
    },
    function: async ({ latitude, longitude }: { latitude: number; longitude: number }) => {
      console.log(`getWeather called with ${latitude} ${longitude}`)
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
      )
      const data = await response.json()
      return data.current.temperature_2m
    },
  },
  getJoke: {
    definition: {
      description: 'Get a random joke.',
      parameters: {},
      strict: true,
    },
    function: async () => {
      console.log(`getJoke`)
      const response = await fetch('https://official-joke-api.appspot.com/random_joke')
      const data = await response.json()
      return `${data.setup} ${data.punchline}`
    },
  },
  getTime: {
    definition: {
      description: 'Get the current server time in ISO format.',
      parameters: {},
      strict: true,
    },
    function: async () => {
      console.log(`getTime`)
      return new Date().toISOString()
    },
  },
  getExchangeRate: {
    definition: {
      description: 'Get the exchange rate from one currency to another.',
      parameters: {
        from: { type: 'string', required: true },
        to: { type: 'string', required: true },
      },
      strict: true,
    },
    function: async ({ from, to }: { from: string; to: string }) => {
      // console.log(`getExchangeRate ${from} ${to}`)
      const response = await fetch(`https://open.er-api.com/v6/latest/${from}`)
      const data = await response.json()
      return data.rates[to]
    },
  },
}

const result = await ai.run(
  'tool-use',
  '@OpenAI/gpt-4o:latest',
  {
    messages: [{ role: 'user', content: 'What is the weather like in Paris and Kolkata today? Tell me a joke with current time? get the exchange rate of inr to usd' }],
    stream: false,
    tools,
  },
  function debugCallback(body: object) {
    fs.writeFileSync('./dump-body.json', JSON.stringify(body, undefined, 2))
  }
)

console.log({ result: result.content })
