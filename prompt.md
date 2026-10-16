# SingaFX Development & Prompt History

This document records the user requests, system architecture, implemented features, and conversation log for the SingaFX Singapore Exchange Rate and Currency Converter application.

---

## 1. Initial Specification Prompt

**User:**
> 1. build a singapore based exchange rate tool that provides real time currency conversion for the SG currencies.
> 2. build the frontend for now. i will add the backend integration MAS API key later. Use a clean UI with search, favorite and a simple calculator

### Features Implemented:
- **Singapore Dollar (SGD) Base Currency Architecture**:
  - Live rates for SGD against all major Singapore trading and travel currencies (MYR, JPY, USD, EUR, GBP, AUD, THB, IDR, CNY, KRW, TWD, HKD, VND, PHP, INR, BND, NZD, CAD, CHF, AED, SAR).
  - Implementation of official **Monetary Authority of Singapore (MAS) Quotation Conventions** (quotes high-denomination Asian currencies such as JPY, IDR, THB, KRW, TWD, PHP, INR, and VND per 100 foreign units).
  - Built-in recognition of the 1967 Singapore-Brunei **Currency Interchangeability Agreement (CIA)** (1 BND = 1 SGD at 1.0000 par).
- **Search & Quick Categories**:
  - Real-time client-side search by currency code, country name, or currency name.
  - Category tabs for ASEAN & Cross-Border, East Asia, Major G10, and South Asia / Middle East.
- **Favorites Watchlist**:
  - Star/pin toggle persisted to `localStorage`.
  - Filter view for starred currencies.
- **Interactive Currency Calculator**:
  - Two-way instant conversion (`SGD ⇄ Foreign`).
  - Quick SGD presets (S$50, S$100, S$500, S$1,000, S$2,500, S$5,000).
  - Multi-tier fee modeling: **MAS Mid-Market (0% spread)**, **Cash Money Changer (~0.65% spread)**, and **Credit Card Overseas FX Admin Fee (2.5%)**.
  - Conversion history log with quick reuse and copy-to-clipboard functionality.
- **Singapore Travel Budget Matrix**:
  - Enter an SGD vacation budget to view purchasing power across Singaporean travel hotspots with meal and accommodation pricing guides.

---

## 2. GitHub Deployment Prompt

**User:**
> git push https://<GITHUB_PERSONAL_ACCESS_TOKEN>@github.com/rachelkoh10/mas-exchanger.git

### Actions Taken:
- Initialized local git repository on branch `main`.
- Cleaned the URL token format (`https://<token>@github.com/rachelkoh10/mas-exchanger.git`).
- Committed all source files with `.gitignore` compliance.
- Pushed upstream to GitHub: [https://github.com/rachelkoh10/mas-exchanger](https://github.com/rachelkoh10/mas-exchanger).

---

## 3. Serverless MAS API Connection Prompt

**User:**
> add a serverless API connection that pulls live data from MAS API catalogues using the following endpoint:
> 
> GET https://eservices.mas.gov.sg/apimg-gw/server/monthly_statistical_bulletin_non610ora/exchange_rates_end_of_period_daily/views/exchange_rates_end_of_period_daily?end_of_day=2026-10-14
> # KeyId: <MAS_KEY_ID>
> 
> - store this in the /api folder(project root level) not the src folder
> - include the /health.ts and /exchangerates.ts within that subfolder
> - Do not hardcode any key, i will include them later

### Architecture & Files Implemented:
- `/api/health.ts`:
  - `GET /api/health`
  - Returns service health status, server uptime, and whether `MAS_KEY_ID` has been configured.
- `/api/exchangerates.ts`:
  - `GET /api/exchangerates?end_of_day=YYYY-MM-DD`
  - Upstream Gateway: `https://eservices.mas.gov.sg/apimg-gw/server/monthly_statistical_bulletin_non610ora/exchange_rates_end_of_period_daily/views/exchange_rates_end_of_period_daily`
  - Headers: Passes `KeyId: process.env.MAS_KEY_ID || process.env.MAS_API_KEY || req.headers['keyid']`
  - Graceful fallback: If `MAS_KEY_ID` is unset, returns non-blocking status `{ success: false, configured: false, status: "pending_key" }` with instructions.
- `server.ts`:
  - Express full-stack entrypoint integrating Vite dev middleware and mounting the serverless `/api` routes on port 3000.
- `.env.example`:
  - Added documentation for `MAS_KEY_ID=""`.
- Codebase committed and pushed to GitHub `main` branch.

---

## 4. Environment Configuration Guide

To enable live production pulls from the Monetary Authority of Singapore:

1. Register on the [MAS API Catalogue Portal](https://eservices.mas.gov.sg/api-catalogue).
2. Obtain your `KeyId` token for the Monthly Statistical Bulletin exchange rates view.
3. Add the token to your environment variables:
   ```bash
   MAS_KEY_ID="your_actual_key_id_here"
   ```
4. Query the serverless API:
   ```bash
   curl http://localhost:3000/api/exchangerates?end_of_day=2026-10-14
   ```
