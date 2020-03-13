import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DefaultResponse} from '../models/default';
import {CurrencyModel, CurrencyResponse, ExchangeRatesResponse} from '../models/currency';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  direct: HttpClient;
  constructor(private http: HttpClient, private httpBackend: HttpBackend, private spinnerService: NgxSpinnerService) {
    this.direct = new HttpClient(httpBackend);
  }

  getZWL(data = {channel: 'MobileWorld'}): Observable<ExchangeRatesResponse> {

    this.spinnerService.show();


    return this.direct.post<ExchangeRatesResponse>(
      `https://192.168.1.34:9034/api/rates/v1/steward/exchange/rates`,
      data, {headers: {rejectUnauthorized: 'false'}})
      .pipe(finalize(this.spinnerService.hide));
  }

  getCurrencies(): Observable<CurrencyModel[]> {
    return this.http.get<CurrencyResponse>(`currencies/`).pipe(map(d => d.responseBody));
  }
}
