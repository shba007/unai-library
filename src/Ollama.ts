import { $fetch } from "ofetch";
import { DistilledParams } from "./types";
import { env } from "std-env";

interface OllamaResponse {}

export async function ollama(model: string, params: DistilledParams) {
  const res = $fetch("/", {
    baseURL: env.OLLAMA_BASE_URL ?? "http://localhost:11434",
    method: "POST",
    body: {
      model,
      stream: params.stream,
      messages: params.messages,
    },
    responseType: params.stream ? "stream" : undefined,
  });

  return { content: res as Promise<string | ReadableStream<Uint8Array>> };
}
