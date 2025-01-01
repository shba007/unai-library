# unai

<!-- automd:badges color=blue -->

[![npm version](https://img.shields.io/npm/v/@shba007/unai?color=blue)](https://npmjs.com/package/@shba007/unai)
[![npm downloads](https://img.shields.io/npm/dm/@shba007/unai?color=blue)](https://npmjs.com/package/@shba007/unai)
[![License](https://img.shields.io/npm/l/@shba007/unai?color=blue)](https://github.com/shba007/unai?tab=MIT-1-ov-file)

<!-- /automd -->

> Unified AI Adapter Library. For Ollama, Gemini, Openai

## How to Use

Install package:

<!-- automd:pm-install -->

```sh
# ✨ Auto-detect
npx nypm install @shba007/unai

# npm
npm install @shba007/unai

# yarn
yarn add @shba007/unai

# pnpm
pnpm install @shba007/unai

# bun
bun install @shba007/unai
```

<!-- /automd -->

Code:

<!-- automd:jsimport cjs cdn name="pkg" -->

**No Stream**

```ts
import { initAI } from '@shba007/unai'

const ai = initAI()

const result = await ai.run('@Google/gemini-1.5-flash-8b', {
  prompt: 'What is the sky color',
})

console.log({ result: result.content })
```

**Stream**

```ts
import { initAI, readStream } from '@shba007/unai'

const ai = initAI()

const result = await ai.run('@Google/gemini-1.5-flash-8b', {
  prompt: 'write 1 to 100',
  stream: true,
})

readStream(result.content, ({ delta, total }) => {
  process.stdout.write(delta)
})
```

## Todo

| **Feature**                | **Ollama** | **Gemini** | **OpenAI** | **Perplexity** |
| -------------------------- | ---------- | ---------- | ---------- | -------------- |
| Streamed Response          | ✅         | ✅         | ✅         | ❌             |
| Text (Unstructured) Input  | ✅         | ✅         | ✅         | ❌             |
| Text (Structured) Input    | ✅         | ✅         | ✅         | ❌             |
| Text (Unstructured) Output | ✅         | ✅         | ✅         | ❌             |
| Text (Structured) Output   | ✅         | ✅         | ✅         | ❌             |
| Document Input             | ❌         | ❌         | ❌         | ❌             |
| Document Output            | ❌         | ❌         | ❌         | ❌             |
| Image Input                | ❌         | ❌         | ✅         | ❌             |
| Image Output               | ❌         | ❌         | ❌         | ❌             |
| Audio Input                | ❌         | ❌         | ❌         | ❌             |
| Audio Output               | ❌         | ❌         | ❌         | ❌             |
| JSON Mode                  | ✅         | ✅         | ✅         | ❌             |
| Function Calling/Tool Use  | ❌         | ❌         | ❌         | ❌             |
| Memory (STM/LTM)           | ❌         | ❌         | ❌         | ❌             |
