export interface ExchangeRatesResponse {
  statusCode: string;
  message: string;
  responseBody: ExchangeRate[];
}
export interface CurrencyResponse {
  statusCode: number;
  message: string;
  responseBody: CurrencyModel[];
}

interface ExchangeRateResponseBody {
  exchangeRatesResponses: ExchangeRate[];
}

export interface ExchangeRate {
  currency: string;
  ccyName: string;
  buyRate: string;
  sellRate: string;
}

export interface CurrencyModel {
  id: number;
  name: string;
  isoCode: number;
}
