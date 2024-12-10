import { $fetch } from "ofetch";
import type { DistilledParams } from "./types";
import { env } from "std-env";

interface OpenAIResponse {}

const OPENAI_BASE_URL = "https://api.openai.com/v1";

export async function openAI(model: string, params: DistilledParams) {
  const res = await $fetch("/chat/completions", {
    baseURL: OPENAI_BASE_URL,
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    method: "POST",
    body: {
      model: model,
      stream: params.stream,
      messages: params.messages,
    },
    responseType: params.stream ? "stream" : "json",
  });

  return { content: res as string };
}
