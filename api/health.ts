import type { Request, Response } from 'express';

/**
 * Health check endpoint for the SingaFX serverless API.
 * Reports server health and MAS API configuration status.
 */
export default async function healthHandler(req: Request, res: Response) {
  const masKeyId = (process.env.MAS_KEY_ID || process.env.MAS_API_KEY || '').trim();

  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    service: 'SingaFX Serverless Exchange Rates API',
    masApi: {
      keyConfigured: Boolean(masKeyId.length > 0),
      endpoint:
        'https://eservices.mas.gov.sg/apimg-gw/server/monthly_statistical_bulletin_non610ora/exchange_rates_end_of_period_daily/views/exchange_rates_end_of_period_daily',
    },
  });
}
