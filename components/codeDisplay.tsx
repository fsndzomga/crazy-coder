'use client'

import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useState } from 'react'

export default function CodeDisplay() {
  const [code, setCode] = useState('')

  // useEffect(() => {
  //   const handleCodeChunk = (event: CustomEvent<string>) => {
  //     setCode((prevCode) => prevCode + event.detail)
  //   }

  //   window.addEventListener('codeChunk' as any, handleCodeChunk as EventListener)

  //   return () => {
  //     window.removeEventListener('codeChunk' as any, handleCodeChunk as EventListener)
  //   }
  // }, [])
  useEffect(() => {
    let buffer = ""; // Temporary buffer to hold incomplete chunks

    const handleCodeChunk = (event: CustomEvent<string>) => {
      buffer += event.detail;

      // Check for a complete markdown unit (e.g., double newlines or code block end)
      if (buffer.endsWith('\n\n') || buffer.endsWith('```')) {
        setCode((prevCode) => prevCode + buffer);
        buffer = ""; // Clear the buffer
      }
    };

    window.addEventListener('codeChunk', handleCodeChunk);

    return () => {
      window.removeEventListener('codeChunk', handleCodeChunk);
    };
  }, []);


  return (
    <ScrollArea className="h-full rounded-md border">
      <div className="p-4">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <pre className={`p-4 rounded bg-muted ${className}`}>
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code className={`bg-muted px-1 py-0.5 rounded ${className}`} {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {code}
        </ReactMarkdown>
      </div>
    </ScrollArea>
  )
}
