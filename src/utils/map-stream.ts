export default function <T>(stream: ReadableStream<Uint8Array>, mapFunction: (value: any) => T) {
  const reader = stream.getReader()
  const decoder = new TextDecoder()

  return new ReadableStream<T>({
    async start(controller) {
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          controller.close()
          break
        } else if (value) {
          const chunks = decoder.decode(value, { stream: true }).split(/\r\n|\n\n/)

          for (const chunk of chunks) {
            try {
              if (chunk.length === 0 || chunk.slice(6).length === 0) continue

              const parsedChunk = JSON.parse(chunk.slice(6)) as T
              const mappedChunk = mapFunction(parsedChunk)
              if (mappedChunk) {
                controller.enqueue(mappedChunk)
              }
            } catch {
              // console.warn('Event Server', error, { chunk })
            }
          }
        }
      }
    },
  })
}
