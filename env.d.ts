declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Server Configuration
      NODE_ENV: "development" | "production" | "test";

      // Feature Flags
      DEBUG_MODE?: "true" | "false";

      // Logging
      LOG_LEVEL?: "debug" | "info" | "warn" | "error";

      GEMINI_API_KEY: string;
      OPENAI_API_KEY: string;
      OLLAMA_BASE_URL: string;

      [key: string]: string | undefined;
    }
  }
}

export {};
