export interface ExchangeRatesResponse {
  statusCode: string;
  message: string;
  responseBody: ExchangeRateResponseBody;
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
  ccyname: string;
  buyrate: string;
  sellrate: string;
}

export interface CurrencyModel {
  id: number;
  name: string;
  isoCode: number;
}
