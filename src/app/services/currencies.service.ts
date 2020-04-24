import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CurrencyResponse, ExchangeRatesResponse} from '../models/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  constructor(private http: HttpClient) {
  }

  getZWLExchange(): Observable<ExchangeRatesResponse> {
    return this.http.get<ExchangeRatesResponse>(`exchange-rates/`);
  }

  getCurrencies(): Observable<CurrencyResponse> {
    return this.http.get<CurrencyResponse>(`currencies/`);
  }
}
