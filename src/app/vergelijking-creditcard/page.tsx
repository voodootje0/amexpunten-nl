'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Layout from '@/components/Layout';
import Image from 'next/image';
import { FaCheck, FaTimes, FaEuroSign, FaPlane, FaShieldAlt, FaChartLine } from 'react-icons/fa';
import consumerCards from '@/data/cards/consumer-cards.json';
import Link from 'next/link';

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
  allBenefits: {
    price: Record<string, number | string>;
    travel: Record<string, boolean>;
    verzekering: Record<string, boolean>;
    punten: Record<string, number>;
  };
  image: string;
};

type CardsData = {
  cards: {
    [key: string]: Card;
  };
};

const sectionIcons = {
  price: FaEuroSign,
  travel: FaPlane,
  verzekering: FaShieldAlt,
  punten: FaChartLine,
};

const sectionTitles = {
  price: 'Kosten',
  travel: 'Reisvoordelen',
  verzekering: 'Verzekeringen',
  punten: 'Punten & Miles',
};

// Helper to filter out Welkomstbonus keys
const filterPriceKeys = (keys: string[]) =>
  keys.filter(
    (k) =>
      !k.toLowerCase().includes('welkomstbonus')
  );

export default function CompareCreditCardsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cardsData = consumerCards as CardsData;
  const allCards = Object.values(cardsData.cards);

  // Initialize selected cards from URL
  const [selectedCards, setSelectedCards] = useState<string[]>(() => {
    const cards = searchParams.get('cards')?.split(',') || [];
    return cards.filter(cardId => cardsData.cards[cardId]);
  });

  // Update URL when selected cards change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedCards.length > 0) {
      params.set('cards', selectedCards.join(','));
    } else {
      params.delete('cards');
    }
    router.push(`?${params.toString()}`);
  }, [selectedCards, router, searchParams]);

  const handleCardSelection = (cardId: string, columnIndex: number) => {
    setSelectedCards(prev => {
      const newCards = [...prev];
      newCards[columnIndex] = cardId;
      return newCards;
    });
  };

  // Render value for grid
  const renderValue = (section: string, key: string, value: number | string | boolean) => {
    if (section === 'punten') {
      if (key.toLowerCase().includes('punten per euro') || key.toLowerCase().includes('miles per euro')) {
        if (typeof value === 'number' && value > 0) {
          return <span className="text-gray-800">Spaar {value} Miles/Punt per 1 uitgegeven euro</span>;
        }
        return <span className="text-gray-400">-</span>;
      }
      if (key.toLowerCase().includes('experience points')) {
        if (typeof value === 'number' && value > 0) {
          return <span className="text-gray-800">Ontvang elk jaar {value} Experience Points (XP)</span>;
        }
        return <span className="text-gray-400">-</span>;
      }
    }
    if (typeof value === 'boolean') {
      return value ? (
        <FaCheck className="w-4 h-4 text-green-500 mx-auto" />
      ) : (
        <FaTimes className="w-4 h-4 text-red-500 mx-auto" />
      );
    }
    if (typeof value === 'number') {
      return value === 0 ? 'Geen' : value;
    }
    return value;
  };

  return (
    <Layout
      title="Vergelijk Creditcards | Amex Punten"
      description="Vergelijk alle American Express creditcards en vind de beste kaart voor jou."
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/img/creditcard-bg.svg')] bg-cover bg-center opacity-10 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 text-center z-10">
          <div className="flex justify-center mb-4">
            <FaChartLine className="w-12 h-12 text-yellow-400 drop-shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow">Vergelijk alle Amex Creditcards</h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6">
            Vind de kaart die het beste bij jou past. Vergelijk voordelen, kosten en meer – snel en overzichtelijk.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Link href="#vergelijking" className="bg-yellow-400/90 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors shadow">
              Start met vergelijken
            </Link>
            <Link href="/creditcards" className="bg-white/10 border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors shadow">
              Bekijk alle kaarten
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <div id="vergelijking" className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-xs">
            <thead>
              <tr>
                <th className="w-64 bg-gray-50 sticky left-0 z-10 text-base text-gray-900 font-bold text-left align-bottom">&nbsp;</th>
                {[0, 1, 2].map((columnIndex) => (
                  <th key={columnIndex} className="bg-gray-50 font-semibold text-gray-900 text-center px-2 py-2 min-w-[160px] align-bottom">
                    <div className="flex flex-col items-center w-full">
                      <select
                        value={selectedCards[columnIndex] || ''}
                        onChange={(e) => handleCardSelection(e.target.value, columnIndex)}
                        className="w-full p-1 mb-1 border rounded bg-gray-50 text-xs"
                        style={{ minWidth: 0 }}
                      >
                        <option value="">Selecteer een kaart</option>
                        {allCards.map((card) => (
                          <option key={card.id + '-' + columnIndex} value={card.id}>
                            {card.name}
                          </option>
                        ))}
                      </select>
                      {selectedCards[columnIndex] ? (
                        <>
                          <div className="relative w-24 h-14 mb-1 flex-shrink-0 flex-grow-0 mx-auto">
                            <Image
                              src={cardsData.cards[selectedCards[columnIndex]].image}
                              alt={cardsData.cards[selectedCards[columnIndex]].name}
                              fill
                              className="object-contain rounded"
                            />
                          </div>
                          <div className="text-xs font-semibold text-center text-gray-800 leading-tight mt-1">
                            {cardsData.cards[selectedCards[columnIndex]].name}
                          </div>
                          <Link
                            href={`/creditcards/${cardsData.cards[selectedCards[columnIndex]].id}`}
                            className="mt-2 inline-block bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-blue-700 transition-colors shadow"
                          >
                            Meer info
                          </Link>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full h-14 border border-dashed border-gray-300 rounded bg-gray-50">
                          <span className="text-gray-400 text-xs">Selecteer een kaart</span>
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(sectionTitles).map(([section, title]) => {
                const Icon = sectionIcons[section as keyof typeof sectionIcons];
                let keys = Object.keys(cardsData.cards[selectedCards.find(Boolean)!]?.allBenefits[section as keyof typeof sectionTitles] || {});
                if (section === 'price') keys = filterPriceKeys(keys);
                return (
                  <>
                    {/* Section header row */}
                    <tr key={section + '-header'} className="bg-white">
                      <td colSpan={4} className="py-2 px-2 bg-gray-100 font-bold text-blue-700 text-left border-t border-b border-gray-200 text-sm">
                        <span className="inline-flex items-center gap-2">
                          <Icon className="w-4 h-4 text-blue-600" /> {title}
                        </span>
                      </td>
                    </tr>
                    {/* Section benefit rows */}
                    {keys.map((key, rowIdx) => (
                      <tr key={section + '-' + key + '-' + rowIdx} className="border-b border-gray-100">
                        <td className="py-2 px-3 bg-gray-50 text-gray-900 font-semibold sticky left-0 z-10 min-w-[220px] max-w-[320px] text-sm whitespace-pre-line">
                          {key}
                        </td>
                        {[0, 1, 2].map((colIdx) => (
                          <td key={colIdx + '-' + key + '-' + rowIdx} className="py-2 px-2 text-center align-middle">
                            {selectedCards[colIdx]
                              ? renderValue(
                                  section,
                                  key,
                                  cardsData.cards[selectedCards[colIdx]].allBenefits[section as keyof typeof sectionTitles][key]
                                )
                              : ''}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto mt-16 mb-10 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Veelgestelde vragen</h2>
        <div className="space-y-4">
          <details className="bg-gray-50 rounded p-4">
            <summary className="font-semibold cursor-pointer">Hoe kies ik de beste creditcard voor mij?</summary>
            <p className="mt-2 text-gray-700">Let op je uitgavenpatroon, gewenste voordelen (zoals reizen of sparen), en de jaarlijkse kosten. Vergelijk altijd meerdere kaarten.</p>
          </details>
          <details className="bg-gray-50 rounded p-4">
            <summary className="font-semibold cursor-pointer">Wordt mijn aanvraag altijd goedgekeurd?</summary>
            <p className="mt-2 text-gray-700">Nee, de verstrekker beoordeelt je aanvraag op basis van je financiële situatie en kredietwaardigheid.</p>
          </details>
          <details className="bg-gray-50 rounded p-4">
            <summary className="font-semibold cursor-pointer">Kan ik punten of miles sparen met elke kaart?</summary>
            <p className="mt-2 text-gray-700">Niet elke kaart spaart punten of miles. Bekijk de details per kaart in de vergelijkingstabel.</p>
          </details>
        </div>
      </section>

      {/* Tips Section */}
      <section className="max-w-3xl mx-auto mb-10 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips voor het kiezen van een creditcard</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Bepaal waarvoor je de kaart vooral wilt gebruiken (reizen, sparen, aankopen).</li>
          <li>Let op de jaarlijkse kosten en eventuele extra voordelen.</li>
          <li>Controleer of je in aanmerking komt voor de welkomstbonus.</li>
          <li>Vergelijk verzekeringen en extra services per kaart.</li>
        </ul>
      </section>

      {/* Populaire Kaarten Section */}
      <section className="max-w-7xl mx-auto mb-10 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Populaire kaarten</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {allCards.slice(0, 4).map((card) => (
            <div key={card.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
              <Image src={card.image} alt={card.name} width={180} height={110} className="mb-3 rounded" />
              <h3 className="font-semibold text-gray-900 mb-2 text-center">{card.name}</h3>
              <Link href={`/creditcards/${card.id}`} className="bg-blue-600 text-white px-4 py-2 rounded text-xs font-medium hover:bg-blue-700 transition-colors mt-auto">
                Bekijk kaart
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="max-w-3xl mx-auto mb-10 px-4">
        <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded">
          <h2 className="font-bold text-yellow-800 mb-1">Let op!</h2>
          <p className="text-yellow-900 text-sm">Gebruik creditcards verantwoord. Betaal op tijd om extra kosten en rente te voorkomen. Lees altijd de voorwaarden van de kaart die je kiest.</p>
        </div>
      </section>
    </Layout>
  );
} 