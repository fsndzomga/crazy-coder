import { NextRequest } from 'next/server'
import { generateCode } from '../../actions/generateCode'

export async function POST(request: NextRequest) {
  const { prompt, language, model } = await request.json()
  return generateCode(prompt, language, model)
}
