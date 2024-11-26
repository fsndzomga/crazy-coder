// 'use client';

// // import PromptForm from '@/components/promptForm';
// import CodeDisplay from '@/components/codeDisplay';
// // import { Toaster } from "@/components/ui/toaster";
// // import { useCompletion } from 'ai/react';

// // export default function GeneratePage() {
// //   const { completion, complete } = useCompletion({
// //     api: '/api/generate-code',
// //   });

// //   function getCode(prompt: string, language: string, model: string) {
// //     complete(`Generate ${language} code for the following prompt: ${prompt}. Use model: ${model}`);
// //   }

// //   return (
// //     <div className="flex flex-col h-screen bg-background">
// //       <header className="p-4 border-b">
// //         <h1 className="text-2xl font-bold">AI Code Generator</h1>
// //       </header>
// //       <div className="flex flex-1 overflow-hidden">
// //         <div className="w-1/2 p-6 border-r overflow-auto">
// //           <PromptForm onCompletionChange={getCode} />
// //         </div>
// //         <div className="w-1/2 p-6 overflow-hidden">
// //           <CodeDisplay content={completion} />
// //         </div>
// //       </div>
// //       <Toaster />
// //     </div>
// //   );
// // }

// import { useCompletion } from 'ai/react';

// export default function Page() {
//   const { completion, complete } = useCompletion({
//     api: '/api/generate-code',
//   });

//   return (
//     <div>
//       <button
//         onClick={async () => {
//           await complete('Why is the sky blue?');
//         }}
//       >
//         Generate
//       </button>

//       <div className="w-1/2 p-6 overflow-hidden">
//         <CodeDisplay content={completion} />
//       </div>
//     </div>
//   );
// }

import PromptForm from '@/components/promptForm'
import CodeDisplay from '@/components/codeDisplay'

export default function Home() {
  return (
    <div className="flex h-screen bg-background">
      <div className="w-1/2 p-6 border-r">
        <PromptForm />
      </div>
      <div className="w-1/2 p-6">
        <CodeDisplay />
      </div>
    </div>
  )
}
