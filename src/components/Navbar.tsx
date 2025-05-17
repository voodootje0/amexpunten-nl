'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-900 to-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">
                Amex Punten
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/creditcards" 
              className="text-gray-200 hover:text-white transition-colors duration-200 font-medium"
            >
              Credit Cards
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-200 hover:text-white transition-colors duration-200 font-medium"
            >
              Blog
            </Link>
            <Link 
              href="/calculator" 
              className="text-gray-200 hover:text-white transition-colors duration-200 font-medium"
            >
              Calculator
            </Link>
            <Link 
              href="/bonussen" 
              className="text-gray-200 hover:text-white transition-colors duration-200 font-medium"
            >
              Bonussen
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-200 hover:text-white focus:outline-none"
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
                href="/creditcards" 
                className="text-gray-200 hover:text-white transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Credit Cards
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-200 hover:text-white transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/calculator" 
                className="text-gray-200 hover:text-white transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Calculator
              </Link>
              <Link 
                href="/bonussen" 
                className="text-gray-200 hover:text-white transition-colors duration-200 font-medium"
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