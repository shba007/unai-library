import { initAI } from "../src";

const ai = initAI();

const result = await ai.run("@Gemini/gemini-1.5-flash-8b", {
  prompt: "What is the sky color",
});

console.log({ result: result.content });
