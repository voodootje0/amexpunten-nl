import { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  showHero?: boolean;
  heroTitle?: string;
  heroDescription?: string;
}

export default function Layout({
  children,
  title = 'Amex Punten',
  description = 'Ontdek de voordelen van Amex-creditcards en leer hoe je punten kunt verdienen en inwisselen.',
  className = '',
  showHero = false,
  heroTitle,
  heroDescription,
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        {showHero && (
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {heroTitle}
                </h1>
                {heroDescription && (
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    {heroDescription}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <main className={`flex-grow ${className}`}>
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
} 