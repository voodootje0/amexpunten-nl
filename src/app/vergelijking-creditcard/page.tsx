'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Layout from '@/components/Layout';
import Image from 'next/image';
import { FaCheck, FaTimes, FaExchangeAlt, FaEuroSign, FaPlane, FaShieldAlt, FaChartLine } from 'react-icons/fa';
import consumerCards from '@/data/cards/consumer-cards.json';

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
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Vergelijk Creditcards
          </h1>
          <p className="text-base text-gray-600">
            Selecteer maximaal 3 kaarten om te vergelijken
          </p>
        </div>

        {/* Compact Grid Table with Card Selection in Header */}
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
              {Object.entries(sectionTitles).map(([section, title], sectionIdx) => {
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

        {/* Share Section */}
        {selectedCards.some(Boolean) && (
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link gekopieerd naar klembord!');
              }}
              className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs"
            >
              <FaExchangeAlt className="w-4 h-4 mr-2" />
              Deel Vergelijking
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
} 