import { gemini } from "./Gemini";
import { openAI } from "./OpenAI";
import { Params, Message, DistilledParams } from "./types";

type ollamaModel =
  | "@Ollama/llama3.2:1b"
  | "@Ollama/llama3.2:3b"
  | "@Ollama/llama3.3"
  | "@Ollama/llama3.2-vision"
  | "@Ollama/llama3.2-vision:90b";
type geminiModel =
  | "@Gemini/gemini-1.0-pro"
  | "@Gemini/gemini-1.5-flash-8b"
  | "@Gemini/gemini-1.5-flash"
  | "@Gemini/gemini-1.5-pro";
type openAIModel =
  | "@OpenAI/gpt-3.5-turbo"
  | "@OpenAI/gpt-4-turbo"
  | "@OpenAI/gpt-4"
  | "@OpenAI/gpt-4o-mini"
  | "@OpenAI/gpt-4o";
type perplexityModel =
  | "@Perplexity/llama-3.1-sonar-small-128k-online"
  | "@Perplexity/llama-3.1-sonar-large-128k-online"
  | "@Perplexity/llama-3.1-sonar-huge-128k-online";

type Model = ollamaModel | geminiModel | openAIModel | perplexityModel;

interface AIResponse {
  content: string;
}

export function initAI() {
  async function run(model: Model, params: Params): Promise<AIResponse> {
    let result: Promise<{ content: string }>;

    if ("prompt" in params) {
      params = {
        messages: [{ role: "system", content: params.prompt }] as Message[],
      };
    } else {
      params = {
        messages: params.messages as Message[],
      };
    }

    const distilledParams: DistilledParams = {
      stream: params.stream ?? false,
      messages: params.messages,
    };

    if (distilledParams.messages.length <= 0)
      throw new Error("Messages should at least be one");

    switch (model) {
      case "@OpenAI/gpt-3.5-turbo":
      case "@OpenAI/gpt-4-turbo":
      case "@OpenAI/gpt-4":
      case "@OpenAI/gpt-4o-mini":
      case "@OpenAI/gpt-4o":
        result = openAI(model.split("/").at(-1)!, distilledParams);
        break;
      case "@Gemini/gemini-1.0-pro":
      case "@Gemini/gemini-1.5-flash-8b":
      case "@Gemini/gemini-1.5-flash":
      case "@Gemini/gemini-1.5-pro":
        result = gemini(model.split("/").at(-1)!, distilledParams);
        break;

      default:
        throw new Error("Enter a valid model name");
    }

    return await result;
  }

  return {
    run,
  };
}
