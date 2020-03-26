import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CurrencyResponse, ExchangeRatesResponse} from '../models/currency';
import {NgxSpinnerService} from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {


  constructor(private http: HttpClient, private spinnerService: NgxSpinnerService) {

  }

  // getZWL(data = {channel: 'MobileWorld'}): Observable<ExchangeRatesResponse> {
  //   this.spinnerService.show();
  //   return this.direct.post<ExchangeRatesResponse>(
  //     `https://192.168.1.34:9034/api/rates/v1/steward/exchange/rates`,
  //     data, {headers: {rejectUnauthorized: 'false'}})
  //     .pipe(finalize(this.spinnerService.hide));
  // }

  getZWLExchange(): Observable<ExchangeRatesResponse> {
    return this.http.get<ExchangeRatesResponse>(`exchange-rates/`);
  }

  getCurrencies(): Observable<CurrencyResponse> {
    return this.http.get<CurrencyResponse>(`currencies/`);
  }
}
