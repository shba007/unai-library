import { initAI } from "../src";
import readStream from "../src/utils/read-stream";

const ai = initAI();

// @Google/gemini-1.5-flash-8b

const result = await ai.run("@Google/gemini-1.5-flash-8b", {
  prompt: "write 1 to 100",
  stream: true,
});

if (result.content instanceof ReadableStream) {
  console.log("Stream\n");
  readStream(result.content, ({ delta, total }) => {
    process.stdout.write(delta);
  });
} else {
  console.log("Not Stream\n", result.content);
}
