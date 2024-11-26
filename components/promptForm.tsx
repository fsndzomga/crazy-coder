// 'use client';

// import { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const languages = ['python', 'js', 'ts', 'C', 'golang', 'vba', 'rust', 'others'];
// const models = [
//   'Qwen/Qwen2.5-Coder-7B',
//   'Qwen/Qwen2.5-Coder-32B-Instruct',
//   'deepseek-ai/DeepSeek-Coder-V2-Lite-Instruct',
//   'meta-llama/Meta-Llama-3.1-70B-Instruct',
//   'meta-llama/Meta-Llama-3.1-405B-Instruct',
// ];

// export default function PromptForm({
//   onCompletionChange,
// }: {
//   onCompletionChange: (prompt: string, language: string, model: string) => void;
// }) {
//   const [prompt, setPrompt] = useState('');
//   const [language, setLanguage] = useState(languages[0]);
//   const [model, setModel] = useState(models[0]);
//   const [isLoading, setIsLoading] = useState(false);

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setIsLoading(true);
//     onCompletionChange(prompt, language, model);
//     setIsLoading(false);
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <Textarea
//         placeholder="Enter your prompt here..."
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         className="min-h-[200px]"
//       />
//       <Select value={language} onValueChange={setLanguage}>
//         <SelectTrigger>
//           <SelectValue placeholder="Select language" />
//         </SelectTrigger>
//         <SelectContent>
//           {languages.map((lang) => (
//             <SelectItem key={lang} value={lang}>
//               {lang}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//       <Select value={model} onValueChange={setModel}>
//         <SelectTrigger>
//           <SelectValue placeholder="Select model" />
//         </SelectTrigger>
//         <SelectContent>
//           {models.map((m) => (
//             <SelectItem key={m} value={m}>
//               {m}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//       <Button type="submit" disabled={isLoading}>
//         {isLoading ? 'Generating...' : 'Generate Code'}
//       </Button>
//     </form>
//   );
// }
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const languages = ['python', 'js', 'ts', 'C', 'golang', 'vba', 'rust', 'other']
const models = [
  'Qwen/Qwen2.5-Coder-7B',
  'Qwen/Qwen2.5-Coder-32B-Instruct',
  'deepseek-ai/DeepSeek-Coder-V2-Lite-Instruct',
  'meta-llama/Meta-Llama-3.1-70B-Instruct',
  'meta-llama/Meta-Llama-3.1-405B-Instruct'
]

export default function PromptForm() {
  const [prompt, setPrompt] = useState('')
  const [language, setLanguage] = useState(languages[0])
  const [model, setModel] = useState(models[0])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, language, model }),
      })
      if (!response.ok) {
        throw new Error('Failed to generate code')
      }
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      while (reader) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        const splitChunk = chunk.split(':')[1].split('"')[1]
        console.log('splitChunk:', splitChunk)

        if (splitChunk === 'finishReason') {
          break
        }
        // Dispatch an event with the new chunk of code
        window.dispatchEvent(new CustomEvent('codeChunk', { detail: splitChunk }))
      }
    } catch (error) {
      console.error('Error generating code:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[200px]"
      />
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger>
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={model} onValueChange={setModel}>
        <SelectTrigger>
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((m) => (
            <SelectItem key={m} value={m}>
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" disabled={isGenerating}>
        {isGenerating ? 'Generating...' : 'Generate Code'}
      </Button>
    </form>
  )
}
