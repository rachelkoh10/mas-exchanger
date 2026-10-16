export type RegionCategory = 'all' | 'asean' | 'east-asia' | 'major' | 'south-asia';

export type QuotationMode = 'sgd-per-unit' | 'units-per-sgd' | 'mas-convention';

export type ExchangeMode = 'interbank' | 'money-changer' | 'card';

export interface CurrencyItem {
  code: string;
  name: string;
  country: string;
  flag: string;
  symbol: string;
  /** Value of 1 foreign unit in SGD (e.g. 1 USD = 1.342 SGD, 1 MYR = 0.3015 SGD) */
  sgdPerUnit: number;
  /** MAS standard multiplier (100 for JPY, IDR, THB, KRW, TWD, PHP, INR, VND; 1 for others) */
  masUnitMultiplier: 1 | 100;
  change24h: number;
  high24h: number;
  low24h: number;
  history7d: number[];
  region: 'asean' | 'east-asia' | 'major' | 'south-asia';
  isPeggedToSgd?: boolean;
  notes?: string;
}

export interface ConversionRecord {
  id: string;
  timestamp: number;
  fromAmount: number;
  fromCode: string;
  toAmount: number;
  toCode: string;
  rate: number;
  mode: ExchangeMode;
}

export interface MasApiConfig {
  apiKey: string;
  endpointUrl: string;
  autoRefreshInterval: number; // in seconds
  useLiveSimulation: boolean;
  lastSyncTimestamp: number | null;
}
