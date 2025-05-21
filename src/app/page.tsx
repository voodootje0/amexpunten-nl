import Layout from '../components/Layout';
import { Gift, TrendingUp, Shield, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import consumerCards from '@/data/cards/consumer-cards.json';

const featuredCardIds = ['platinum', 'gold', 'flying-blue-platinum'] as const;

export default function Home() {
  const cardsData = consumerCards;
  const featuredCards = featuredCardIds.map(id => cardsData.cards[id]);

  return (
    <Layout 
      title="Home | Amex Punten"
      description="Vergelijk American Express creditcards en ontdek hoe je optimaal gebruik kunt maken van je Amex punten voor reizen, cadeaus en meer."
      showHero={false}
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-gray-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ontdek de wereld van Amex punten
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Van exclusieve lounges tot reisverzekeringen. Ontdek hoe je met een Amex creditcard meer uit je uitgaven haalt.
            </p>
            <Link
              href="/creditcards"
              className="inline-block bg-yellow-400/90 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Bekijk alle kaarten
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Populaire Amex Creditcards</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ontdek onze meest populaire American Express creditcards en hun unieke voordelen
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCards.map((card) => (
            <div key={card.id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
              <div className="mb-6">
                <Image
                  src={card.image}
                  alt={card.name}
                  width={300}
                  height={189}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{card.name}</h2>
              <p className="text-gray-600 mb-4">
                {card.annualFee === 0 ? 'Geen jaarlijkse kosten' : `€${card.annualFee} per jaar`}
              </p>
              <ul className="text-gray-600 space-y-2 mb-6 flex-grow">
                {card.benefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Star className="w-4 h-4 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                    <span>{benefit.title}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href={`/creditcards/${card.id}`}
                className="inline-flex items-center bg-yellow-400/90 text-gray-900 px-6 py-2.5 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
              >
                Meer informatie
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-r from-blue-900 to-gray-800 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Waarom een Amex Creditcard?</h2>
            <p className="text-gray-200 max-w-2xl mx-auto">
              Ontdek de unieke voordelen van een American Express creditcard
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/10">
              <TrendingUp className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Verdien punten</h3>
              <p className="text-gray-200">
                Spaar punten bij al je dagelijkse uitgaven en reizen.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/10">
              <Shield className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Premium Bescherming</h3>
              <p className="text-gray-200">
                Geniet van uitgebreide reisverzekeringen en aankoopbescherming.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/10">
              <Gift className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Exclusieve Voordelen</h3>
              <p className="text-gray-200">
                Toegang tot lounges, concierge service en speciale aanbiedingen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-900 to-gray-800 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="text-center relative">
            <h2 className="text-3xl font-bold text-white mb-4">
              Vergelijk alle Amex Creditcards
            </h2>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
              Ontdek welke American Express creditcard het beste bij jou past en start met het verzamelen van punten.
            </p>
            <Link 
              href="/vergelijking-creditcard"
              className="inline-flex items-center bg-yellow-400/90 text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
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