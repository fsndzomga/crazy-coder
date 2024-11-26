'use client'

import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { ScrollArea } from "@/components/ui/scroll-area"

interface CodeDisplayProps {
  code: string
}

export default function CodeDisplay({ code }: CodeDisplayProps) {
  return (
    <ScrollArea className="h-full rounded-md border-none">
      <div className="p-4">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <pre className={`p-4 rounded bg-muted ${className}`} style={{ overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code className={`bg-muted px-1 py-0.5 rounded ${className}`} style={{ overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }} {...props}>
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
