'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const languages = [
  'Python',
  'JavaScript',
  'TypeScript',
  'C',
  'C++',
  'Java',
  'Go',
  'Ruby',
  'VBA',
  'DAX',
  'PowerShell'
];


const models = [

  'Qwen/Qwen2.5-Coder-32B-Instruct',
  'Qwen/Qwen2.5-72B-Instruct',
  'meta-llama/Meta-Llama-3.1-405B-Instruct',
  'deepseek-ai/DeepSeek-Coder-V2-Lite-Instruct',
  'meta-llama/Meta-Llama-3.1-70B-Instruct',
  'Qwen/Qwen2.5-Coder-7B',
]

interface PromptFormProps {
  onSubmit: (prompt: string, language: string, model: string) => Promise<void>
  isLoading: boolean
}

export default function PromptForm({ onSubmit, isLoading }: PromptFormProps) {
  const [prompt, setPrompt] = useState('')
  const [language, setLanguage] = useState(languages[0])
  const [model, setModel] = useState(models[0])
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt) {
      toast({
        title: "Error",
        description: "Please enter a prompt.",
        variant: "destructive",
      })
      return
    }
    try {
      await onSubmit(prompt, language, model)
    } catch (error) {
      console.error('Error generating code:', error)
      toast({
        title: "Error",
        description: "Failed to generate code. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="What do you want to code?"
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
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Code'}
      </Button>
    </form>
  )
}
