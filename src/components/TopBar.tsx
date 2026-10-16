import React from 'react';
import { ArrowLeftRight, Settings, Radio } from 'lucide-react';

interface TopBarProps {
  activeTab: 'rates' | 'calculator' | 'travel' | 'mas';
  setActiveTab: (tab: 'rates' | 'calculator' | 'travel' | 'mas') => void;
  onOpenMasConfig: () => void;
  isSimulated: boolean;
  lastUpdated: Date;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  setActiveTab,
  onOpenMasConfig,
  isSimulated,
  lastUpdated
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold shadow-sm">
            <span className="text-base tracking-tight font-mono">SG</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
                SingaFX
              </span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                SGD
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Singapore Exchange Rates & MAS Benchmark
            </p>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('rates')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'rates'
                ? 'text-rose-700 font-semibold bg-rose-50/70 sm:bg-transparent sm:text-slate-900 sm:border-b-2 sm:border-rose-600 sm:rounded-none'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Live Rates
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'calculator'
                ? 'text-rose-700 font-semibold bg-rose-50/70 sm:bg-transparent sm:text-slate-900 sm:border-b-2 sm:border-rose-600 sm:rounded-none'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Calculator
          </button>
          <button
            onClick={() => setActiveTab('travel')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'travel'
                ? 'text-rose-700 font-semibold bg-rose-50/70 sm:bg-transparent sm:text-slate-900 sm:border-b-2 sm:border-rose-600 sm:rounded-none'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Travel Matrix
          </button>
          <button
            onClick={() => setActiveTab('mas')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'mas'
                ? 'text-rose-700 font-semibold bg-rose-50/70 sm:bg-transparent sm:text-slate-900 sm:border-b-2 sm:border-rose-600 sm:rounded-none'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            MAS Guide
          </button>
        </nav>

        {/* Zone 3: Primary Action & Status */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500">
            <Radio className="w-3.5 h-3.5 text-emerald-600" />
            <span className="tabular-nums font-mono">
              {lastUpdated.toLocaleTimeString('en-SG', { hour12: false })} SGT
            </span>
          </div>

          <button
            onClick={onOpenMasConfig}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-xs whitespace-nowrap"
            title="Configure MAS API Key & Feed"
          >
            <Settings className="w-3.5 h-3.5 text-slate-500" />
            <span>MAS API Setup</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </button>
        </div>
      </div>
    </header>
  );
};
