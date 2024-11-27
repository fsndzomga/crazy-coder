'use client'

import { useState } from 'react'
import PromptForm from '@/components/promptForm'
import CodeDisplay from '@/components/codeDisplay'
import { Toaster } from "@/components/ui/toaster"
import { Spinner } from "@/components/spinner"
import Link from 'next/link';
import { CircleIcon } from 'lucide-react';

function Header() {
  return (
    <header className="border-b border-gray-200 flex flex-row md:flex-col">
      <div className="max-w-7xl mx-auto md:mx-0 px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <CircleIcon className="h-6 w-6 text-orange-500" />
          <span className="ml-2 text-xl font-semibold text-gray-900">CRAZY CODER</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="https://nebius.com/studio/inference?utm_medium=cpc&utm_source=crazyCoder&utm_campaign=Network_en_all_lgen_inference_cloud&utm_term=crazyCoder"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 invisible md:visible"
            target='_blank'
          >
            Built with ❤️ using Nebius
          </Link>
          <Link
            href="https://x.com/ndzfs"
            className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-full"
            target='_blank'
          >
            Follow me
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function GeneratePage() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (prompt: string, language: string, model: string) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/generate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, language, modelName: model }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate code')
      }

      const data = await response.json()
      setCode(data.code)
    } catch (error) {
      console.error('Error generating code:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
    <Header />
    <div className="md:flex md:flex-col h-screen bg-background">
      <div className="md:flex md:flex-1 overflow-hidden">
        <div className="md:ml-[90px] ml-0 md:w-1/2 p-6 border-r overflow-auto">
          <PromptForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
        <div className="md:w-1/2 p-6 flex items-center justify-center">
          {isLoading ? (
            <Spinner />
          ) : (
            <CodeDisplay code={code} />
          )}
        </div>
      </div>
      <Toaster />
    </div>
    </div>
  )
}
