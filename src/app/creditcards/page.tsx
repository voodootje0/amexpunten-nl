'use client';

import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaPlane, 
  FaShieldAlt, 
  FaCreditCard, 
  FaBuilding,
  FaExchangeAlt,
  FaUtensils,
  FaShoppingBag,
  FaPassport,
  FaChartLine,
  FaMoneyBillWave,
  FaPlaneDeparture,
  FaUsers,
  FaCoins
} from 'react-icons/fa';
import consumerCards from '@/data/cards/consumer-cards.json';
import { IconType } from 'react-icons';

const featuredCardIds = ['platinum', 'gold', 'flying-blue-platinum'] as const;

const benefitIcons: Record<string, IconType> = {
  'Snelle grenspassage op Schiphol en Eindhoven': FaPassport,
  'Onbeperkt luchthaven loungetoegang': FaPlane,
  'Drie keer per jaar een diner': FaUtensils,
  '4x per jaar gratis luchthaven loungetoegang': FaPlane,
  'Jaarlijks tot 100 euro dinertegoed': FaUtensils,
  'Tegoed voor Amazon Prime abonnement': FaShoppingBag,
  'Spaar 1 punt per 1 uitgegeven euro': FaCoins,
  '2 extra kaarten voor familieleden of vrienden': FaUsers,
  'Verzekerd kopen en onbezorgd op reis': FaShieldAlt,
  'Ontvang elk jaar 60 Experience Points (XP)': FaChartLine,
  'Ontvang elk jaar 30 Experience Points (XP)': FaChartLine,
  'Ontvang elk jaar 15 Experience Points (XP)': FaChartLine,
  'Geen jaarlijkse kosten': FaMoneyBillWave,
  'Fly now Pay later': FaPlaneDeparture,
  'Spaar 1,5 Miles per 1 uitgegeven euro': FaCoins,
  'Spaar 1 Mile per 1 uitgegeven euro': FaCoins,
  'Spaar 0,8 Miles per 1 uitgegeven euro': FaCoins,
  'Spaar 1 Mile per 2 uitgegeven euro&apos;s': FaCoins,
};

type Card = {
  id: string;
  name: string;
  type: string;
  color: string;
  annualFee: number;
  welcomeBonus: {
    points?: number;
    miles?: number;
    spend: number;
    period: string;
  };
  benefits: Array<{
    title: string;
    description: string;
  }>;
  image: string;
};

type CardsData = {
  cards: {
    [key: string]: Card;
  };
};

export default function CreditCardsPage() {
  const cardsData = consumerCards as CardsData;
  const featuredCards = featuredCardIds.map(id => cardsData.cards[id]);
  const allCards = Object.values(cardsData.cards);

  return (
    <Layout title="Credit Cards" description="Vergelijk en ontdek de beste American Express credit cards.">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-gray-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ontdek de beste Amex-kaarten voor elke levensstijl
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Vergelijk voordelen, bonussen en kosten om de perfecte kaart te vinden.
            </p>
            <Link
              href="/vergelijking-creditcard"
              className="inline-block bg-yellow-400/90 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Vergelijk Kaarten
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cards Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Uitgelichte Kaarten</h2>
          <div className="flex justify-center">
            <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory max-w-full">
              {featuredCards.map((card) => (
                <div key={card.id} className="flex-none w-[300px] md:w-[350px] snap-center">
                  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl border border-gray-100 h-full flex flex-col">
                    <div className="mb-6">
                      <Image
                        src={card.image}
                        alt={card.name}
                        width={300}
                        height={189}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{card.name}</h3>
                    <div className="space-y-3 mb-6 flex-grow">
                      {card.benefits.slice(0, 3).map((benefit, index) => {
                        const Icon = benefitIcons[benefit.title] || FaCreditCard;
                        return (
                          <div key={index} className="flex items-start">
                            <Icon className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">{benefit.title}</p>
                              <p className="text-xs text-gray-600">{benefit.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mb-6">
                      <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                        €{card.annualFee} per jaar
                      </span>
                    </div>
                    <div className="flex gap-3 mt-auto">
                      <Link
                        href={`/creditcards/${card.id}`}
                        className="flex-1 bg-blue-600 text-white text-center py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Meer informatie
                      </Link>
                      <Link
                        href="/vergelijking-creditcard"
                        className="flex-1 bg-yellow-400/90 text-gray-900 text-center py-2.5 rounded-lg hover:bg-yellow-400 transition-colors text-sm font-medium flex items-center justify-center"
                      >
                        <FaExchangeAlt className="w-4 h-4 mr-1.5" />
                        Vergelijk
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Cards Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Alle Kaarten</h2>
          <div className="h-[600px] overflow-y-auto pr-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allCards.map((card) => (
                <div key={card.id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl border border-gray-100 h-full flex flex-col">
                  <div className="mb-6">
                    <Image
                      src={card.image}
                      alt={card.name}
                      width={250}
                      height={157}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{card.name}</h3>
                  <div className="space-y-3 mb-6 flex-grow">
                    {card.benefits.slice(0, 2).map((benefit, index) => {
                      const Icon = benefitIcons[benefit.title] || FaCreditCard;
                      return (
                        <div key={index} className="flex items-start">
                          <Icon className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{benefit.title}</p>
                            <p className="text-xs text-gray-600">{benefit.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mb-6">
                    <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                      €{card.annualFee} per jaar
                    </span>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <Link
                      href={`/creditcards/${card.id}`}
                      className="flex-1 bg-blue-600 text-white text-center py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Meer info
                    </Link>
                    <Link
                      href="/vergelijking-creditcard"
                      className="flex-1 bg-yellow-400/90 text-gray-900 text-center py-2.5 rounded-lg hover:bg-yellow-400 transition-colors text-sm font-medium flex items-center justify-center"
                    >
                      <FaExchangeAlt className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ontvang nu 30.000 punten bij je eerste uitgave!
            </h2>
            <p className="text-lg mb-6 text-blue-100">
              Geldig voor nieuwe aanmeldingen tot 31 december 2024
            </p>
            <Link
              href="/offers"
              className="inline-block bg-yellow-400/90 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Bekijk Aanbiedingen
            </Link>
          </div>
        </div>
      </section>

      {/* Business Cards CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FaBuilding className="w-12 h-12 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ook zakelijke kaarten beschikbaar</h2>
            <p className="text-xl text-gray-600 mb-8">
              Ontdek de voordelen van zakelijke Amex-kaarten voor uw onderneming
            </p>
            <Link
              href="/business-cards"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Bekijk zakelijke kaarten
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
} 