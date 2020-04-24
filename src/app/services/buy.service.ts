import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {BuyModel} from '../models/buy';
import {HttpClient} from '@angular/common/http';
import BuyResponse = BuyModel.BuyResponse;

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  constructor(private http: HttpClient) { }

  buyCash(data: BuyModel.Cash): Observable<BuyResponse> {
    return this.http.post<BuyResponse>(`transactions/transact/switch-from-cash`, data);
  }

  buyToAccount(data: BuyModel.Steward): Observable<BuyResponse> {
    return this.http.post<BuyResponse>(`transactions/transact/switch-fca-to-sbz-account`, data);
  }

}
