import { $fetch } from "ofetch";
import { DistilledParams } from "./types";
import { env } from "std-env";
import pipeStream from "./utils/pipe-stream";

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
  const res = $fetch<GeminiResponse | ReadableStream<Uint8Array>>(
    `/${model}:${params.stream ? "streamGenerateContent" : "generateContent"}`,
    {
      baseURL: GEMINI_BASE_URL,
      method: "POST",
      query: {
        key: env.GEMINI_API_KEY,
        ...(params.stream ? { alt: "sse" } : {}),
      },
      body: {
        contents: [
          {
            parts: params.messages.map(({ content }) => ({ text: content })),
          },
        ],
        /* generationConfig: {
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
      // @ts-ignore
      responseType: params.stream ? "stream" : undefined,
    },
  );

  return {
    content: await res.then((res) => {
      if (res instanceof ReadableStream) {
        let delta: string | null = null;
        let total: string | null = null;

        return pipeStream<{ delta: string; total: string }>(
          res,
          (data: GeminiResponse) => {
            const value = data.candidates
              .map(({ content }) => content.parts[0].text)
              .at(-1)!;
            delta = value;
            total = (total ?? "") + value;

            return { delta, total };
          },
        );
      } else {
        return res.candidates
          .map(({ content }) => content.parts[0].text)
          .at(-1)!;
      }
    }),
  };
}
