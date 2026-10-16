/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  INITIAL_CURRENCIES, 
  DEFAULT_FAVORITES, 
  DEFAULT_MAS_CONFIG 
} from './data/currencies';
import { CurrencyItem, QuotationMode, MasApiConfig } from './types/currency';
import { TopBar } from './components/TopBar';
import { RateBoard } from './components/RateBoard';
import { CurrencyCalculator } from './components/CurrencyCalculator';
import { TravelMatrix } from './components/TravelMatrix';
import { MasReferenceInfo } from './components/MasReferenceInfo';
import { MasApiModal } from './components/MasApiModal';

export default function App() {
  const [currencies, setCurrencies] = useState<CurrencyItem[]>(INITIAL_CURRENCIES);
  const [activeTab, setActiveTab] = useState<'rates' | 'calculator' | 'travel' | 'mas'>('rates');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyItem>(INITIAL_CURRENCIES[0]); // MYR
  const [quotationMode, setQuotationMode] = useState<QuotationMode>('mas-convention');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isMasModalOpen, setIsMasModalOpen] = useState<boolean>(false);

  // Favorites stored in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('singafx_favorites');
      return saved ? JSON.parse(saved) : DEFAULT_FAVORITES;
    } catch {
      return DEFAULT_FAVORITES;
    }
  });

  // MAS Config stored in localStorage
  const [masConfig, setMasConfig] = useState<MasApiConfig>(() => {
    try {
      const saved = localStorage.getItem('singafx_mas_config');
      return saved ? JSON.parse(saved) : DEFAULT_MAS_CONFIG;
    } catch {
      return DEFAULT_MAS_CONFIG;
    }
  });

  // Persist favorites
  useEffect(() => {
    try {
      localStorage.setItem('singafx_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  // Persist MAS config
  useEffect(() => {
    try {
      localStorage.setItem('singafx_mas_config', JSON.stringify(masConfig));
    } catch {
      // ignore
    }
  }, [masConfig]);

  const handleToggleFavorite = (code: string) => {
    setFavorites(prev => 
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  const handleSelectForCalculator = (currency: CurrencyItem) => {
    setSelectedCurrency(currency);
    setActiveTab('calculator');
  };

  // Live price tick simulation (respects MAS pegged BND 1:1)
  const refreshRates = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCurrencies(prev => 
        prev.map(item => {
          if (item.isPeggedToSgd) {
            return item; // BND remains 1.0000 by treaty
          }
          // Slight realistic financial jitter (0.01% - 0.08%)
          const deltaFactor = 1 + (Math.random() * 0.0016 - 0.0008);
          const newSgdPerUnit = +(item.sgdPerUnit * deltaFactor);
          const newChange = +(item.change24h + (Math.random() * 0.06 - 0.03)).toFixed(2);
          const newHigh = Math.max(item.high24h, newSgdPerUnit);
          const newLow = Math.min(item.low24h, newSgdPerUnit);
          const newHistory = [...item.history7d.slice(1), newSgdPerUnit];

          return {
            ...item,
            sgdPerUnit: newSgdPerUnit,
            change24h: newChange,
            high24h: newHigh,
            low24h: newLow,
            history7d: newHistory
          };
        })
      );
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 400);
  }, []);

  // Periodic polling interval if configured
  useEffect(() => {
    if (!masConfig.autoRefreshInterval || masConfig.autoRefreshInterval <= 0) return;

    const interval = setInterval(() => {
      refreshRates();
    }, masConfig.autoRefreshInterval * 1000);

    return () => clearInterval(interval);
  }, [masConfig.autoRefreshInterval, refreshRates]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* 3-zone Header Contract */}
      <TopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMasConfig={() => setIsMasModalOpen(true)}
        isSimulated={masConfig.useLiveSimulation}
        lastUpdated={lastUpdated}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'rates' && (
          <RateBoard
            currencies={currencies}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectForCalculator={handleSelectForCalculator}
            quotationMode={quotationMode}
            setQuotationMode={setQuotationMode}
            onRefresh={refreshRates}
            isRefreshing={isRefreshing}
          />
        )}

        {activeTab === 'calculator' && (
          <CurrencyCalculator
            currencies={currencies}
            selectedCurrency={selectedCurrency}
            onSelectCurrency={setSelectedCurrency}
            favorites={favorites}
          />
        )}

        {activeTab === 'travel' && (
          <TravelMatrix
            currencies={currencies}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectForCalculator={handleSelectForCalculator}
          />
        )}

        {activeTab === 'mas' && (
          <MasReferenceInfo
            onOpenMasConfig={() => setIsMasModalOpen(true)}
          />
        )}
      </main>

      {/* MAS Setup Modal */}
      <MasApiModal
        isOpen={isMasModalOpen}
        onClose={() => setIsMasModalOpen(false)}
        config={masConfig}
        onSaveConfig={setMasConfig}
      />

      {/* Minimalistic Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">SingaFX</span>
            <span>·</span>
            <span>Singapore Exchange Rates & Conversion Tool</span>
            <span>·</span>
            <span>MAS Benchmark Compliant</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMasModalOpen(true)}
              className="hover:text-slate-900 transition-colors"
            >
              MAS API Ready
            </button>
            <button
              onClick={() => setActiveTab('mas')}
              className="hover:text-slate-900 transition-colors"
            >
              Monetary Guide
            </button>
            <span>SGD Reference Portal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
