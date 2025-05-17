'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Star, Shield, Gift, Award, Check, ArrowRight } from 'lucide-react';
import consumerCards from '@/data/cards/consumer-cards.json';
import businessCards from '@/data/cards/business-cards.json';
import { Card } from '@/types/cards';
import Layout from '@/components/Layout';

export default function CreditCardPage() {
  const params = useParams();
  const [card, setCard] = useState<Card | null>(null);

  useEffect(() => {
    // Zoek de kaart in zowel consumer als business cards
    const allCards: Record<string, Card> = {
      ...consumerCards.cards,
      ...businessCards.business,
      ...businessCards.corporate,
    };
    setCard(allCards[params.id as string] || null);
  }, [params.id]);

  if (!card) {
    return (
      <Layout title="Kaart niet gevonden" description="De opgevraagde credit card kon niet worden gevonden.">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Kaart niet gevonden</h1>
            <p className="text-gray-600">De opgevraagde credit card kon niet worden gevonden.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const getCardColor = (color: Card['color']) => {
    switch (color) {
      case 'platinum':
        return 'from-slate-400 to-slate-600';
      case 'gold':
        return 'from-amber-400 to-yellow-600';
      case 'green':
        return 'from-emerald-400 to-green-600';
      case 'silver':
        return 'from-slate-300 to-slate-500';
      case 'blue':
        return 'from-blue-400 to-blue-600';
      default:
        return 'from-slate-400 to-slate-600';
    }
  };

  const isFlyingBlue = card.type === 'flyingBlue';
  const pointsLabel = isFlyingBlue ? 'miles' : 'punten';

  return (
    <Layout
      title={card.name}
      description={`Ontdek de voordelen van de ${card.name} credit card.`}
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              <span className="block">{card.name}</span>
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {card.annualFee === 0 ? 'Geen jaarlijkse kosten' : `€${card.annualFee} per jaar`}
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Ontdek de exclusieve voordelen en privileges van de {card.name} credit card.
            </p>
          </div>
        </div>
      </div>

      {/* Welcome Bonus Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Welkomstbonus</h2>
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Gift className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {card.welcomeBonus.points?.toLocaleString() || card.welcomeBonus.miles?.toLocaleString()}{' '}
                      {pointsLabel}
                    </h3>
                    <p className="text-gray-600">
                      bij {card.welcomeBonus.spend.toLocaleString()} euro uitgeven in {card.welcomeBonus.period}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Start direct met het verzamelen van {pointsLabel} en geniet van de voordelen.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
                <img
                  src="/images/welcome-bonus.jpg"
                  alt="Welkomstbonus"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Belangrijkste voordelen</h2>
            <p className="mt-4 text-lg text-gray-600">
              Ontdek de exclusieve voordelen van de {card.name}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {card.benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
                </div>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insurance Section */}
      {card.insurance && card.insurance.length > 0 && (
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Verzekeringen</h2>
              <p className="mt-4 text-lg text-gray-600">
                Reis en koop met een gerust hart
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {card.insurance.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{item}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Earning Rates Section */}
      {card.earningRates && card.earningRates.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Verdienratio's</h2>
              <p className="mt-4 text-lg text-gray-600">
                Verdien {pointsLabel} bij al je uitgaven
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {card.earningRates.map((rate, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{rate.category}</h3>
                      <p className="text-2xl font-bold text-blue-500">{rate.multiplier}x</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{rate.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Klaar om te beginnen?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Ontdek alle voordelen van de {card.name} en begin direct met het verzamelen van {pointsLabel}.
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-medium rounded-full hover:bg-gray-100 transition-colors shadow-lg">
            Direct aanvragen
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </Layout>
  );
} 