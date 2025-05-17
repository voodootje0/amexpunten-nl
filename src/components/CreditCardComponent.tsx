import { FC } from 'react';

interface Benefit {
  title: string;
  description: string;
}

interface WelcomeBonus {
  points?: number;
  miles?: number;
  spend: number;
  period: string;
}

interface Card {
  id: string;
  name: string;
  type: string;
  color: string;
  annualFee: number;
  welcomeBonus: WelcomeBonus;
  benefits: Benefit[];
  image: string;
}

interface CreditCardComponentProps {
  card: Card;
}

export const CreditCardComponent: FC<CreditCardComponentProps> = ({ card }) => {
  const getCardColor = (color: string) => {
    switch (color) {
      case 'platinum':
        return 'bg-gradient-to-r from-gray-400 to-gray-600';
      case 'gold':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 'green':
        return 'bg-gradient-to-r from-green-400 to-green-600';
      case 'blue':
        return 'bg-gradient-to-r from-blue-400 to-blue-600';
      case 'silver':
        return 'bg-gradient-to-r from-gray-200 to-gray-400';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-600';
    }
  };

  return (
    <div className={`w-full aspect-[1.586] rounded-xl shadow-lg overflow-hidden ${getCardColor(card.color)}`}>
      <div className="p-6 h-full flex flex-col justify-between">
        <div>
          <h3 className="text-white text-xl font-bold mb-2">{card.name}</h3>
          <p className="text-white/80 text-sm">
            {card.type === 'flyingBlue' ? 'Flying Blue Miles' : 'Membership Rewards'}
          </p>
        </div>
        <div className="flex justify-between items-end">
          <div className="text-white/80 text-sm">
            {card.welcomeBonus.points && (
              <p>{card.welcomeBonus.points.toLocaleString()} punten</p>
            )}
            {card.welcomeBonus.miles && (
              <p>{card.welcomeBonus.miles.toLocaleString()} miles</p>
            )}
            <p>bij {card.welcomeBonus.spend.toLocaleString()}€ uitgave</p>
          </div>
          <div className="text-white/80 text-sm">
            <p>Jaarlijkse kosten: €{card.annualFee}</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 