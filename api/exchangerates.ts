import type { Request, Response } from 'express';

const MAS_BASE_URL =
  'https://eservices.mas.gov.sg/apimg-gw/server/monthly_statistical_bulletin_non610ora/exchange_rates_end_of_period_daily/views/exchange_rates_end_of_period_daily';

/**
 * Calculates a valid recent business day (YYYY-MM-DD) for MAS daily series.
 */
function getRecentBusinessDay(): string {
  const d = new Date();
  // If weekend, go back to Friday
  const day = d.getDay();
  if (day === 0) {
    // Sunday -> Friday
    d.setDate(d.getDate() - 2);
  } else if (day === 6) {
    // Saturday -> Friday
    d.setDate(d.getDate() - 1);
  } else {
    // Today / yesterday
    d.setDate(d.getDate() - 1);
  }

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Serverless handler to query Monetary Authority of Singapore (MAS)
 * End-of-Period Daily Exchange Rates.
 */
export default async function exchangeRatesHandler(req: Request, res: Response) {
  const endOfDayParam = (req.query.end_of_day as string | undefined)?.trim();
  const targetDate = endOfDayParam || getRecentBusinessDay();

  // Read MAS KeyId from environment variables without hardcoding
  const masKeyId = (
    process.env.MAS_KEY_ID ||
    process.env.MAS_API_KEY ||
    (req.headers['keyid'] as string) ||
    ''
  ).trim();

  const targetUrl = new URL(MAS_BASE_URL);
  targetUrl.searchParams.set('end_of_day', targetDate);

  // If KeyId is not set in environment, respond with a helpful non-blocking configuration report
  if (!masKeyId) {
    return res.status(200).json({
      success: false,
      configured: false,
      status: 'pending_key',
      message:
        'MAS_KEY_ID is not yet configured in the environment variables. Please set MAS_KEY_ID in your environment or secrets to pull live rates from the MAS API gateway.',
      targetDate,
      requestedEndpoint: targetUrl.toString(),
      docs: 'https://eservices.mas.gov.sg/api-catalogue',
    });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 9000);

    const response = await fetch(targetUrl.toString(), {
      method: 'GET',
      headers: {
        'KeyId': masKeyId,
        'Accept': 'application/json',
        'User-Agent': 'SingaFX/1.0',
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorBody = await response.text();
      return res.status(response.status).json({
        success: false,
        configured: true,
        statusCode: response.status,
        message: `MAS API returned HTTP ${response.status}`,
        details: errorBody,
        targetDate,
        endpoint: targetUrl.toString(),
      });
    }

    const data = await response.json();

    return res.status(200).json({
      success: true,
      configured: true,
      targetDate,
      endpoint: targetUrl.toString(),
      fetchedAt: new Date().toISOString(),
      result: data,
    });
  } catch (error: any) {
    const isTimeout = error?.name === 'AbortError';
    return res.status(502).json({
      success: false,
      configured: true,
      message: isTimeout
        ? 'Connection to MAS API Gateway timed out after 9 seconds'
        : error?.message || 'Error communicating with MAS API Gateway',
      targetDate,
      endpoint: targetUrl.toString(),
    });
  }
}
