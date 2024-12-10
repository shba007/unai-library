import { $fetch } from "ofetch";
import { DistilledParams } from "./types";
import { env } from "std-env";

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
      role: string;
    };
    finishReason: string;
    avgLogprobs: number;
  }[];
  usageMetadata: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
  modelVersion: string;
}

const GEMINI_BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models";

export async function gemini(model: string, params: DistilledParams) {
  const res = await $fetch<GeminiResponse>(
    `/${model}:${params.stream ? "streamGenerateContent" : "generateContent"}`,
    {
      baseURL: GEMINI_BASE_URL,
      method: "POST",
      query: {
        ...(params.stream ? { alt: "sse" } : {}),
        key: env.GEMINI_API_KEY,
      },
      body: {
        contents: [
          {
            parts: params.messages.map(({ content }) => ({ text: content })),
          },
        ],
        /*       generationConfig: {
        response_mime_type: 'application/json',
        response_schema: {
          type: 'ARRAY',
          items: {
            type: 'OBJECT',
            properties: {
              recipe_name: { type: 'STRING' },
            },
          },
        },
      }, */
      },
      responseType: params.stream ? "stream" : "json",
    },
  );

  // console.log('\n\n\n\n Gemini', { res: JSON.stringify(res) }, '\n\n\n\n')

  return {
    content: res.candidates.map(({ content }) => content.parts[0].text).at(-1)!,
  };
}
