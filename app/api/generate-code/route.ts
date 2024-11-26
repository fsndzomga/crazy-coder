import { NextRequest, NextResponse } from 'next/server'
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const openai = createOpenAI({
  apiKey: process.env.NEBIUS_API_KEY,
  baseURL: process.env.NEBIUS_BASE_URL,
})

export async function POST(req: NextRequest) {
  const { prompt, language, modelName } = await req.json()

  try {
    const model = openai(modelName);

    const { text } = await generateText({
      model,
      prompt: `Generate ${language} code for the following prompt: ${prompt}.`,
    });

    return NextResponse.json({ code: text })
  } catch (error) {
    console.error('Error generating code:', error)
    return NextResponse.json({ error: 'Failed to generate code' }, { status: 500 })
  }
}
