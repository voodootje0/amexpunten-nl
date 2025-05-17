export type WelcomeBonus = {
  points?: number;
  miles?: number;
  spend: number;
  period: string;
};

export type EarningRate = {
  category: string;
  multiplier: number;
  description: string;
};

export type Benefit = {
  title: string;
  description: string;
};

export type Card = {
  id: string;
  name: string;
  type: string;
  category?: string;
  annualFee: number;
  welcomeBonus: {
    points?: number;
    miles?: number;
    spend: number;
    period: string;
  };
  earningRates?: EarningRate[];
  benefits: {
    title: string;
    description: string;
  }[];
  insurance?: string[];
  image: string;
  color: string;
};

export type ConsumerCards = {
  cards: Record<string, Card>;
};

export type BusinessCards = {
  business: Record<string, Card>;
  corporate: Record<string, Card>;
}; 