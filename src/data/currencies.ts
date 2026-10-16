import { CurrencyItem, MasApiConfig } from '../types/currency';

export const INITIAL_CURRENCIES: CurrencyItem[] = [
  {
    code: 'MYR',
    name: 'Malaysian Ringgit',
    country: 'Malaysia',
    flag: '🇲🇾',
    symbol: 'RM',
    sgdPerUnit: 0.3012,
    masUnitMultiplier: 1,
    change24h: 0.34,
    high24h: 0.3025,
    low24h: 0.3001,
    history7d: [0.2985, 0.2992, 0.3001, 0.2998, 0.3008, 0.3010, 0.3012],
    region: 'asean',
    notes: 'Key Causeway & cross-border trade pair. ~3.32 MYR per SGD.'
  },
  {
    code: 'USD',
    name: 'United States Dollar',
    country: 'United States',
    flag: '🇺🇸',
    symbol: '$',
    sgdPerUnit: 1.3415,
    masUnitMultiplier: 1,
    change24h: -0.18,
    high24h: 1.3440,
    low24h: 1.3395,
    history7d: [1.3460, 1.3445, 1.3430, 1.3422, 1.3435, 1.3420, 1.3415],
    region: 'major',
    notes: 'Primary global reserve and benchmark pair.'
  },
  {
    code: 'JPY',
    name: 'Japanese Yen',
    country: 'Japan',
    flag: '🇯🇵',
    symbol: '¥',
    sgdPerUnit: 0.00892,
    masUnitMultiplier: 100,
    change24h: 0.52,
    high24h: 0.00895,
    low24h: 0.00886,
    history7d: [0.00881, 0.00884, 0.00887, 0.00889, 0.00891, 0.00889, 0.00892],
    region: 'east-asia',
    notes: 'MAS quotes per 100 JPY: S$0.8920. ~112.1 JPY per SGD.'
  },
  {
    code: 'EUR',
    name: 'Euro',
    country: 'European Union',
    flag: '🇪🇺',
    symbol: '€',
    sgdPerUnit: 1.4620,
    masUnitMultiplier: 1,
    change24h: 0.12,
    high24h: 1.4655,
    low24h: 1.4590,
    history7d: [1.4580, 1.4595, 1.4610, 1.4605, 1.4615, 1.4618, 1.4620],
    region: 'major',
    notes: 'European trade and investment benchmark.'
  },
  {
    code: 'GBP',
    name: 'British Pound',
    country: 'United Kingdom',
    flag: '🇬🇧',
    symbol: '£',
    sgdPerUnit: 1.7340,
    masUnitMultiplier: 1,
    change24h: -0.22,
    high24h: 1.7390,
    low24h: 1.7310,
    history7d: [1.7410, 1.7380, 1.7375, 1.7360, 1.7350, 1.7345, 1.7340],
    region: 'major',
    notes: 'Major overseas education & banking pair.'
  },
  {
    code: 'AUD',
    name: 'Australian Dollar',
    country: 'Australia',
    flag: '🇦🇺',
    symbol: 'A$',
    sgdPerUnit: 0.8920,
    masUnitMultiplier: 1,
    change24h: 0.45,
    high24h: 0.8950,
    low24h: 0.8875,
    history7d: [0.8840, 0.8865, 0.8890, 0.8880, 0.8905, 0.8912, 0.8920],
    region: 'major',
    notes: 'High travel & student remittance volume.'
  },
  {
    code: 'THB',
    name: 'Thai Baht',
    country: 'Thailand',
    flag: '🇹🇭',
    symbol: '฿',
    sgdPerUnit: 0.0382,
    masUnitMultiplier: 100,
    change24h: -0.15,
    high24h: 0.0385,
    low24h: 0.0380,
    history7d: [0.0385, 0.0384, 0.0383, 0.0382, 0.0383, 0.0382, 0.0382],
    region: 'asean',
    notes: 'MAS quotes per 100 THB: S$3.8200. ~26.18 THB per SGD.'
  },
  {
    code: 'IDR',
    name: 'Indonesian Rupiah',
    country: 'Indonesia',
    flag: '🇮🇩',
    symbol: 'Rp',
    sgdPerUnit: 0.0000845,
    masUnitMultiplier: 100,
    change24h: 0.08,
    high24h: 0.0000848,
    low24h: 0.0000842,
    history7d: [0.0000841, 0.0000843, 0.0000844, 0.0000844, 0.0000845, 0.0000845, 0.0000845],
    region: 'asean',
    notes: 'MAS quotes per 100 IDR: S$0.00845. ~11,834 IDR per SGD.'
  },
  {
    code: 'CNY',
    name: 'Chinese Yuan',
    country: 'China',
    flag: '🇨🇳',
    symbol: '¥',
    sgdPerUnit: 0.1856,
    masUnitMultiplier: 1,
    change24h: -0.05,
    high24h: 0.1862,
    low24h: 0.1851,
    history7d: [0.1865, 0.1861, 0.1859, 0.1858, 0.1857, 0.1856, 0.1856],
    region: 'east-asia',
    notes: 'Onshore / offshore trade benchmark. ~5.388 CNY per SGD.'
  },
  {
    code: 'KRW',
    name: 'South Korean Won',
    country: 'South Korea',
    flag: '🇰🇷',
    symbol: '₩',
    sgdPerUnit: 0.000985,
    masUnitMultiplier: 100,
    change24h: 0.61,
    high24h: 0.000990,
    low24h: 0.000978,
    history7d: [0.000972, 0.000975, 0.000980, 0.000979, 0.000982, 0.000983, 0.000985],
    region: 'east-asia',
    notes: 'MAS quotes per 100 KRW: S$0.0985. ~1,015 KRW per SGD.'
  },
  {
    code: 'TWD',
    name: 'New Taiwan Dollar',
    country: 'Taiwan',
    flag: '🇹🇼',
    symbol: 'NT$',
    sgdPerUnit: 0.0418,
    masUnitMultiplier: 100,
    change24h: 0.18,
    high24h: 0.0420,
    low24h: 0.0416,
    history7d: [0.0415, 0.0416, 0.0417, 0.0417, 0.0418, 0.0417, 0.0418],
    region: 'east-asia',
    notes: 'MAS quotes per 100 TWD: S$4.1800. ~23.92 TWD per SGD.'
  },
  {
    code: 'HKD',
    name: 'Hong Kong Dollar',
    country: 'Hong Kong',
    flag: '🇭🇰',
    symbol: 'HK$',
    sgdPerUnit: 0.1718,
    masUnitMultiplier: 1,
    change24h: -0.14,
    high24h: 0.1724,
    low24h: 0.1714,
    history7d: [0.1726, 0.1723, 0.1721, 0.1719, 0.1720, 0.1719, 0.1718],
    region: 'east-asia',
    notes: 'Pegged to USD. ~5.821 HKD per SGD.'
  },
  {
    code: 'VND',
    name: 'Vietnamese Dong',
    country: 'Vietnam',
    flag: '🇻🇳',
    symbol: '₫',
    sgdPerUnit: 0.0000532,
    masUnitMultiplier: 100,
    change24h: 0.02,
    high24h: 0.0000535,
    low24h: 0.0000530,
    history7d: [0.0000530, 0.0000531, 0.0000531, 0.0000532, 0.0000532, 0.0000532, 0.0000532],
    region: 'asean',
    notes: 'MAS quotes per 100 VND: S$0.00532. ~18,796 VND per SGD.'
  },
  {
    code: 'PHP',
    name: 'Philippine Peso',
    country: 'Philippines',
    flag: '🇵🇭',
    symbol: '₱',
    sgdPerUnit: 0.0232,
    masUnitMultiplier: 100,
    change24h: -0.28,
    high24h: 0.0234,
    low24h: 0.0231,
    history7d: [0.0234, 0.0233, 0.0233, 0.0232, 0.0233, 0.0232, 0.0232],
    region: 'asean',
    notes: 'MAS quotes per 100 PHP: S$2.3200. ~43.10 PHP per SGD.'
  },
  {
    code: 'INR',
    name: 'Indian Rupee',
    country: 'India',
    flag: '🇮🇳',
    symbol: '₹',
    sgdPerUnit: 0.0156,
    masUnitMultiplier: 100,
    change24h: -0.06,
    high24h: 0.0157,
    low24h: 0.0155,
    history7d: [0.0157, 0.0156, 0.0156, 0.0156, 0.0156, 0.0156, 0.0156],
    region: 'south-asia',
    notes: 'MAS quotes per 100 INR: S$1.5600. ~64.10 INR per SGD.'
  },
  {
    code: 'BND',
    name: 'Brunei Dollar',
    country: 'Brunei Darussalam',
    flag: '🇧🇳',
    symbol: 'B$',
    sgdPerUnit: 1.0000,
    masUnitMultiplier: 1,
    change24h: 0.00,
    high24h: 1.0000,
    low24h: 1.0000,
    history7d: [1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000],
    region: 'asean',
    isPeggedToSgd: true,
    notes: '1967 Currency Interchangeability Agreement (CIA) - exactly 1:1 at par with SGD.'
  },
  {
    code: 'NZD',
    name: 'New Zealand Dollar',
    country: 'New Zealand',
    flag: '🇳🇿',
    symbol: 'NZ$',
    sgdPerUnit: 0.8110,
    masUnitMultiplier: 1,
    change24h: 0.38,
    high24h: 0.8140,
    low24h: 0.8075,
    history7d: [0.8040, 0.8060, 0.8090, 0.8080, 0.8100, 0.8105, 0.8110],
    region: 'major',
    notes: 'Commodity & travel currency. ~1.233 NZD per SGD.'
  },
  {
    code: 'CAD',
    name: 'Canadian Dollar',
    country: 'Canada',
    flag: '🇨🇦',
    symbol: 'C$',
    sgdPerUnit: 0.9840,
    masUnitMultiplier: 1,
    change24h: 0.05,
    high24h: 0.9870,
    low24h: 0.9810,
    history7d: [0.9820, 0.9830, 0.9850, 0.9840, 0.9845, 0.9842, 0.9840],
    region: 'major',
    notes: 'North American trade pair. ~1.016 CAD per SGD.'
  },
  {
    code: 'CHF',
    name: 'Swiss Franc',
    country: 'Switzerland',
    flag: '🇨🇭',
    symbol: 'CHF',
    sgdPerUnit: 1.5420,
    masUnitMultiplier: 1,
    change24h: 0.29,
    high24h: 1.5460,
    low24h: 1.5370,
    history7d: [1.5330, 1.5360, 1.5390, 1.5380, 1.5400, 1.5410, 1.5420],
    region: 'major',
    notes: 'Global safe-haven asset. ~0.648 CHF per SGD.'
  },
  {
    code: 'AED',
    name: 'UAE Dirham',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    symbol: 'AED',
    sgdPerUnit: 0.3653,
    masUnitMultiplier: 1,
    change24h: -0.18,
    high24h: 0.3665,
    low24h: 0.3642,
    history7d: [0.3670, 0.3662, 0.3658, 0.3655, 0.3656, 0.3654, 0.3653],
    region: 'south-asia',
    notes: 'Middle East finance and travel hub. ~2.737 AED per SGD.'
  },
  {
    code: 'SAR',
    name: 'Saudi Riyal',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    symbol: 'SAR',
    sgdPerUnit: 0.3575,
    masUnitMultiplier: 1,
    change24h: -0.17,
    high24h: 0.3588,
    low24h: 0.3565,
    history7d: [0.3592, 0.3585, 0.3580, 0.3578, 0.3579, 0.3576, 0.3575],
    region: 'south-asia',
    notes: 'Pilgrimage and Middle East commerce. ~2.797 SAR per SGD.'
  }
];

export const DEFAULT_FAVORITES: string[] = ['MYR', 'JPY', 'USD', 'THB', 'EUR', 'IDR'];

export const DEFAULT_MAS_CONFIG: MasApiConfig = {
  apiKey: '',
  endpointUrl: 'https://eservices.mas.gov.sg/apimg-gw/server/monthly_statistical_bulletin_non610ora/exchange_rates_end_of_period_daily/views/exchange_rates_end_of_period_daily',
  autoRefreshInterval: 30,
  useLiveSimulation: true,
  lastSyncTimestamp: Date.now()
};

/**
 * Format rate display according to Singapore financial conventions
 */
export function formatCurrencyValue(val: number, decimals: number = 4): string {
  if (val === 0) return '0';
  if (val < 0.0001) {
    return val.toFixed(6);
  }
  if (val < 0.01) {
    return val.toFixed(5);
  }
  if (val < 1) {
    return val.toFixed(4);
  }
  if (val >= 1000) {
    return val.toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return val.toFixed(decimals);
}

/**
 * Calculate converted amount taking into account fee model
 */
export function calculateConversion(
  amount: number,
  sgdPerUnit: number,
  isFromSgd: boolean,
  mode: 'interbank' | 'money-changer' | 'card'
): {
  rawResult: number;
  finalResult: number;
  effectiveRate: number;
  feePercentage: number;
  feeAmount: number;
} {
  // Mode spread adjustment
  // Interbank = 0%
  // Money changer (e.g. Arcade/Changi) = ~0.65% cash spread
  // Credit card overseas fee = ~2.5% FX admin fee
  let feePercentage = 0;
  if (mode === 'money-changer') feePercentage = 0.0065;
  if (mode === 'card') feePercentage = 0.025;

  if (isFromSgd) {
    // SGD -> Foreign Currency
    // Base formula: amount / sgdPerUnit
    const baseForeign = amount / sgdPerUnit;
    const finalForeign = baseForeign * (1 - feePercentage);
    const effectiveRate = finalForeign / (amount || 1);
    const feeAmount = baseForeign - finalForeign;

    return {
      rawResult: baseForeign,
      finalResult: finalForeign,
      effectiveRate,
      feePercentage: feePercentage * 100,
      feeAmount
    };
  } else {
    // Foreign Currency -> SGD
    // Base formula: amount * sgdPerUnit
    const baseSgd = amount * sgdPerUnit;
    const finalSgd = baseSgd * (1 - feePercentage);
    const effectiveRate = finalSgd / (amount || 1);
    const feeAmount = baseSgd - finalSgd;

    return {
      rawResult: baseSgd,
      finalResult: finalSgd,
      effectiveRate,
      feePercentage: feePercentage * 100,
      feeAmount
    };
  }
}
