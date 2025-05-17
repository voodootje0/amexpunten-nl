'use client';

import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl opacity-5"></div>
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
            <div className="relative bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
              <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-4">
                404
              </h1>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Pagina niet gevonden
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                De pagina die je zoekt bestaat niet of is verplaatst. Ga terug naar de homepage om verder te browsen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Terug naar Home
                </Link>
                <button
                  onClick={() => router.back()}
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Ga Terug
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 