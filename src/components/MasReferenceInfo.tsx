import React from 'react';
import { 
  Building2, 
  Layers, 
  HelpCircle, 
  Code2, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface MasReferenceInfoProps {
  onOpenMasConfig: () => void;
}

export const MasReferenceInfo: React.FC<MasReferenceInfoProps> = ({ onOpenMasConfig }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro Hero */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-rose-600 text-xs font-semibold uppercase tracking-wider mb-2">
          <Building2 className="w-4 h-4" />
          <span>Singapore Monetary Framework</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          How Exchange Rates Work in Singapore & MAS Benchmarks
        </h2>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Unlike most central banks (such as the US Federal Reserve or Bank of England) that set benchmark interest rates,
          the <strong>Monetary Authority of Singapore (MAS)</strong> manages monetary policy centered on the exchange rate of the Singapore Dollar
          (the <em>S$ Nominal Effective Exchange Rate</em>, or <strong>S$NEER</strong> policy band).
        </p>
      </div>

      {/* 3 Core Rules of SG Currency */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm font-mono mb-3">
            01
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1">
            MAS Quoting Convention
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            By official MAS statistical standards, high-denomination Asian currencies are quoted in 
            <strong> Singapore Dollars per 100 foreign currency units</strong>. This applies to 
            <strong> JPY, IDR, THB, KRW, TWD, PHP, INR, and VND</strong>.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm font-mono mb-3">
            02
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1">
            1967 Brunei Interchangeability (CIA)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Under the historic 1967 Currency Interchangeability Agreement between Singapore and Brunei, 
            <strong> 1 BND is equal to 1 SGD at par (1.0000)</strong>. Brunei Dollars are customary tender 
            in Singapore, and vice-versa, without exchange fees.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm font-mono mb-3">
            03
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1">
            End-of-Day Official MAS Fix
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            MAS releases official commercial banks reference rates daily around 
            <strong> 4:05 PM SGT (Singapore Time)</strong>. Commercial rates and retail money changers at 
            The Arcade / Parkway Parade price against this benchmark.
          </p>
        </div>
      </div>

      {/* Developer Integration Box for the user */}
      <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-7 shadow-xs">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-rose-400" />
            <h3 className="text-lg font-bold">MAS Financial Data API Integration</h3>
          </div>
          <button
            onClick={onOpenMasConfig}
            className="px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>Open API Setup Modal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          This frontend application has been architected to seamlessly receive your MAS API key or proxy route.
          When you are ready to configure your MAS API credentials:
        </p>

        <div className="bg-slate-950/80 rounded-lg p-4 font-mono text-xs text-slate-300 space-y-2 border border-slate-800">
          <div className="text-emerald-400">// Serverless Proxy Route (Root Level /api)</div>
          <div>GET <span className="text-rose-400">/api/exchangerates?end_of_day=YYYY-MM-DD</span></div>
          <div>GET <span className="text-emerald-400">/api/health</span></div>
          <div className="text-slate-500 pt-1">// Upstream MAS APIMG Gateway:</div>
          <div className="break-all text-[11px] text-blue-300">https://eservices.mas.gov.sg/apimg-gw/server/monthly_statistical_bulletin_non610ora/exchange_rates_end_of_period_daily/views/exchange_rates_end_of_period_daily</div>
          <div>Header: <span className="text-amber-300">KeyId: &lt;MAS_KEY_ID&gt;</span></div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Frontend State & Cache ready for live JSON streaming</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Support for custom proxy endpoints (/api/mas-rates)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
