import { promises as fs } from 'node:fs'
import path from 'pathe'
import { stringifyYAML } from 'confbox'
import { z } from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'

import { initAI } from '../src'
import { roles } from '../src/jobs/role'
import { parseCSV } from '../src/utils/csv-parser'
import readStream from '../src/utils/read-stream'
import promisePool from '../src/utils/promise-pool'
import slugify from '../src/utils/slugify'
import createPath from '../src/utils/create-path'

const promptSchema = z.object({
  domain: z.enum(roles),
  task: z.string().nonempty(),
  instruction: z.string().nonempty(),
  format: z.string().nonempty(),
  examples: z.array(
    z.object({
      input: z.object({
        context: z.string().nonempty(),
      }),
      output: z.string().nonempty(),
    })
  ),
  metadata: z.object({
    tags: z.array(z.string().nonempty()),
    version: z.string().nonempty(),
    createdBy: z.string().nonempty(),
    createdAt: z.string().nonempty(),
  }),
})

type PromptSchema = z.infer<typeof promptSchema>

const ai = initAI()

async function fileParse(data?: any): Promise<PromptSchema> {
  const result = await ai.run<PromptSchema>('@OpenAI/gpt-4o', {
    prompt:
      'Below is a instruction format it in a json format keep version 0.0.0. put a simple task name in task leave instruction as it is. find the domain in 1-3 word form the task name and instruction  \n\n' +
      JSON.stringify(data),
    stream: false,
    format: zodToJsonSchema(promptSchema),
  })

  if (result.content instanceof ReadableStream) {
    // console.log('Stream\n')
    readStream(result.content, ({ delta }) => {
      process.stdout.write(delta)
    })

    return {
      domain: 'AI Specialist',
      task: '',
      instruction: '',
      format: '',
      examples: [],
      metadata: {
        tags: [],
        version: '',
        createdBy: '',
        createdAt: '',
      },
    }
  } else {
    result.content.metadata.createdAt = new Date().toISOString().split('T')[0]
    return {
      domain: result.content.domain,
      task: result.content.task,
      instruction: result.content.instruction,
      format: result.content.format,
      examples: result.content.examples,
      metadata: {
        tags: result.content.metadata.tags,
        version: result.content.metadata.version,
        createdBy: result.content.metadata.createdBy,
        createdAt: result.content.metadata.createdAt,
      },
    }
  }
}

async function main() {
  // Load prompts.csv
  const csvData = await fs.readFile(path.resolve('./src/prompts/prompts.csv'), { encoding: 'utf8' })

  const jsonData = parseCSV<{ act: string; prompt: string }>(csvData.toString()).splice(100, 200)
  await promisePool<PromptSchema>(
    jsonData.map((data) => async () => {
      const finalData = await fileParse(data)

      const filePath = createPath(`./src/prompts/${slugify(finalData.domain)}/${slugify(finalData.task)}.yml`)
      console.log({ filePath })
      await fs.writeFile(filePath, stringifyYAML(finalData))

      return finalData
    }),
    2
  )
  // console.log(jsonData)
  // console.log(await finalJsonData)
  // run main on each line
  // create a new file domain/task
}

await main()
