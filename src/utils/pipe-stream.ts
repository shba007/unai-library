export default function <T>(
  stream: ReadableStream<Uint8Array>,
  pipeFunction: (value: any) => T,
) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();

  return new ReadableStream<T>({
    start(controller) {
      let chunkBuffer = "";

      reader.read().then(function processText({ done, value }) {
        if (done) {
          controller.close();
          return;
        }

        // console.log("Inside pipeStream Function", { value })
        if (!(value instanceof Uint8Array))
          throw new Error("Steam is not a valid Uint8Array");

        let dataChunk: string | string[] = decoder.decode(value);
        // console.log({ chunk })
        //
        dataChunk = dataChunk.split("\n\n");
        dataChunk = dataChunk.filter((chunk) => chunk.length);

        dataChunk.forEach((chunk) => {
          chunk = chunkBuffer + chunk;
          // console.log("Inside pipeStream Function", { text: chunk, chunkBuffer })

          try {
            chunk = chunk.slice(5).trim();

            if (!chunk.length) return;

            chunk = JSON.parse(chunk);
            // console.log("Inside pipeStream Function", { json: chunk })

            const pipedChunk = pipeFunction(chunk);
            // console.log("Inside pipeStream Function", { pipedChunk })

            if (!pipedChunk) return;

            controller.enqueue(pipedChunk);
            chunkBuffer = "";
          } catch (error) {
            chunkBuffer += chunk;
            // console.error("\nJSON parse failed", { dataChunk, chunk }, '\n')
          }
        });

        return reader.read().then(processText);
      });
    },
  });
}
