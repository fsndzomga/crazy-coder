'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import Image from 'next/image';

export function Terminal() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const terminalSteps = [
      'import { createOpenAI } from "@ai-sdk/openai";',
      'import { generateText } from "ai";',
      'const openai = createOpenAI({',
      '   apiKey: process.env.NEBIUS_API_KEY,',
      '   baseURL: process.env.NEBIUS_BASE_URL,',
      '});',
      'const model = openai("Qwen/Qwen2.5-Coder-32B-Instruct");',
      'const { text } = await generateText({',
      '   model,',
      '   prompt: "generate a function that returns future date of birth of AGI",',
      '});',
    ];
    navigator.clipboard.writeText(terminalSteps.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-lg shadow-lg overflow-hidden bg-gray-900 text-white font-mono text-sm relative">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <button
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <Check className="h-5 w-5" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className="space-y-2">
          <Image
            src="/agicode-vf.png"
            alt="Terminal Illustration"
            className="rounded-md"
            style={{ width: '100%', height: 'auto' }}
            width={500}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
