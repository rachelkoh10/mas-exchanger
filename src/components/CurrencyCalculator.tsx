import React, { useState, useEffect } from 'react';
import { 
  ArrowRightLeft, 
  Copy, 
  Check, 
  Clock, 
  Info, 
  Trash2, 
  TrendingUp, 
  ShieldCheck, 
  Store, 
  CreditCard 
} from 'lucide-react';
import { CurrencyItem, ExchangeMode, ConversionRecord } from '../types/currency';
import { formatCurrencyValue, calculateConversion } from '../data/currencies';

interface CurrencyCalculatorProps {
  currencies: CurrencyItem[];
  selectedCurrency: CurrencyItem;
  onSelectCurrency: (currency: CurrencyItem) => void;
  favorites: string[];
}

export const CurrencyCalculator: React.FC<CurrencyCalculatorProps> = ({
  currencies,
  selectedCurrency,
  onSelectCurrency,
  favorites
}) => {
  const [fromCode, setFromCode] = useState<string>('SGD');
  const [toCode, setToCode] = useState<string>(selectedCurrency.code);
  const [amountStr, setAmountStr] = useState<string>('1000');
  const [exchangeMode, setExchangeMode] = useState<ExchangeMode>('interbank');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [history, setHistory] = useState<ConversionRecord[]>(() => {
    try {
      const saved = localStorage.getItem('singafx_calc_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync when prop selectedCurrency changes from external selection
  useEffect(() => {
    if (fromCode === 'SGD') {
      setToCode(selectedCurrency.code);
    } else {
      setFromCode(selectedCurrency.code);
    }
  }, [selectedCurrency]);

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('singafx_calc_history', JSON.stringify(history.slice(0, 10)));
    } catch {
      // ignore
    }
  }, [history]);

  // Find active foreign currency item
  const isFromSgd = fromCode === 'SGD';
  const targetCode = isFromSgd ? toCode : fromCode;
  const targetCurrency = currencies.find(c => c.code === targetCode) || currencies[0];

  const numericAmount = Math.max(0, parseFloat(amountStr) || 0);

  // Conversion calculations
  const conversion = calculateConversion(
    numericAmount,
    targetCurrency.sgdPerUnit,
    isFromSgd,
    exchangeMode
  );

  const swapCurrencies = () => {
    const prevFrom = fromCode;
    const prevTo = toCode;
    setFromCode(prevTo);
    setToCode(prevFrom);
  };

  const handleCopy = () => {
    const text = `${numericAmount.toLocaleString('en-SG')} ${fromCode} = ${formatCurrencyValue(conversion.finalResult, 2)} ${toCode} (Rate: ${formatCurrencyValue(conversion.effectiveRate, 4)})`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSaveToHistory = () => {
    if (numericAmount <= 0) return;
    const record: ConversionRecord = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      fromAmount: numericAmount,
      fromCode,
      toAmount: conversion.finalResult,
      toCode,
      rate: conversion.effectiveRate,
      mode: exchangeMode
    };
    setHistory(prev => [record, ...prev.filter(r => !(r.fromCode === fromCode && r.toCode === toCode && Math.abs(r.fromAmount - numericAmount) < 0.01))].slice(0, 10));
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('singafx_calc_history');
    } catch {
      // ignore
    }
  };

  const setPresetAmount = (preset: number) => {
    setAmountStr(preset.toString());
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Calculator Main Box */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Singapore Currency Calculator
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Instant conversion benchmarked against Singapore Dollar (SGD)
            </p>
          </div>

          {/* Rate Mode Selector */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-medium border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setExchangeMode('interbank')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                exchangeMode === 'interbank'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="MAS Mid-Market Reference Rate (Zero Spread)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
              <span>MAS Mid-Market</span>
            </button>
            <button
              onClick={() => setExchangeMode('money-changer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                exchangeMode === 'money-changer'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Arcade / Changi Money Changer Cash Spread (~0.65%)"
            >
              <Store className="w-3.5 h-3.5 text-amber-600" />
              <span>Cash Changer</span>
            </button>
            <button
              onClick={() => setExchangeMode('card')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                exchangeMode === 'card'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Singapore Bank Credit Card FX Admin Fee (~2.5%)"
            >
              <CreditCard className="w-3.5 h-3.5 text-blue-600" />
              <span>Bank Card</span>
            </button>
          </div>
        </div>

        {/* Currency Dual Form */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* From Box */}
          <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-4">
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              You Send
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                step="any"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                placeholder="0.00"
                className="w-full text-2xl sm:text-3xl font-bold font-mono tabular-nums text-slate-900 bg-transparent focus:outline-none placeholder:text-slate-300"
              />
              <select
                value={fromCode}
                onChange={(e) => {
                  const val = e.target.value;
                  setFromCode(val);
                  if (val !== 'SGD' && toCode !== 'SGD') {
                    setToCode('SGD');
                  }
                  const found = currencies.find(c => c.code === val);
                  if (found) onSelectCurrency(found);
                }}
                className="bg-white border border-slate-200 font-bold font-mono text-sm text-slate-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-2xs"
              >
                <option value="SGD">🇸🇬 SGD</option>
                {currencies.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-xs text-slate-400 mt-2 flex items-center justify-between">
              <span>{fromCode === 'SGD' ? 'Singapore Dollar' : targetCurrency.name}</span>
              {fromCode === 'SGD' && <span className="font-mono text-slate-500">S$</span>}
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center">
            <button
              onClick={swapCurrencies}
              className="p-3 bg-white border border-slate-200 rounded-full text-slate-700 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50 transition-all shadow-xs"
              title="Swap From and To currencies"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* To Box */}
          <div className="md:col-span-5 bg-rose-50/40 border border-rose-200/80 rounded-xl p-4">
            <label className="block text-xs font-semibold text-rose-800 mb-1.5">
              You Receive (Estimated)
            </label>
            <div className="flex items-center gap-3">
              <div className="w-full text-2xl sm:text-3xl font-bold font-mono tabular-nums text-slate-900 overflow-x-auto truncate">
                {formatCurrencyValue(conversion.finalResult, toCode === 'IDR' || toCode === 'VND' || toCode === 'KRW' ? 0 : 2)}
              </div>
              <select
                value={toCode}
                onChange={(e) => {
                  const val = e.target.value;
                  setToCode(val);
                  if (val !== 'SGD' && fromCode !== 'SGD') {
                    setFromCode('SGD');
                  }
                  const found = currencies.find(c => c.code === val);
                  if (found) onSelectCurrency(found);
                }}
                className="bg-white border border-rose-200 font-bold font-mono text-sm text-slate-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-2xs"
              >
                <option value="SGD">🇸🇬 SGD</option>
                {currencies.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-xs text-rose-700/80 mt-2 flex items-center justify-between">
              <span>{toCode === 'SGD' ? 'Singapore Dollar' : targetCurrency.name}</span>
              <span className="font-mono">{toCode === 'SGD' ? 'S$' : targetCurrency.symbol}</span>
            </div>
          </div>
        </div>

        {/* Quick SGD Presets */}
        <div className="mt-4 flex items-center flex-wrap gap-2 text-xs">
          <span className="text-slate-500 font-medium mr-1">Quick SGD Presets:</span>
          {[50, 100, 500, 1000, 2500, 5000].map(val => (
            <button
              key={val}
              onClick={() => {
                setFromCode('SGD');
                setPresetAmount(val);
              }}
              className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
                fromCode === 'SGD' && numericAmount === val
                  ? 'bg-rose-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              S${val.toLocaleString()}
            </button>
          ))}
        </div>

        {/* Rate Conversion Summary Card */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-0.5">
              <div className="text-xs text-slate-500">Live Exchange Rate Benchmark</div>
              <div className="text-sm font-semibold text-slate-900 font-mono flex items-center gap-2">
                <span>1 SGD = {formatCurrencyValue(1 / targetCurrency.sgdPerUnit, 4)} {targetCurrency.code}</span>
                <span className="text-slate-300">·</span>
                <span className="text-xs text-slate-500 font-normal">
                  1 {targetCurrency.code} = S${formatCurrencyValue(targetCurrency.sgdPerUnit, 4)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors shadow-2xs"
                title="Copy calculation summary"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Result</span>
                  </>
                )}
              </button>

              <button
                onClick={handleSaveToHistory}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-2xs"
                title="Save calculation to log"
              >
                <span>Save to Log</span>
              </button>
            </div>
          </div>

          {/* Pricing breakdown row */}
          <div className="pt-3 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Fee Spread</span>
              <span className="font-mono font-medium text-slate-700">
                {conversion.feePercentage.toFixed(2)}%
                {exchangeMode === 'interbank' && ' (Mid-Market)'}
                {exchangeMode === 'money-changer' && ' (Cash Spread)'}
                {exchangeMode === 'card' && ' (Bank Admin)'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Estimated Spread Cost</span>
              <span className="font-mono font-medium text-slate-700">
                {conversion.feeAmount > 0
                  ? `~${formatCurrencyValue(conversion.feeAmount, 2)} ${toCode}`
                  : 'S$0.00'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">MAS Convention Note</span>
              <span className="text-slate-700 font-mono text-[11px]">
                {targetCurrency.masUnitMultiplier === 100
                  ? `Quoted per 100 ${targetCurrency.code}: S$${formatCurrencyValue(targetCurrency.sgdPerUnit * 100, 4)}`
                  : `Standard 1:1 Unit`}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Pair Volatility 24h</span>
              <span className={`font-mono font-medium ${targetCurrency.change24h >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {targetCurrency.change24h >= 0 ? '+' : ''}{targetCurrency.change24h.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Travel Quick Targets for Singaporeans */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
          <span>Singapore Travel Quick Conversions (from S${numericAmount.toLocaleString('en-SG')})</span>
          <span className="text-xs font-normal text-slate-400">Based on mid-market rates</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {['MYR', 'JPY', 'THB', 'IDR', 'TWD', 'KRW'].map(code => {
            const cur = currencies.find(c => c.code === code);
            if (!cur) return null;
            const converted = numericAmount / cur.sgdPerUnit;
            return (
              <button
                key={code}
                onClick={() => {
                  setFromCode('SGD');
                  setToCode(code);
                  onSelectCurrency(cur);
                }}
                className={`p-3 rounded-lg border text-left transition-all hover:border-rose-300 hover:bg-rose-50/30 ${
                  toCode === code && fromCode === 'SGD'
                    ? 'border-rose-500 bg-rose-50/50'
                    : 'border-slate-200 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg leading-none">{cur.flag}</span>
                  <span className="text-xs font-bold font-mono text-slate-700">{cur.code}</span>
                </div>
                <div className="font-mono font-bold text-slate-900 text-sm tabular-nums truncate">
                  {formatCurrencyValue(converted, cur.code === 'IDR' || cur.code === 'KRW' ? 0 : 2)}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                  {cur.country}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Conversion History Log */}
      {history.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-bold text-slate-900">Recent Conversions</h3>
            </div>
            <button
              onClick={clearHistory}
              className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
              title="Clear calculation history"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {history.map(item => (
              <div
                key={item.id}
                className="py-2.5 flex items-center justify-between hover:bg-slate-50/80 rounded-lg px-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-semibold text-slate-900">
                    {item.fromAmount.toLocaleString()} {item.fromCode}
                  </span>
                  <span className="text-slate-400">→</span>
                  <span className="font-mono font-bold text-rose-700">
                    {formatCurrencyValue(item.toAmount, 2)} {item.toCode}
                  </span>
                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    (Rate: {formatCurrencyValue(item.rate, 4)})
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <button
                    onClick={() => {
                      setFromCode(item.fromCode);
                      setToCode(item.toCode);
                      setAmountStr(item.fromAmount.toString());
                      setExchangeMode(item.mode);
                    }}
                    className="text-xs font-medium text-rose-600 hover:text-rose-800"
                  >
                    Reuse
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
