'use server'

import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const openai = createOpenAI({
  apiKey: process.env.NEBIUS_API_KEY,
  baseURL: process.env.NEBIUS_BASE_URL,
})

export async function generateCode(prompt: string, language: string, modelName: string) {
  const model = openai(modelName);

  const response = await streamText({
    model,
    prompt: `Generate ${language} code for the following prompt: ${prompt}.`,
  });

  return response.toDataStreamResponse();
}
