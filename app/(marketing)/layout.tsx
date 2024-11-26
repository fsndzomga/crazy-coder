'use client';

import Link from 'next/link';
import { CircleIcon } from 'lucide-react';

function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <CircleIcon className="h-6 w-6 text-orange-500" />
          <span className="ml-2 text-xl font-semibold text-gray-900">CRAZY CODER</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="https://nebius.com/studio/inference?utm_medium=cpc&utm_source=crazyCoder&utm_campaign=Network_en_all_lgen_inference_cloud&utm_term=crazyCoder"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
            target='_blank'
          >
            Built with ❤️ using Nebius
          </Link>
          <Link
            href="/generate"
            className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-full"
          >
            Code
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      {children}
    </section>
  );
}
