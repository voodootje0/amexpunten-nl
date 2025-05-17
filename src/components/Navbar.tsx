'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Amex Punten
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/credit-cards" 
              className="text-gray-200 hover:text-blue-400 transition-colors duration-200"
            >
              Credit Cards
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-200 hover:text-blue-400 transition-colors duration-200"
            >
              Blog
            </Link>
            <Link 
              href="/calculator" 
              className="text-gray-200 hover:text-blue-400 transition-colors duration-200"
            >
              Calculator
            </Link>
            <Link 
              href="/bonussen" 
              className="text-gray-200 hover:text-blue-400 transition-colors duration-200"
            >
              Bonussen
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-200 hover:text-blue-400 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/credit-cards" 
                className="text-gray-200 hover:text-blue-400 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Credit Cards
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-200 hover:text-blue-400 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/calculator" 
                className="text-gray-200 hover:text-blue-400 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Calculator
              </Link>
              <Link 
                href="/bonussen" 
                className="text-gray-200 hover:text-blue-400 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Bonussen
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 