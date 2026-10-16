import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Star, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calculator, 
  RefreshCw, 
  Check, 
  X,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { CurrencyItem, QuotationMode, RegionCategory } from '../types/currency';
import { formatCurrencyValue } from '../data/currencies';
import { Sparkline } from './Sparkline';

interface RateBoardProps {
  currencies: CurrencyItem[];
  favorites: string[];
  onToggleFavorite: (code: string) => void;
  onSelectForCalculator: (currency: CurrencyItem) => void;
  quotationMode: QuotationMode;
  setQuotationMode: (mode: QuotationMode) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const RateBoard: React.FC<RateBoardProps> = ({
  currencies,
  favorites,
  onToggleFavorite,
  onSelectForCalculator,
  quotationMode,
  setQuotationMode,
  onRefresh,
  isRefreshing
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<RegionCategory | 'favorites'>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Filter currencies
  const filteredCurrencies = useMemo(() => {
    return currencies.filter(item => {
      // Category filter
      if (selectedCategory === 'favorites') {
        if (!favorites.includes(item.code)) return false;
      } else if (selectedCategory !== 'all') {
        if (item.region !== selectedCategory) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesCode = item.code.toLowerCase().includes(q);
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCountry = item.country.toLowerCase().includes(q);
        return matchesCode || matchesName || matchesCountry;
      }

      return true;
    });
  }, [currencies, selectedCategory, favorites, searchQuery]);

  const copyRate = (text: string, code: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1800);
  };

  // Helper to calculate displayed rate based on quotation convention
  const getDisplayRate = (item: CurrencyItem) => {
    if (quotationMode === 'units-per-sgd') {
      // e.g. 1 SGD = 3.32 MYR
      const unitsPerSgd = 1 / item.sgdPerUnit;
      return {
        label: `1 SGD =`,
        value: formatCurrencyValue(unitsPerSgd, unitsPerSgd >= 100 ? 2 : 4),
        unit: item.code
      };
    } else if (quotationMode === 'mas-convention') {
      // MAS convention: per 100 units for JPY, THB, IDR, etc.
      if (item.masUnitMultiplier === 100) {
        const val = item.sgdPerUnit * 100;
        return {
          label: `100 ${item.code} =`,
          value: `S$${formatCurrencyValue(val, 4)}`,
          unit: 'SGD'
        };
      }
      return {
        label: `1 ${item.code} =`,
        value: `S$${formatCurrencyValue(item.sgdPerUnit, 4)}`,
        unit: 'SGD'
      };
    } else {
      // Standard: 1 Foreign Unit in SGD
      return {
        label: `1 ${item.code} =`,
        value: `S$${formatCurrencyValue(item.sgdPerUnit, 4)}`,
        unit: 'SGD'
      };
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Base Currency</span>
            <span className="font-mono text-[11px] text-slate-400">ISO 4217</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono">SGD</span>
            <span className="text-xs font-medium text-slate-600">Singapore Dollar</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            MAS Trade-Weighted S$NEER Policy Basket
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Causeway Benchmark</span>
            <span className="text-emerald-700 text-xs font-semibold">+0.34%</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">3.3200</span>
            <span className="text-xs font-medium text-slate-600">MYR / SGD</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            1 SGD buys approx. RM 3.32 (Ringgit)
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>US Dollar Anchor</span>
            <span className="text-rose-600 text-xs font-semibold">-0.18%</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">1.3415</span>
            <span className="text-xs font-medium text-slate-600">SGD / USD</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            1 USD = S$1.3415 mid-market rate
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Tracked Pairs</span>
            <span className="font-mono text-slate-400 text-xs">{currencies.length} active</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {favorites.length}
            </span>
            <span className="text-xs font-medium text-slate-600">Favorites Saved</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Instant conversion & calculation active
          </p>
        </div>
      </div>

      {/* Control Bar: Search & Quotation Mode */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search currency code, country, or name (e.g., MYR, Japan, Baht, USD)..."
              className="w-full pl-10 pr-9 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white text-slate-900 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quotation Convention Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 hidden sm:inline whitespace-nowrap">
              Quotation View:
            </span>
            <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-medium border border-slate-200">
              <button
                onClick={() => setQuotationMode('mas-convention')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  quotationMode === 'mas-convention'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Monetary Authority of Singapore standard (quotes per 100 for JPY, IDR, THB, KRW, etc.)"
              >
                MAS Benchmark
              </button>
              <button
                onClick={() => setQuotationMode('units-per-sgd')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  quotationMode === 'units-per-sgd'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Foreign Currency per 1 SGD (Traveler friendly)"
              >
                Units per 1 SGD
              </button>
              <button
                onClick={() => setQuotationMode('sgd-per-unit')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  quotationMode === 'sgd-per-unit'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="SGD per 1 foreign unit"
              >
                SGD per Unit
              </button>
            </div>

            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shrink-0"
              title="Refresh live exchange rates"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-rose-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Category Segmented Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Currencies ({currencies.length})
          </button>
          <button
            onClick={() => setSelectedCategory('favorites')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              selectedCategory === 'favorites'
                ? 'bg-amber-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Favorites ({favorites.length})</span>
          </button>
          <button
            onClick={() => setSelectedCategory('asean')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              selectedCategory === 'asean'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ASEAN & Cross-Border (MYR, THB, IDR...)
          </button>
          <button
            onClick={() => setSelectedCategory('east-asia')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              selectedCategory === 'east-asia'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            East Asia (JPY, CNY, KRW, TWD...)
          </button>
          <button
            onClick={() => setSelectedCategory('major')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              selectedCategory === 'major'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Major G10 (USD, EUR, GBP, AUD...)
          </button>
          <button
            onClick={() => setSelectedCategory('south-asia')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              selectedCategory === 'south-asia'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            South Asia & ME (INR, AED...)
          </button>
        </div>
      </div>

      {/* Main Financial Rates Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-3 w-10 text-center">Fav</th>
                <th className="py-3 px-4">Currency</th>
                <th className="py-3 px-4 text-right">
                  {quotationMode === 'units-per-sgd'
                    ? 'Units per 1 SGD'
                    : quotationMode === 'mas-convention'
                    ? 'MAS Quoted Rate'
                    : 'SGD per Unit'}
                </th>
                <th className="py-3 px-4 text-right">24h Change</th>
                <th className="py-3 px-4 text-right hidden md:table-cell">24h Range (SGD)</th>
                <th className="py-3 px-4 text-center hidden lg:table-cell w-28">7d Trend</th>
                <th className="py-3 px-4 text-right w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCurrencies.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <p className="font-medium text-slate-700">No currencies match your filter</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Try searching for a different code (e.g., &quot;MYR&quot; or &quot;USD&quot;) or reset your category.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                      className="mt-3 px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      Reset All Filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredCurrencies.map((item) => {
                  const isFav = favorites.includes(item.code);
                  const display = getDisplayRate(item);
                  const isPositive = item.change24h >= 0;

                  return (
                    <tr
                      key={item.code}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Favorite Button */}
                      <td className="py-3.5 px-3 text-center">
                        <button
                          onClick={() => onToggleFavorite(item.code)}
                          className="text-slate-300 hover:text-amber-500 transition-colors p-1"
                          title={isFav ? `Remove ${item.code} from favorites` : `Add ${item.code} to favorites`}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              isFav ? 'fill-amber-400 text-amber-500' : 'text-slate-300'
                            }`}
                          />
                        </button>
                      </td>

                      {/* Currency Name & Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl leading-none select-none" role="img" aria-label={item.country}>
                            {item.flag}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 font-mono tracking-tight text-sm">
                                {item.code}
                              </span>
                              {item.isPeggedToSgd && (
                                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  1:1 CIA Peg
                                </span>
                              )}
                              {quotationMode === 'mas-convention' && item.masUnitMultiplier === 100 && (
                                <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                                  x100
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-500 truncate max-w-[180px] sm:max-w-xs">
                              {item.name} · {item.country}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Displayed Rate */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => copyRate(display.value, item.code)}
                          className="inline-flex flex-col items-end group/copy text-right"
                          title="Click to copy rate"
                        >
                          <span className="font-mono font-semibold text-slate-900 tabular-nums text-base">
                            {display.value}
                          </span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            {copiedCode === item.code ? (
                              <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                                <Check className="w-3 h-3" /> Copied
                              </span>
                            ) : (
                              <span>{display.label} {display.unit}</span>
                            )}
                          </span>
                        </button>
                      </td>

                      {/* 24h Change */}
                      <td className="py-3.5 px-4 text-right">
                        <div
                          className={`inline-flex items-center gap-1 font-mono text-xs font-semibold tabular-nums ${
                            item.change24h === 0
                              ? 'text-slate-500'
                              : isPositive
                              ? 'text-emerald-600'
                              : 'text-rose-600'
                          }`}
                        >
                          {item.change24h > 0 && <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />}
                          {item.change24h < 0 && <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />}
                          <span>
                            {item.change24h > 0 ? '+' : ''}
                            {item.change24h.toFixed(2)}%
                          </span>
                        </div>
                      </td>

                      {/* 24h Range */}
                      <td className="py-3.5 px-4 text-right hidden md:table-cell">
                        <div className="text-xs font-mono text-slate-600 tabular-nums">
                          S${formatCurrencyValue(item.low24h, 4)} – S${formatCurrencyValue(item.high24h, 4)}
                        </div>
                        <div className="text-[10px] text-slate-400">24h Low / High</div>
                      </td>

                      {/* 7d Sparkline */}
                      <td className="py-3.5 px-4 text-center hidden lg:table-cell">
                        <Sparkline data={item.history7d} positive={isPositive} />
                      </td>

                      {/* Action: Convert */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onSelectForCalculator(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                          title={`Calculate ${item.code} conversion`}
                        >
                          <Calculator className="w-3.5 h-3.5" />
                          <span>Calc</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footnote about MAS quoting conventions */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              Rates reflect Monetary Authority of Singapore (MAS) interbank guidelines. MAS officially quotes JPY, IDR, THB, KRW, TWD, PHP, INR, and VND per 100 foreign currency units.
            </span>
          </div>
          <span className="font-mono text-slate-400 whitespace-nowrap shrink-0">
            Source: MAS E-Services Feed
          </span>
        </div>
      </div>
    </div>
  );
};
