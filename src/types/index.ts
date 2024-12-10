export interface Message {
  role: "system" | "user";
  content: string;
}

export interface BaseParams {
  stream?: boolean;
}

export interface PromptParams extends BaseParams {
  prompt: string; // Only prompt is allowed
  messages?: never;
}

export interface MessageParams extends BaseParams {
  messages: Message[]; // Only messages are allowed
  prompt?: never;
}

export type Params = PromptParams | MessageParams;

export interface DistilledParams {
  stream: boolean;
  messages: Message[];
}
