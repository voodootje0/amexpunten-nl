import Layout from '../components/Layout';
import { CreditCard, Calculator, Gift, TrendingUp, Shield, Clock, Plane, ShoppingBag, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout 
      title="Home | Amex Punten"
      description="Vergelijk American Express creditcards en ontdek hoe je optimaal gebruik kunt maken van je Amex punten voor reizen, cadeaus en meer."
      showHero={true}
      heroTitle="Vind de Perfecte Amex Creditcard"
      heroDescription="Vergelijk alle American Express creditcards en ontdek welke het beste bij jou past. Verdien punten bij elke aankoop en geniet van exclusieve voordelen."
    >
      {/* Popular Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Populaire Amex Creditcards</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ontdek onze meest populaire American Express creditcards en hun unieke voordelen
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
              <Plane className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Amex Gold Card</h2>
            <p className="text-gray-600 mb-4">
              Perfect voor reizigers met 2x punten op reizen en restaurants wereldwijd.
            </p>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li className="flex items-center">
                <Star className="w-4 h-4 text-blue-400 mr-2" />
                <span>4x punten op restaurants</span>
              </li>
              <li className="flex items-center">
                <Star className="w-4 h-4 text-blue-400 mr-2" />
                <span>3x punten op reizen</span>
              </li>
              <li className="flex items-center">
                <Star className="w-4 h-4 text-blue-400 mr-2" />
                <span>€120 reiskrediet per jaar</span>
              </li>
            </ul>
            <Link 
              href="/credit-cards/gold"
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
            >
              Meer informatie
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
              <ShoppingBag className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Amex Platinum Card</h2>
            <p className="text-gray-600 mb-4">
              Premium creditcard met exclusieve voordelen en maximale punten op alle uitgaven.
            </p>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li className="flex items-center">
                <Star className="w-4 h-4 text-blue-400 mr-2" />
                <span>5x punten op vliegtickets</span>
              </li>
              <li className="flex items-center">
                <Star className="w-4 h-4 text-blue-400 mr-2" />
                <span>Lounge toegang wereldwijd</span>
              </li>
              <li className="flex items-center">
                <Star className="w-4 h-4 text-blue-400 mr-2" />
                <span>€200 reiskrediet per jaar</span>
              </li>
            </ul>
            <Link 
              href="/credit-cards/platinum"
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
            >
              Meer informatie
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
              <CreditCard className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Amex Green Card</h2>
            <p className="text-gray-600 mb-4">
              Ideaal voor dagelijks gebruik met 3x punten op reizen en restaurants.
            </p>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li className="flex items-center">
                <Star className="w-4 h-4 text-blue-400 mr-2" />
                <span>3x punten op reizen</span>
              </li>
              <li className="flex items-center">
                <Star className="w-4 h-4 text-blue-400 mr-2" />
                <span>3x punten op restaurants</span>
              </li>
              <li className="flex items-center">
                <Star className="w-4 h-4 text-blue-400 mr-2" />
                <span>Geen jaarlijkse kosten</span>
              </li>
            </ul>
            <Link 
              href="/credit-cards/green"
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
            >
              Meer informatie
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Waarom een Amex Creditcard?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Ontdek de unieke voordelen van een American Express creditcard
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/10">
              <TrendingUp className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Maximale Punten</h3>
              <p className="text-gray-300">
                Verdien tot 5x punten op je dagelijkse uitgaven en reizen.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/10">
              <Shield className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Premium Bescherming</h3>
              <p className="text-gray-300">
                Geniet van uitgebreide reisverzekeringen en aankoopbescherming.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/10">
              <Gift className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Exclusieve Voordelen</h3>
              <p className="text-gray-300">
                Toegang tot lounges, concierge service en speciale aanbiedingen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="text-center relative">
            <h2 className="text-3xl font-bold text-white mb-4">
              Vergelijk alle Amex Creditcards
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Ontdek welke American Express creditcard het beste bij jou past en start met het verzamelen van punten.
            </p>
            <Link 
              href="/credit-cards"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              Vergelijk creditcards
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
} 