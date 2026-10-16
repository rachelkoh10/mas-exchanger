import React, { useState } from 'react';
import { 
  Plane, 
  Star, 
  Sparkles, 
  MapPin, 
  Coffee, 
  Utensils, 
  Bed, 
  Calculator,
  ArrowRight
} from 'lucide-react';
import { CurrencyItem } from '../types/currency';
import { formatCurrencyValue } from '../data/currencies';

interface TravelMatrixProps {
  currencies: CurrencyItem[];
  favorites: string[];
  onToggleFavorite: (code: string) => void;
  onSelectForCalculator: (currency: CurrencyItem) => void;
}

export const TravelMatrix: React.FC<TravelMatrixProps> = ({
  currencies,
  favorites,
  onToggleFavorite,
  onSelectForCalculator
}) => {
  const [sgBudget, setSgBudget] = useState<number>(1500);

  // Focus primarily on favorited currencies or popular SG travel destinations
  const travelCurrencies = currencies.filter(
    c => favorites.includes(c.code) || ['MYR', 'JPY', 'THB', 'IDR', 'TWD', 'KRW', 'EUR', 'GBP', 'AUD', 'VND'].includes(c.code)
  );

  const getTravelBenchmark = (code: string, localAmount: number) => {
    switch (code) {
      case 'MYR':
        return {
          coffee: `~RM 12-16 (Kopitiam ~RM 4)`,
          meal: `~RM 25-50 for nice dinner`,
          hotel: `~RM 250-450/night 4-star hotel in JB/KL`,
          power: `Strong purchasing power in Malaysia`
        };
      case 'JPY':
        return {
          coffee: `~¥ 450-600 (Conbini ~¥ 150)`,
          meal: `~¥ 1,200 for good ramen / set lunch`,
          hotel: `~¥ 12,000-20,000/night Tokyo business hotel`,
          power: `Favorable SGD to JPY rate for Singaporeans`
        };
      case 'THB':
        return {
          coffee: `~฿ 80-120 (Street ~฿ 35)`,
          meal: `~฿ 150-300 for restaurant dinner`,
          hotel: `~฿ 1,500-2,800/night Bangkok boutique hotel`,
          power: `Exceptional value for shopping & food`
        };
      case 'IDR':
        return {
          coffee: `~Rp 35,000-50,000`,
          meal: `~Rp 75,000-150,000 for café / beach club`,
          hotel: `~Rp 800,000-1,500,000/night Bali villa/resort`,
          power: `Very affordable getaways in Batam & Bali`
        };
      case 'TWD':
        return {
          coffee: `~NT$ 90-140`,
          meal: `~NT$ 150-250 (Night market ~NT$ 80/item)`,
          hotel: `~NT$ 2,200-3,800/night Taipei central hotel`,
          power: `Great night market & transit affordability`
        };
      case 'KRW':
        return {
          coffee: `~₩ 4,500-6,000`,
          meal: `~₩ 10,000-18,000 for K-BBQ / lunch set`,
          hotel: `~₩ 90,000-160,000/night Seoul hotel`,
          power: `Good value for cosmetics, dining & transit`
        };
      case 'EUR':
        return {
          coffee: `~€ 3.50-5.00`,
          meal: `~€ 22-45 for sit-down dinner`,
          hotel: `~€ 120-220/night European city hotel`,
          power: `Standard European living costs`
        };
      case 'GBP':
        return {
          coffee: `~£ 3.80-4.50`,
          meal: `~£ 20-40 for pub / restaurant meal`,
          hotel: `~£ 130-240/night London / UK hotel`,
          power: `Monitor FX dips for UK travel & studies`
        };
      default:
        return {
          coffee: `Standard beverage pricing`,
          meal: `Typical local dining cost`,
          hotel: `Mid-range accommodation`,
          power: `Tracked against official MAS rates`
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Budget Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-600 text-xs font-semibold uppercase tracking-wider mb-1">
              <Plane className="w-4 h-4" />
              <span>Singapore Traveler&apos;s Budget Matrix</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Compare your SGD budget across top destinations
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Instantly see how far your Singapore Dollars stretch abroad with real-time conversion
            </p>
          </div>

          {/* Budget Input & Presets */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4 min-w-[280px]">
            <span className="block text-xs font-semibold text-slate-500 mb-1">
              Your Singapore Budget (SGD)
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold font-mono text-slate-400">S$</span>
              <input
                type="number"
                min="10"
                step="50"
                value={sgBudget}
                onChange={(e) => setSgBudget(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full text-2xl font-bold font-mono tabular-nums text-slate-900 bg-transparent focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              {[500, 1000, 1500, 3000, 5000].map(val => (
                <button
                  key={val}
                  onClick={() => setSgBudget(val)}
                  className={`px-2 py-0.5 text-xs font-mono rounded ${
                    sgBudget === val
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  S${val.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Destination Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {travelCurrencies.map(cur => {
          const isFav = favorites.includes(cur.code);
          const convertedAmount = sgBudget / cur.sgdPerUnit;
          const benchmark = getTravelBenchmark(cur.code, convertedAmount);

          return (
            <div
              key={cur.code}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl leading-none select-none">{cur.flag}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 font-mono text-base">{cur.code}</span>
                        <span className="text-xs text-slate-400 font-normal">({cur.symbol})</span>
                      </div>
                      <div className="text-xs text-slate-500">{cur.country}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleFavorite(cur.code)}
                    className="p-1 text-slate-300 hover:text-amber-500 transition-colors"
                    title={isFav ? 'Remove favorite' : 'Add to favorites'}
                  >
                    <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-500' : ''}`} />
                  </button>
                </div>

                {/* Amount Output */}
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 mb-3">
                  <span className="text-[11px] text-slate-500 block mb-0.5">
                    S${sgBudget.toLocaleString('en-SG')} converts to:
                  </span>
                  <div className="text-2xl font-bold font-mono text-rose-700 tabular-nums truncate">
                    {cur.symbol} {formatCurrencyValue(convertedAmount, cur.code === 'IDR' || cur.code === 'VND' || cur.code === 'KRW' ? 0 : 2)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between font-mono">
                    <span>1 SGD = {formatCurrencyValue(1 / cur.sgdPerUnit, 4)} {cur.code}</span>
                    <span className={cur.change24h >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                      {cur.change24h >= 0 ? '+' : ''}{cur.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Local Purchasing Power Indicators */}
                <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Coffee className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{benchmark.coffee}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Utensils className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{benchmark.meal}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Bed className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{benchmark.hotel}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 truncate max-w-[150px]">
                  {cur.notes?.split('.')[0] || 'Real-time SGD rate'}
                </span>
                <button
                  onClick={() => onSelectForCalculator(cur)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors"
                >
                  <span>Open Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
