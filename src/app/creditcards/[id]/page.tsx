'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import consumerCards from '@/data/cards/consumer-cards.json';
import { Card } from '@/types/cards';
import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { Gift, Award, ArrowRight } from 'lucide-react';

export default function CreditCardPage() {
  const params = useParams();
  const [card, setCard] = useState<Card | null>(null);

  useEffect(() => {
    // Only use consumer cards
    const allCards: Record<string, Card> = {
      ...consumerCards.cards,
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

  // Get 3 main voordelen, rest as 'other'
  const mainBenefits = card.benefits.slice(0, 3);
  const otherBenefits = card.benefits.slice(3);

  // Find upgrade cards (higher annual fee, not self)
  const upgradeCards = Object.values(consumerCards.cards)
    .filter(c => c.annualFee > card.annualFee && c.id !== card.id)
    .sort((a, b) => a.annualFee - b.annualFee)
    .slice(0, 3);

  const pointsLabel = card.type === 'flyingBlue' ? 'miles' : 'punten';

  return (
    <Layout
      title={card.name}
      description={`Ontdek de voordelen van de ${card.name} credit card.`}
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/img/creditcard-bg.svg')] bg-cover bg-center opacity-10 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 text-center z-10">
          <div className="flex justify-center mb-6">
            <Image src={card.image} alt={card.name} width={260} height={160} className="rounded-xl shadow-lg bg-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow">{card.name}</h1>
          <p className="text-lg md:text-xl text-blue-100 mb-2">
            {card.annualFee === 0 ? 'Geen jaarlijkse kosten' : `€${card.annualFee} per jaar`}
          </p>
        </div>
      </section>

      {/* Welkomstbonus (smaller) */}
      <section className="max-w-2xl mx-auto mb-8 px-4">
        <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 shadow-sm">
          <Gift className="w-7 h-7 text-blue-500" />
          <div>
            <span className="font-semibold text-blue-900">
              {card.welcomeBonus.points?.toLocaleString() || card.welcomeBonus.miles?.toLocaleString()} {pointsLabel}
            </span>
            <span className="text-gray-700 ml-2 text-sm">
              bij {card.welcomeBonus.spend.toLocaleString()} euro uitgeven in {card.welcomeBonus.period}
            </span>
          </div>
        </div>
      </section>

      {/* Main Benefits */}
      <section className="max-w-5xl mx-auto mb-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mainBenefits.map((benefit, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border border-gray-100">
              <Award className="w-8 h-8 text-blue-500 mb-2" />
              <h3 className="font-semibold text-lg text-gray-900 mb-1">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Other Benefits Table */}
      {otherBenefits.length > 0 && (
        <section className="max-w-3xl mx-auto mb-12 px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Alle voordelen</h2>
          <table className="w-full bg-white rounded-xl shadow border border-gray-100 text-sm">
            <tbody>
              {otherBenefits.map((benefit, idx) => (
                <tr key={idx} className="border-b last:border-b-0">
                  <td className="py-3 px-4 font-medium text-gray-900 w-1/3">{benefit.title}</td>
                  <td className="py-3 px-4 text-gray-700">{benefit.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Upgrade Cards Section */}
      {upgradeCards.length > 0 && (
        <section className="max-w-5xl mx-auto mb-12 px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Upgrade mogelijkheden</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {upgradeCards.map((upgrade) => (
              <div key={upgrade.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center border border-gray-100">
                <Image src={upgrade.image} alt={upgrade.name} width={180} height={110} className="mb-3 rounded" />
                <h3 className="font-semibold text-gray-900 mb-2 text-center">{upgrade.name}</h3>
                <p className="text-gray-700 mb-2 text-sm">€{upgrade.annualFee} per jaar</p>
                <Link href={`/creditcards/${upgrade.id}`} className="bg-blue-600 text-white px-4 py-2 rounded text-xs font-medium hover:bg-blue-700 transition-colors mb-2">
                  Bekijk kaart
                </Link>
                <a href={upgrade.referralUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-yellow-400/90 text-gray-900 px-4 py-2 rounded text-xs font-semibold hover:bg-yellow-400 transition-colors">
                  Direct aanvragen
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Aanvraag CTA */}
      <section className="max-w-2xl mx-auto mb-16 px-4">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 py-10 px-6 rounded-2xl text-center shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">
            Klaar om te beginnen?
          </h2>
          <p className="text-lg text-white/90 mb-6">
            Ontdek alle voordelen van de {card.name} en begin direct met het verzamelen van {pointsLabel}.
          </p>
          <a
            href={card.referralUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-medium rounded-full hover:bg-gray-100 transition-colors shadow-lg"
          >
            Direct aanvragen
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </section>
    </Layout>
  );
} 