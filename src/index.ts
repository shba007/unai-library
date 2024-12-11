import { gemini } from "./Gemini";
import { openAI } from "./OpenAI";
import { Params, Message, DistilledParams } from "./types";

type ollamaModel =
  | "@Ollama/Meta/llama3.2:1b"
  | "@Ollama/Meta/llama3.2:3b"
  | "@Ollama/Meta/llama3.2-vision"
  | "@Ollama/Meta/llama3.2-vision:90b"
  | "@Ollama/Meta/llama3.3";
type geminiModel =
  | "@Google/gemini-1.0-pro"
  | "@Google/gemini-1.5-flash-8b"
  | "@Google/gemini-1.5-flash"
  | "@Google/gemini-1.5-pro";
type openAIModel =
  | "@OpenAI/gpt-3.5-turbo"
  | "@OpenAI/gpt-4-turbo"
  | "@OpenAI/gpt-4"
  | "@OpenAI/gpt-4o-mini"
  | "@OpenAI/gpt-4o"
  | "@OpenAI/o1-mini"
  | "@OpenAI/o1-preview";
type perplexityModel =
  | "@Perplexity/Meta/llama-3.1-sonar-small-128k-online"
  | "@Perplexity/Meta/llama-3.1-sonar-large-128k-online"
  | "@Perplexity/Meta/llama-3.1-sonar-huge-128k-online";

type Model = ollamaModel | geminiModel | openAIModel | perplexityModel;

interface AIResponse {
  content:
    | string
    | ReadableStream<{
        delta: string;
        total: string;
      }>;
}

export function initAI() {
  return {
    run: async (model: Model, params: Params): Promise<AIResponse> => {
      {
        let result: Promise<{
          content: string | ReadableStream<any>;
        }>;

        if ("prompt" in params) {
          params.messages = [
            { role: "user", content: params.prompt },
          ] as Message[];
        } else {
          params.messages = params.messages as Message[];
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
          case "@OpenAI/o1-mini":
          case "@OpenAI/o1-preview":
            result = openAI(model.split("/").at(-1)!, distilledParams);
            break;
          case "@Google/gemini-1.0-pro":
          case "@Google/gemini-1.5-flash-8b":
          case "@Google/gemini-1.5-flash":
          case "@Google/gemini-1.5-pro":
            result = gemini(model.split("/").at(-1)!, distilledParams);
            break;
          default:
            throw new Error("Enter a valid model name");
        }

        const finalResult = await result;

        return finalResult;
      }
    },
  };
}
