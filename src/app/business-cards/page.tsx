'use client';

import { useState } from 'react';
import { Building2, ChevronRight, Star, Shield, Gift, Award } from 'lucide-react';
import businessCards from '@/data/cards/business-cards.json';
import { Card, BusinessCards } from '@/types/cards';
import Link from 'next/link';
import Layout from '@/components/Layout';

type CardType = 'business' | 'corporate';

export default function BusinessCardsPage() {
  const [selectedType, setSelectedType] = useState<CardType>('business');

  const cardTypes = [
    { id: 'business', name: 'Business Kaarten', icon: Building2 },
    { id: 'corporate', name: 'Corporate Kaarten', icon: Building2 },
  ];

  const getCards = (): Card[] => {
    switch (selectedType) {
      case 'business':
        return Object.values((businessCards as BusinessCards).business);
      case 'corporate':
        return Object.values((businessCards as BusinessCards).corporate);
      default:
        return [];
    }
  };

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

  return (
    <Layout
      title="Zakelijke Credit Cards"
      description="Ontdek onze zakelijke credit cards, ontworpen voor bedrijven van elke omvang."
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              <span className="block">Zakelijke Credit Cards</span>
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Voor uw bedrijf
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Ontdek onze zakelijke credit cards, speciaal ontworpen voor bedrijven van elke omvang. Van kleine ondernemingen tot grote bedrijven.
            </p>
          </div>
        </div>
      </div>

      {/* Card Type Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {cardTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id as CardType)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  selectedType === type.id
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <type.icon className="w-5 h-5" />
                <span>{type.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getCards().map((card) => {
            const isFlyingBlue = card.type === 'flyingBlue';
            const pointsLabel = isFlyingBlue ? 'miles' : 'punten';

            return (
              <div
                key={card.id}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow"
              >
                {/* Card Header */}
                <div className={`h-48 bg-gradient-to-r ${getCardColor(card.color)} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">{card.name}</h3>
                    <p className="text-white/80 mt-1">
                      {card.annualFee === 0 ? 'Geen jaarlijkse kosten' : `€${card.annualFee} per jaar`}
                    </p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Welcome Bonus */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-gray-900 font-semibold mb-2">
                      <Gift className="w-5 h-5 text-blue-500" />
                      <span>Welkomstbonus</span>
                    </div>
                    <p className="text-gray-600">
                      {card.welcomeBonus.points?.toLocaleString() || card.welcomeBonus.miles?.toLocaleString()}{' '}
                      {pointsLabel} bij{' '}
                      {card.welcomeBonus.spend.toLocaleString()} euro uitgeven in {card.welcomeBonus.period}
                    </p>
                  </div>

                  {/* Earning Rates */}
                  {card.earningRates && card.earningRates.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-gray-900 font-semibold mb-2">
                        <Star className="w-5 h-5 text-blue-500" />
                        <span>Verdienratio's</span>
                      </div>
                      <div className="space-y-2">
                        {card.earningRates.map((rate, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600">{rate.category}</span>
                            <span className="font-medium text-gray-900">{rate.multiplier}x {pointsLabel}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Benefits */}
                  {card.benefits.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-gray-900 font-semibold mb-2">
                        <Award className="w-5 h-5 text-blue-500" />
                        <span>Belangrijkste voordelen</span>
                      </div>
                      <ul className="space-y-2">
                        {card.benefits.map((benefit, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            {benefit.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Insurance */}
                  {card.insurance && card.insurance.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-gray-900 font-semibold mb-2">
                        <Shield className="w-5 h-5 text-blue-500" />
                        <span>Verzekeringen</span>
                      </div>
                      <ul className="space-y-1">
                        {card.insurance.map((item, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Link
                    href={`/business-cards/${card.id}`}
                    className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
                  >
                    Bekijk details
                    <ChevronRight className="w-5 h-5 inline-block ml-2" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
} 