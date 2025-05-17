import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-gray-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">
              Amex Punten
            </h3>
            <p className="text-gray-200 leading-relaxed">
              Ontdek de voordelen van Amex-creditcards en leer hoe je punten kunt verdienen en inwisselen.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Snelle Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-gray-200 hover:text-white transition-colors font-medium">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-gray-200 hover:text-white transition-colors font-medium">
                  Calculator
                </Link>
              </li>
              <li>
                <Link href="/bonussen" className="text-gray-200 hover:text-white transition-colors font-medium">
                  Bonussen
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-200 hover:text-white transition-colors font-medium">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-200 text-sm">
              &copy; {new Date().getFullYear()} Amex Punten. Alle rechten voorbehouden.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-200 hover:text-white text-sm transition-colors font-medium">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-200 hover:text-white text-sm transition-colors font-medium">
                Algemene Voorwaarden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 